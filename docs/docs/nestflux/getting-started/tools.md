---
sidebar_position: 7
---

# 🛠️ Tools CLI

The NestFlux Tools CLI is a powerful command-line utility that helps you manage your project configuration and generate development resources. It provides an interactive interface for common development tasks.

## 🚀 Getting Started

To start the Tools CLI, run the following command in your project root:

```bash
pnpm tools
```

This will launch an interactive menu with various options to help you configure and manage your NestFlux project.

## 📋 Available Features

### 📝 Project Metadata Management

The Tools CLI allows you to easily update your project's core information:

#### 🏷️ Change Project Name
- Updates the project name in all necessary `package.json` files across the monorepo
- Modifies root package.json and workspace packages that reference the project name
- Prevents manual editing errors and maintains project integrity

#### 🔢 Change Project Version
- Updates the version number in all relevant `package.json` files throughout the monorepo
- Follows semantic versioning and ensures consistency across all workspace packages
- Ensures proper version management without manual errors

:::note

Always use the CLI to update name or version to ensure consistency across your entire monorepo workspace

:::

### 🐳 Docker Generation

#### 🗄️ PostgreSQL Database Docker

The Tools CLI can generate a complete PostgreSQL database setup with Docker, including:

- **📦 Docker Compose Configuration**: Ready-to-use `docker-compose.yml` for PostgreSQL
- **🔐 SSL/TLS Support**: Automatically configured with SSL encryption
- **🛡️ Security Best Practices**: Implements secure database configuration

#### 🔒 SSL Certificate Setup

When generating the PostgreSQL Docker setup, the tool:

1. **📋 Certificate Requirements**: You only need to provide:
   - SSL certificate file (`.crt`)
   - Private key file (`.key`)

2. **🔄 Automatic Configuration**: The tool handles:
   - Docker volume mounting for certificates
   - PostgreSQL SSL configuration
   - Connection string setup
   - Environment variable configuration

---

The Tools CLI streamlines your NestFlux development workflow by automating common tasks and ensuring consistent, secure configurations across your project! 🚀✨
