import { Logger } from "@nestjs/common";
import "dotenv/config";
import { z } from "zod";

const toNum = (value) => Number(value);
const refinedMin = (min: number) => (val: number) => val >= min;

const ENV_SCHEMA = z.object({
	//ENV
	NODE_ENV: z.string().default("production"),
	OPEN_API_DOCS: z.stringbool().default(false),

	// MAX REQUESTS PER MINUTE
	MAX_REQUESTS_PER_MINUTE: z
		.string()
		.optional()
		.default("120")
		.transform(toNum)
		.refine(refinedMin(1)),
	MAX_JWT_REQUESTS_PER_MINUTE: z
		.string()
		.optional()
		.default("8")
		.transform(toNum)
		.refine(refinedMin(1)),

	// DATABASE
	LOG_QUERIES: z.stringbool().default(false),
	DATABASE_CONNECTION_LIMIT: z
		.string()
		.default("10")
		.transform(toNum)
		.refine(refinedMin(1)),
	DATABASE_URL: z.string(),
	DATABASE_SSL_REJECT_UNAUTHORIZED: z.stringbool().default(true),
	REFRESH_MVIEWS_ON_STARTUP: z.stringbool().default(false),

	// DEBUG
	LOG_ENV_VALUES: z.stringbool().default(false),

	// CORS

	CORS_ONLY_ALLOW_DOMAINS: z
		.string()
		.transform((val) => {
			return val.trim().split(",");
		})
		.default(["*"]),

	// REQUESTS
	MAX_REQUEST_BODY_SIZE: z.string().transform(toNum).default(1048576), // 1 MB
	MAX_REQUEST_QUERY_SIZE: z.string().transform(toNum).default(1048576), // 1 MB
	REQUEST_TIMEOUT: z.string().transform(toNum).default(10000), // 10 seconds
	HTTPS: z.stringbool().default(false),

	// AUTHENTICATION
	OIDC_SERVER_HOST: z
		.url()
		.transform((val) => (val.endsWith("/") ? val.slice(0, -1) : val))
		.refine((val) => !val.endsWith("/")),

	// OIDC
	OIDC_CLIENT_ID: z.string(),
	OIDC_CLIENT_SECRET: z.string(),
	OIDC_ISSUER_URL: z.url(),

	// AUTH DIRECTORY
	AUTH_DIRECTORY_API_URL: z.url(),
	AUTH_DIRECTORY_API_KEY: z.string(),

	// CACHE
	USER_CACHE_TTL: z
		.string()
		.default("28800000")
		.transform((val) => +val)
		.refine((val) => isFinite(val) && val >= 0),
	USER_AUTH_INFO_CACHE_TTL: z
		.string()
		.default("1800000")
		.transform((val) => +val)
		.refine((val) => isFinite(val) && val >= 0),
	DATA_CACHE_TTL: z
		.string()
		.default("600000")
		.transform((val) => +val)
		.refine((val) => isFinite(val) && val >= 0),

	// Finances
	DATABASE_FINANCES_MVIEWS_UPDATE_CRON: z.string().default("0,30 * * * *"),
});

const TEST_VALUES: Partial<z.infer<typeof ENV_SCHEMA>> = {
	DATABASE_URL: "",
	OIDC_SERVER_HOST: "http://localhost:3000",
	OIDC_CLIENT_ID: "test-client-id",
	OIDC_CLIENT_SECRET: "test-client-secret",
	OIDC_ISSUER_URL: "http://localhost:3000",
};

export const ENV = (() => {
	let env = process.env as unknown as z.infer<typeof ENV_SCHEMA>;

	if (process.env.TEST === "true") {
		env = { ...env, ...TEST_VALUES };
	}

	const values = ENV_SCHEMA.parse(env);

	if (values.LOG_ENV_VALUES) Logger.log("ENV", values);

	return {
		rateLimit: {
			maxRequestsPerMinute: values.MAX_REQUESTS_PER_MINUTE,
		},
		database: {
			url: values.DATABASE_URL,
			connectionLimit: values.DATABASE_CONNECTION_LIMIT,
			logQueries: values.LOG_QUERIES,
			sslRejectUnauthorized: values.DATABASE_SSL_REJECT_UNAUTHORIZED,
			refreshMaterializedViewsOnStartup: values.REFRESH_MVIEWS_ON_STARTUP,
		},
		cors: {
			allowedDomains: values.CORS_ONLY_ALLOW_DOMAINS,
		},
		requests: {
			maxRequestBodySize: values.MAX_REQUEST_BODY_SIZE,
			maxRequestQuerySize: values.MAX_REQUEST_QUERY_SIZE,
			requestTimeout: values.REQUEST_TIMEOUT,
			useHttps: values.HTTPS,
		},
		oidc: {
			host: values.OIDC_SERVER_HOST,
			clientId: values.OIDC_CLIENT_ID,
			clientSecret: values.OIDC_CLIENT_SECRET,
			issuerUrl: values.OIDC_ISSUER_URL,
		},
		cache: {
			user: values.USER_CACHE_TTL,
			userAuthInfo: values.USER_AUTH_INFO_CACHE_TTL,
			data: values.DATA_CACHE_TTL,
		},
		authDirectory: {
			apiUrl: values.AUTH_DIRECTORY_API_URL,
			apiKey: values.AUTH_DIRECTORY_API_KEY,
		},
		docs: {
			openApiDocs: values.OPEN_API_DOCS,
		},
		finances: {
			databaseMaterializedViewsUpdateCron:
				values.DATABASE_FINANCES_MVIEWS_UPDATE_CRON,
		},
		env: values.NODE_ENV,
	};
})();
