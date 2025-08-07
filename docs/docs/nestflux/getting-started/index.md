---
sidebar_position: 1
---

# 🚀 Getting Started

Let's get your development environment ready! This guide will walk you through setting up NestFlux from scratch to having a fully functional development environment.

## 🧾 Prerequisites

Before you begin, ensure you have the following installed on your system:

### 🔨 Required Tools
- **Node.js 24 or higher** - NestFlux leverages the latest Node.js features and performance improvements
- **pnpm 10 or higher** - Fast, disk space efficient package manager used throughout the project
- **Git** - For version control and repository management

### Database
- **MySQL** - A MySQL instance up and running. You can generate a MySQL docker-compose using the CLI.

## 🛠️ Setup Process

Follow these steps in order to set up your development environment:

### 1. Clone and Navigate

```bash
git clone https://github.com/TheMineWay/NestFlux.git
cd NestFlux
```

### 2. Install Dependencies

Install all project dependencies using pnpm:

```bash
pnpm install
```

This installs dependencies for the entire monorepo including client, server, packages, and documentation.

### 3. Build Shared Packages

Build the shared packages that both client and server depend on:

```bash
pnpm build:packages
```

### 4. Environment Configuration

Set up your environment variables:

```bash
# Copy example environment files
cp apps/client/example.env apps/client/.env
cp apps/server/example.env apps/server/.env
```

**Important**: Edit the `.env` files with your actual configuration values, especially:
- Database connection details
- OIDC authentication provider settings
- API URLs and endpoints

### 5. Database Setup

If using Docker (recommended):

```bash
# Start MySQL database container
docker-compose -f generated/database/db.mysql.docker-compose.yml up -d
```

Then run database migrations:

```bash
pnpm db:migrate
```

### 6. Start Development Environment

You have several options to start the development environment:

#### Option A: Start Everything (Recommended)
```bash
pnpm dev
```
This starts both client and server in tmux sessions.

#### Option B: Start Individual Services
```bash
# Start the client (React app) - runs on http://localhost:3000
pnpm dev:client

# Start the server (NestJS API) - runs on http://localhost:3001  
pnpm dev:server

# Start package development (for shared library changes)
pnpm dev:packages
```

#### Option C: Use VS Code Tasks
If you're using VS Code, you can use the predefined tasks:
- "Start development environment (all)" - Starts everything
- "dev:client" - Starts only the client
- "dev:server" - Starts only the server

## 🎯 Verification

Once everything is running, verify your setup:

1. **Client**: Navigate to [http://localhost:3000](http://localhost:3000) to see the React application
2. **Server**: Check [http://localhost:3001](http://localhost:3001) for the NestJS API
3. **Database**: Ensure your database connection is working through the application

## 🚦 Next Steps

With your development environment set up, you're ready to:

- Explore the [Architecture](../architecture/index.md) to understand the project structure
- Learn about [Feature Patterns](../architecture/features.md) for organized development  
- Configure [Authentication](../security/authentication.md) and [Authorization](../security/authorization.md)
- Check out the [Technologies](../technologies/index.md) documentation for detailed information about the stack

## 🆘 Troubleshooting

### Common Issues

**Node.js Version**: Ensure you're using Node.js 24 or higher:
```bash
node --version  # Should show v24.x.x or higher
```

**pnpm Version**: Verify pnpm installation:
```bash
pnpm --version  # Should show 10.x.x or higher
```

**Port Conflicts**: If ports 3001 (server) or 3000 (client) are in use, you can modify them in the respective configuration files.

**Database Connection**: Ensure your database is running and the connection details in `.env` files are correct.

**Dependencies**: If you encounter dependency issues, try:
```bash
pnpm clean:all  # Removes all node_modules and build files
pnpm install    # Reinstall dependencies
```
