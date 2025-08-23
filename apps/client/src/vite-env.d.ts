/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_AUTH_AUTHORITY: string;
  readonly VITE_AUTH_CLIENT_ID: string;
  readonly VITE_AUTH_REDIRECT_URI: string;
  readonly VITE_AUTH_SCOPE: string;
  readonly VITE_AUTH_POST_LOGOUT_REDIRECT_URI: string;
  readonly VITE_AUTH_RESPONSE_TYPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
