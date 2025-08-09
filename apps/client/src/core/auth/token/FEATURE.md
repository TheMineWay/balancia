# Authentication Token

## 📋 Overview
Handles JWT token lifecycle management, including token validation, expiration handling, and user notification for token-related events.

## 🎯 Responsibilities
- Monitor JWT token expiration
- Display token expiry warnings and modals
- Handle token refresh operations
- Manage token validation states
- Provide token-aware UI components
- Handle token-related error scenarios

## 🚧 Known Limitations
- Token refresh is managed by oidc-client-ts library
