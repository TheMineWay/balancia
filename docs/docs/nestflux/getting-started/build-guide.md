---
sidebar_position: 3
---

# 🏗️ Build Guide

Build the NestFlux monorepo for production deployment.

## 🚀 Build Everything

Build the entire project:

```bash
pnpm build
```

This builds shared packages first, then client and server applications in the correct dependency order.

## 🔧 Build Individual Parts

### 📦 All Packages

```bash
pnpm build:packages
```

Builds all shared packages (`@shared/*`) that client and server depend on.

### ⚛️ Client

```bash
pnpm build:client
```

Builds the React frontend application with Vite. Output: `apps/client/dist/`

### 🚀 Server

```bash
pnpm build:server
```

Builds the NestJS backend API. Output: `apps/server/dist/`

⚠️ **Note**: Always build packages first before building client or server.
