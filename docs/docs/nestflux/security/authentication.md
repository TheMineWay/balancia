---
sidebar_position: 2
---

# 🔑 Authentication

NestFlux uses OpenID Connect (OIDC) to authenticate users, providing secure and standardized identity verification through external authentication platforms.

## 🌐 OIDC Architecture

NestFlux relies on **third-party authentication platforms** rather than implementing custom authentication logic. This approach provides:

- **Enhanced Security**: Leverages specialized identity providers with advanced security features
- **Reduced Complexity**: No need to manage passwords, password resets, or account security
- **Standardized Protocol**: Uses industry-standard OIDC for reliable authentication flows
- **Flexibility**: Can integrate with various identity providers

### 📜 Supported Platforms

While NestFlux is designed to work with any OIDC-compliant provider, it has been specifically developed and tested with:

- **Authentik** (primary implementation)
- **Keycloak** (easily migratable)
- Any other OIDC-compliant identity provider

## 🕝 User Synchronization

### Database Synchronization Strategy

NestFlux maintains a local user database for functional purposes while relying on the OIDC provider as the source of truth for authentication.

#### **First Login Sync**
When a user logs in for the first time:
1. User authenticates with OIDC provider
2. Server receives user profile information from ID token
3. **User metadata is automatically synced** to the local database
4. User record is created for application-specific functionality

#### **Scheduled Sync**
To keep user data current, NestFlux performs regular synchronization:
- **Schedule**: Daily at 3:00 AM (configurable)
- **Scope**: User metadata only (no authentication credentials)
- **Process**: Updates existing user records with latest information from OIDC provider

### What Gets Synchronized

**✅ User Metadata includes:**
- Display name
- Email address (used for [Gravatar](https://gravatar.com))
- Profile information

**❌ What is NOT synchronized:**
- Passwords or authentication credentials
- Session tokens
- Provider-specific security information

## 🔧 Implementation Details

### Authentik Integration

The current implementation is optimized for **Authentik** as the OIDC provider:

- Pre-configured OIDC scopes and claims mapping
- Optimized user profile synchronization

### Migration to Other Providers

The authentication system is designed for easy migration to other OIDC providers:

1. **Configuration Changes**: Update OIDC endpoints and client credentials
2. **Sync (via auth provider API)**: Adjust integrations to work with the new provider

## 🎯 Benefits

### Security Benefits
- **No Password Management**: Eliminates password-related vulnerabilities
- **MFA Support**: Inherits multi-factor authentication from OIDC provider
- **Centralized Security**: Leverages enterprise-grade identity management
- **Audit Trails**: Complete authentication logs through OIDC provider

### Operational Benefits
- **Reduced Maintenance**: No authentication infrastructure to maintain
- **User Experience**: Single sign-on capabilities
- **Compliance**: Inherits compliance features from identity provider
- **Scalability**: Identity provider handles authentication load

### Development Benefits
- **Simplified Code**: No custom authentication logic to maintain
- **Standards-Based**: Uses well-established OIDC protocols
- **Flexibility**: Easy to switch between compatible providers
- **Integration**: Works with existing enterprise identity systems

## 🤹 Session Management

### Client-Side
- Stores tokens securely
- Handles token refresh automatically
- Manages logout and session cleanup

### Server-Side
- Validates tokens on each API request
- Handles token refresh when needed
- Maintains user session state
- Synchronizes user data as configured

This authentication architecture provides a secure, maintainable, and flexible foundation for user identity management in NestFlux applications.
