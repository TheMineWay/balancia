import { Section } from "@site/src/constants/config/env-config.type";

/**
 * Backend environment variables configuration
 */
export const BACKEND_CONFIG = [
	{
		name: "Environment",
		items: {
			node_env: {
				type: "enum",
				name: "Node Environment",
				description: "The environment mode the application is running in.",
				options: ["development", "production"],
				default: "production",
			},
			configuration_guard: {
				type: "boolean",
				name: "Configuration Guard",
				description:
					"Whether to enable configuration guard to prevent application startup if environment variables are misconfigured.",
				default: true,
			},
			open_api_docs: {
				type: "boolean",
				name: "Open API Documentation",
				description:
					"Whether to provide Open API docs at /documentation endpoint.",
				default: false,
			},
			health_services_enabled: {
				type: "boolean",
				name: "Health Services",
				description: "Whether to enable health check services.",
				default: false,
			},
			health_services_api_keys: {
				type: "string_list",
				name: "Health Services API Keys",
				description:
					"API keys allowed to access the health check endpoints. If empty, no authentication is required.",
			},
			health_services_cache_ttl: {
				type: "number",
				name: "Health Services Cache TTL",
				description:
					"Time-to-live for caching health check responses in seconds.",
				default: 10,
				min: 0,
			},
		},
	},
	{
		name: "Server",
		items: {
			server_role: {
				type: "enum",
				name: "Server Role",
				description:
					"Server role determining if it handles cron jobs and singleton tasks.",
				options: ["main", "secondary"],
				default: "main",
			},
		},
	},
	{
		name: "Debug",
		items: {
			log_env_values: {
				type: "boolean",
				name: "Log Environment Values",
				description:
					"Enable logging of environment variable values for debugging purposes.",
				default: false,
			},
		},
	},
	{
		name: "Rate Limiting",
		items: {
			max_requests_per_minute: {
				type: "number",
				name: "Max Requests Per Minute",
				description:
					"Rate limiting for all endpoints (except for the ones with specific configuration).",
				default: 120,
				min: 1,
			},
		},
	},
	{
		name: "Authentication",
		items: {
			oidc_server_host: {
				type: "free",
				name: "OIDC Server Host",
				description: "The host URL for the OIDC authentication server.",
				required: true,
			},
			oidc_client_id: {
				type: "free",
				name: "OIDC Client ID",
				description: "The client ID for OIDC authentication.",
				required: true,
			},
			oidc_client_secret: {
				type: "free",
				name: "OIDC Client Secret",
				description: "The client secret for OIDC authentication.",
				required: true,
			},
			oidc_issuer_url: {
				type: "free",
				name: "OIDC Issuer URL",
				description: "The issuer URL for OIDC authentication.",
				required: true,
			},
		},
	},
	{
		name: "Auth Directory",
		items: {
			auth_directory_api_url: {
				type: "free",
				name: "Auth Directory API URL",
				description: "The API URL for the authentication directory service.",
				required: true,
			},
			auth_directory_api_key: {
				type: "free",
				name: "Auth Directory API Key",
				description:
					"The API key for authenticating with the auth directory service.",
				required: true,
			},
			auth_directory_sync_batch_size: {
				type: "number",
				name: "Auth Directory Sync Batch Size",
				description:
					"Number of users to fetch in each request when syncing the auth directory.",
				default: 2000,
				min: 1,
			},
			auth_directory_max_parallel_syncs: {
				type: "number",
				name: "Auth Directory Max Parallel Syncs",
				description:
					"Maximum number of parallel sync operations when syncing users from the auth directory. An elevated value can exhaust database connections.",
				default: 5,
				min: 1,
			},
		},
	},
	{
		name: "Database",
		items: {
			database_url: {
				type: "free",
				name: "Database URL",
				description: "The PostgreSQL connection string.",
				required: true,
			},
			database_connection_limit: {
				type: "number",
				name: "Database Connection Limit",
				description: "Maximum number of database connections in the pool.",
				default: 10,
				min: 1,
			},
			log_queries: {
				type: "boolean",
				name: "Log Queries",
				description: "Whether to log all database queries for debugging.",
				default: false,
			},
			database_ssl_reject_unauthorized: {
				type: "boolean",
				name: "Database SSL Reject Unauthorized",
				description:
					"Set to false to disable SSL check. Useful when there is a self-signed certificate.",
				default: true,
			},
			refresh_materialized_views_on_startup: {
				type: "boolean",
				name: "Refresh Materialized Views on Startup",
				description:
					"Whether to refresh all materialized views when the application starts.",
				default: true,
			},
			materialized_views_default_refresh_cron: {
				type: "free",
				name: "Materialized Views Default Refresh Cron",
				description: "Default cron expression to refresh materialized views.",
				default: "0 */6 * * *",
			},
			finances_materialized_views_refresh_cron: {
				type: "free",
				name: "Finances Materialized Views Refresh Cron",
				description:
					"Cron expression to refresh finances-related materialized views.",
				default: "0,30 * * * *",
			},
		},
	},
	{
		name: "CORS",
		items: {
			cors_only_allow_domains: {
				type: "free",
				name: "CORS Only Allow Domains",
				description:
					"Allowed CORS domains (if more than one, separate by ','). If left empty all are allowed.",
			},
		},
	},
	{
		name: "Requests",
		items: {
			max_request_body_size: {
				type: "number",
				name: "Max Request Body Size",
				description: "Maximum request body size in bytes.",
				default: 1048576,
				min: 1,
			},
			max_request_query_size: {
				type: "number",
				name: "Max Request Query Size",
				description: "Maximum request query size in bytes.",
				default: 1048576,
				min: 1,
			},
			request_timeout: {
				type: "number",
				name: "Request Timeout",
				description: "Request timeout in milliseconds.",
				default: 10000,
				min: 1,
			},
			https: {
				type: "boolean",
				name: "HTTPS",
				description:
					"If set to true, you must provide key.pem and cert.pem in the server certificates folder.",
				default: false,
			},
		},
	},
	{
		name: "Cache",
		items: {
			user_cache_ttl: {
				type: "number",
				name: "User Cache TTL",
				description: "User cache time-to-live in milliseconds.",
				default: 28800000,
				min: 1,
			},
			user_auth_info_cache_ttl: {
				type: "number",
				name: "User Auth Info Cache TTL",
				description:
					"User authentication info cache time-to-live in milliseconds.",
				default: 1800000,
				min: 1,
			},
			data_cache_ttl: {
				type: "number",
				name: "Data Cache TTL",
				description: "General data cache time-to-live in milliseconds.",
				default: 600000,
				min: 1,
			},
		},
	},
] satisfies Section[];
