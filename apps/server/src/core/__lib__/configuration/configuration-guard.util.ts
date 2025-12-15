import { ENV, RawEnv } from "@constants/conf/env.constant";
import { Logger } from "@nestjs/common";

// #region Types & logic

// Definition of a configuration issue mark
type Mark = {
	// Key identifiers for the configuration issue
	keys: (keyof RawEnv)[];

	// Description of the configuration issue
	message: string;

	// Severity level of the configuration issue
	severity: "warning" | "critical";

	// Category of the configuration issue
	type: "security" | "performance" | "misconfiguration";
};

type Response = {
	marks: Mark[];
	status: "ok" | "warning" | "error";
};

/**
 * Analyzes the application's configuration and logs any detected issues.
 * Throws an error if critical issues are found.
 */
export const configurationGuard = (): void => {
	const analysis = configurationGuardAnalyze();

	for (const mark of analysis.marks) {
		const message = `${mark.message}. (${mark.type})`;
		Logger[mark.severity === "critical" ? "error" : "warn"](
			message,
			"ConfigurationGuard",
		);
	}

	if (analysis.status === "error") {
		const criticalCount = analysis.marks.filter(
			(mark) => mark.severity === "critical",
		).length;
		Logger.error(
			`${criticalCount} critical configuration issues detected. Application startup aborted.`,
			"ConfigurationGuard",
		);
		throw new Error(
			"Critical configuration issues detected. See logs for details.",
		);
	}
};

/**
 * Checks the application's configuration for potential issues and returns a list of detected issues.
 */
const configurationGuardAnalyze = (): Response => {
	const detectedMarks: Mark[] = [
		...databaseChecks,
		...healthChecks,
		...requestChecks,
		...cacheChecks,
		...authAndOidcChecks,
	];

	return {
		marks: detectedMarks,
		status: detectedMarks.some((mark) => mark.severity === "critical")
			? "error"
			: detectedMarks.some((mark) => mark.severity === "warning")
				? "warning"
				: "ok",
	};
};

/* Checks */
const checkFactory = (fn: (marks: Mark[]) => void) => {
	const marks: Mark[] = [];
	fn(marks);
	return marks;
};

// #endregion

/**
 * DATABASE CHECKS
 */
const databaseChecks = checkFactory((marks) => {
	if (ENV.database.connectionLimit < 5) {
		marks.push({
			keys: ["DATABASE_CONNECTION_LIMIT"],
			message:
				"Database connection limit is set too low, which may lead to performance issues under load",
			severity: "warning",
			type: "performance",
		});
	}

	if (ENV.database.logQueries) {
		marks.push({
			keys: ["LOG_QUERIES"],
			message:
				"Database query logging is enabled. This may expose sensitive information and impact performance",
			severity: "warning",
			type: "security",
		});
	}

	if (!ENV.database.sslRejectUnauthorized) {
		marks.push({
			keys: ["DATABASE_SSL_REJECT_UNAUTHORIZED"],
			message:
				"Database SSL certificate validation is disabled. This may expose the application to man-in-the-middle attacks",
			severity: "critical",
			type: "security",
		});
	}
});

/**
 * HEALTH CHECKS
 */
const healthChecks = checkFactory((marks) => {
	if (ENV.health.enabled) {
		if (ENV.health.cacheTtl < 10) {
			marks.push({
				keys: ["HEALTH_SERVICES_CACHE_TTL"],
				message:
					"Health check cache TTL is set too low, which may lead to increased load on the system",
				severity: "warning",
				type: "performance",
			});
		}
	} else {
		if (ENV.health.apiKeys.length > 0) {
			marks.push({
				keys: ["HEALTH_SERVICES_ENABLED", "HEALTH_SERVICES_API_KEYS"],
				message:
					"Health service API keys are configured but health checks are disabled",
				severity: "warning",
				type: "misconfiguration",
			});
		}

		if (ENV.health.cacheTtl > 0) {
			marks.push({
				keys: ["HEALTH_SERVICES_ENABLED", "HEALTH_SERVICES_CACHE_TTL"],
				message:
					"Health service cache TTL is set while health checks are disabled",
				severity: "warning",
				type: "misconfiguration",
			});
		}
	}
});

/**
 * REQUESTS
 */
const requestChecks = checkFactory((marks) => {
	// #region Core checks

	// Payload size

	// Check for excessively large request body size (> 10 MB)
	if (ENV.requests.maxRequestBodySize > 10 * 1024 * 1024) {
		marks.push({
			keys: ["MAX_REQUEST_BODY_SIZE"],
			message:
				"Maximum request body size is set too high, which may expose the application to denial-of-service attacks",
			severity: "warning",
			type: "security",
		});
	}

	// Check for excessively small request body size (< 1 KB)
	if (ENV.requests.maxRequestBodySize < 1 * 1024) {
		marks.push({
			keys: ["MAX_REQUEST_BODY_SIZE"],
			message:
				"Maximum request body size is set too low, which may lead to legitimate requests being blocked",
			severity: "warning",
			type: "performance",
		});
	}

	// Check for excessively large request query size (> 10 KB)
	if (ENV.requests.maxRequestQuerySize > 10 * 1024) {
		marks.push({
			keys: ["MAX_REQUEST_QUERY_SIZE"],
			message:
				"Maximum request query size is set too high, which may expose the application to denial-of-service attacks",
			severity: "warning",
			type: "security",
		});
	}

	// Check for excessively small request query size (< 512 B)
	if (ENV.requests.maxRequestQuerySize < 512) {
		marks.push({
			keys: ["MAX_REQUEST_QUERY_SIZE"],
			message:
				"Maximum request query size is set too low, which may lead to legitimate requests being blocked",
			severity: "warning",
			type: "performance",
		});
	}

	// Timeout

	// Check for excessively low request timeout (< 2 seconds)
	if (ENV.requests.requestTimeout < 2000) {
		marks.push({
			keys: ["REQUEST_TIMEOUT"],
			message:
				"Request timeout is set too low, which may lead to legitimate requests being prematurely terminated",
			severity: "warning",
			type: "performance",
		});
	}

	// Check for excessively high request timeout (> 45 seconds)
	if (ENV.requests.requestTimeout > 45000) {
		marks.push({
			keys: ["REQUEST_TIMEOUT"],
			message:
				"Request timeout is set too high, which may lead to resource exhaustion under load",
			severity: "warning",
			type: "performance",
		});
	}

	// Rate limiting checks

	// Check for excessively high rate limit (> 500 requests per minute)
	if (ENV.rateLimit.maxRequestsPerMinute > 500) {
		marks.push({
			keys: ["MAX_REQUESTS_PER_MINUTE"],
			message:
				"Rate limit is set too high, which may expose the application to denial-of-service attacks",
			severity: "warning",
			type: "security",
		});
	}

	// Check for excessively low rate limit (< 25 requests per minute)
	if (ENV.rateLimit.maxRequestsPerMinute < 25) {
		marks.push({
			keys: ["MAX_REQUESTS_PER_MINUTE"],
			message:
				"Rate limit is set too low, which may lead to legitimate requests being blocked",
			severity: "warning",
			type: "performance",
		});
	}

	// CORS

	// Check for overly permissive CORS settings in non-development environments
	if (ENV.env !== "development" && ENV.cors.allowedDomains.includes("*")) {
		marks.push({
			keys: ["CORS_ONLY_ALLOW_DOMAINS", "NODE_ENV"],
			message:
				"CORS is configured to allow all domains in a non-development environment, which may expose the application to cross-origin attacks",
			severity: "critical",
			type: "security",
		});
	}

	// #endregion
});

/**
 * CACHE
 */
const cacheChecks = checkFactory((marks) => {
	// Check for excessively low user cache TTL (< 30 minutes)
	if (ENV.cache.user < 30 * 1000 * 60) {
		marks.push({
			keys: ["USER_CACHE_TTL"],
			message:
				"User cache TTL is set too low, which may lead to increased load on the database",
			severity: "warning",
			type: "performance",
		});
	}

	// Check for excessively high user cache TTL (> 24 hours)
	if (ENV.cache.user > 24 * 1000 * 60 * 60) {
		marks.push({
			keys: ["USER_CACHE_TTL"],
			message:
				"User cache TTL is set very high, which may lead to stale user data being served",
			severity: "warning",
			type: "performance",
		});
	}

	// Check for excessively low user auth info cache TTL (< 15 minutes)
	if (ENV.cache.userAuthInfo < 15 * 1000 * 60) {
		marks.push({
			keys: ["USER_AUTH_INFO_CACHE_TTL"],
			message:
				"User auth info cache TTL is set too low, which may lead to increased load on the database",
			severity: "warning",
			type: "performance",
		});
	}

	// Check for excessively high user auth info cache TTL (> 12 hours)
	if (ENV.cache.userAuthInfo > 12 * 1000 * 60 * 60) {
		marks.push({
			keys: ["USER_AUTH_INFO_CACHE_TTL"],
			message:
				"User auth info cache TTL is set very high, which may lead to stale authentication data being used",
			severity: "warning",
			type: "performance",
		});
	}

	// Check for excessively low data cache TTL (< 5 minutes)
	if (ENV.cache.data < 5 * 1000 * 60) {
		marks.push({
			keys: ["DATA_CACHE_TTL"],
			message:
				"Data cache TTL is set too low, which may lead to increased load on the database",
			severity: "warning",
			type: "performance",
		});
	}

	// Check for excessively high data cache TTL (> 1 hour)
	if (ENV.cache.data > 1 * 1000 * 60 * 60) {
		marks.push({
			keys: ["DATA_CACHE_TTL"],
			message:
				"Data cache TTL is set very high, which may lead to stale data being served",
			severity: "warning",
			type: "performance",
		});
	}
});

/**
 * AUTHENTICATION & OIDC
 */
const authAndOidcChecks = checkFactory((marks) => {
	// OIDC

	if (ENV.env === "production") {
		// Check for non-HTTPS OIDC URL
		if (new URL(ENV.oidc.host).protocol !== "https:") {
			marks.push({
				keys: ["OIDC_SERVER_HOST"],
				message:
					"OIDC server host is not using HTTPS, which may expose authentication data to interception",
				severity: "critical",
				type: "security",
			});
		}

		// Check for non-HTTPS OIDC issuer URL
		if (new URL(ENV.oidc.issuerUrl).protocol !== "https:") {
			marks.push({
				keys: ["OIDC_ISSUER_URL"],
				message:
					"OIDC issuer URL is not using HTTPS, which may expose authentication data to interception",
				severity: "critical",
				type: "security",
			});
		}
	}

	// Authentication Directory

	// Check for auth directory max parallel syncs set too high relative to database connection limit
	if (ENV.authDirectory.maxParallelSyncs > ENV.database.connectionLimit / 2) {
		marks.push({
			keys: ["AUTH_DIRECTORY_MAX_PARALLEL_SYNCS", "DATABASE_CONNECTION_LIMIT"],
			message:
				"Maximum parallel syncs for authentication directory is set too high relative to the database connection limit, which may lead to database connection exhaustion",
			severity: "warning",
			type: "performance",
		});
	}
});
