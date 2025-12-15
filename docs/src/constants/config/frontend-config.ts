import { Section } from "@site/src/constants/config/env-config.type";

/**
 * Frontend environment variables configuration
 */
export const FRONTEND_CONFIG = [
	{
		name: "Host",
		items: {
			vite_api_host: {
				type: "free",
				name: "API Host",
				description: "API host URL.",
				required: true,
				default: "http://localhost:3001",
			},
			vite_base_url: {
				type: "free",
				name: "Base URL",
				description: "Client host URL.",
				required: true,
				default: "http://localhost:3000",
			},
		},
	},
	{
		name: "Auth",
		items: {
			vite_auth_authority_url: {
				type: "free",
				name: "Auth Authority URL",
				description: "OIDC Issuer URL.",
				required: true,
			},
			vite_auth_profile_url: {
				type: "free",
				name: "Auth Profile URL",
				description:
					"Optional, but recommended. The URL of the OIDC profile page.",
			},
			vite_auth_client_id: {
				type: "free",
				name: "Auth Client ID",
				description: "OIDC client ID.",
				required: true,
			},
			vite_auth_redirect_slug: {
				type: "free",
				name: "Auth Redirect Slug",
				description: "URL slug for authentication redirect.",
				default: "auth",
			},
			vite_auth_scope: {
				type: "free",
				name: "Auth Scope",
				description: "OIDC authentication scope.",
				default: "openid profile email",
			},
			vite_auth_post_logout_redirect_uri: {
				type: "free",
				name: "Auth Post Logout Redirect URI",
				description: "URI to redirect to after logout.",
				required: true,
			},
			vite_auth_response_type: {
				type: "enum",
				name: "Auth Response Type",
				description: "OIDC response type.",
				options: ["code", "token", "id_token"],
				default: "code",
			},
		},
	},
	{
		name: "Auth UI",
		items: {
			vite_auth_ui_provider_name: {
				type: "free",
				name: "Auth UI Provider Name",
				description: "Display name on the 'Login with <<name>>' button.",
				required: true,
			},
			vite_auth_ui_provider_color: {
				type: "enum",
				name: "Auth UI Provider Color",
				description:
					"The color theme for the authentication UI provider buttons.",
				options: ["red", "green", "blue", "purple", "orange", "cyan"],
				default: "cyan",
			},
			vite_auth_ui_provider_icon_url: {
				type: "free",
				name: "Auth UI Provider Icon URL",
				description: "Icon URL of the Auth provider.",
			},
		},
	},
	{
		name: "User",
		items: {
			vite_user_info_stale_time: {
				type: "number",
				name: "User Info Stale Time",
				description: "User information cache stale time in seconds.",
				default: 1800,
				min: 0,
			},
		},
	},
	{
		name: "Links",
		items: {
			vite_version_link: {
				type: "free",
				name: "Version Link",
				description:
					"URL to the releases page. This link will be usable in the version info.",
			},
		},
	},
	{
		name: "Branding",
		items: {
			vite_brand_auth_logo_url: {
				type: "free",
				name: "Brand Auth Logo URL",
				description: "Logo URL that gets shown in the Auth screen.",
			},
		},
	},
] satisfies Section[];
