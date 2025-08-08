# Authentication

## 📋 Overview
Handles user authentication through OpenID Connect (OIDC), managing user login, logout, session state, and token management in the client application.

## 🎯 Responsibilities
- Manage OIDC authentication flow (login/logout redirects)
- Handle user session state and token management
- Manage user profile information and authentication state
- Handle token expiration and refresh logic
- Provide hooks for accessing authenticated user data

## 🚧 Known Limitations
- Currently optimized for Authentik OIDC provider
- Token refresh logic is handled by oidc-client-ts library
- Limited error handling for network failures during authentication

## 📖 Related Documentation
- OIDC client configuration in `oidc.manager.ts`
