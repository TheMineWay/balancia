# Build stage
FROM node:24-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json ./apps/server/
COPY packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy server source
COPY apps/server ./apps/server
COPY tsconfig.json ./

# Build packages first, then server
RUN pnpm build:packages
RUN pnpm build:server

# Production stage
FROM node:24-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json ./apps/server/
COPY packages ./packages

# Install all dependencies (including drizzle-kit for migrations)
RUN pnpm install --frozen-lockfile

# Copy built packages from builder
COPY --from=builder /app/packages/*/dist ./packages/*/dist

# Copy built server
COPY --from=builder /app/apps/server/dist ./apps/server/dist

# Copy drizzle migrations
COPY apps/server/drizzle ./apps/server/drizzle
COPY apps/server/drizzle.config.ts ./apps/server/

# Expose port (adjust if needed)
EXPOSE 8080

# Start the server (includes db:migrate)
CMD ["pnpm", "start:server"]
