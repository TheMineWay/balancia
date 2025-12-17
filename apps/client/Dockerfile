# Build stage
FROM node:24-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/client/package.json ./apps/client/
COPY packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy client source
COPY apps/client ./apps/client
COPY tsconfig.json ./

# Build packages first, then client
RUN pnpm build:packages
RUN pnpm build:client

# Nginx-compatible stage - just the built files
FROM busybox:latest AS static-files
WORKDIR /app
COPY --from=builder /app/apps/client/dist /app/dist
