---
sidebar_position: 2
---

# 🗄️ Features Pattern

NestFlux follows a consistent feature-based architecture pattern across both client and server applications to promote code organization, maintainability, and scalability.

## 📁 Folder Structure Overview

```
src/
├── core/            # Core framework functionality (managed by NestFlux)
├── common/          # Reusable code across multiple features
└── features/        # Application-specific features
```

## 🔄 Pattern Philosophy

### ⚙️ Core Folder
- Contains **essential framework functionality** required to run the application
- Handles core concepts like authentication or API configuration
- Provides the foundational infrastructure that features and common code depend on
- **Managed by NestFlux**: Updates to NestFlux will primarily affect core folders

### 🔃 Common Folder
- Contains **reusable code** that's shared across multiple features
- Used for project-specific functionality that spans multiple business domains
- Should be generic enough to be used in various contexts within your project

### 📦 Features Folder
- Contains **application-specific code** that implements business requirements
- Each feature represents a distinct domain or functionality
- Features can be nested with unlimited depth for complex domains
- Should be cohesive and focused on a specific business capability

:::info NestFlux Updates

When updating NestFlux to newer versions, changes will primarily affect the **`core/`** folders. The **`common/`** and **`features/`** folders will rarely be modified, ensuring your custom business logic and project-specific code remains stable across updates.

:::

### 📖 Documentation
Every feature (both in `core/`, `common/` and `features/`) must include a **FEATURE.md** file that documents its purpose, responsibilities, and usage examples. This ensures consistent documentation across the codebase and helps developers understand each feature's role. See the [FEATURE.md template](#-featuremd-template) for the complete documentation structure.

:::tip

The distinction between `core/`, `features/` and `common/` is for **code organization only**. There are no restrictions on code reuse - features can import from other features, and common code can be used anywhere. The goal is to structure code logically while maintaining full flexibility for code sharing and reusability.

:::

## 🗄️ Feature structures

Each application type (client and server) has its own specific folder structure tailored to its technology stack and architectural patterns:

- **Client features** are designed around **React patterns** - components, hooks, and client-side logic
- **Server features** follow **NestJS conventions** - controllers, services, modules, and server-side architecture
- Both share common folder types (**lib**, **types**, **data**) for consistency where it makes sense
- This approach ensures each application follows its **framework's best practices** while maintaining the overall feature pattern consistency

### 🏗️ Feature Grouping Rule

**Important**: If a feature contains sub-features, it becomes a **grouping feature** and **cannot contain its own feature content** (components, hooks, services, etc.). It can only contain:
- `FEATURE.md` (required documentation)
- Sub-feature folders

**Example of a grouping feature:**
```
user-management/         # Grouping feature - no feature content allowed
├── FEATURE.md           # Only documentation allowed
├── user-profile/        # Sub-feature with actual implementation
│   ├── FEATURE.md
│   ├── components/
│   │   └── profile-form.tsx
│   └── hooks/
│       └── use-profile.ts
├── user-settings/       # Another sub-feature
│   ├── FEATURE.md
│   ├── components/
│   │   └── settings-panel.tsx
│   └── lib/
│       └── settings-utils.ts
└── user-permissions/    # Third sub-feature
    ├── FEATURE.md
    ├── services/
    │   └── permissions.service.ts
    └── types/
        └── permissions.types.ts
```

This ensures clear separation between organizational structure and implementation details.

### 💻 Client Feature Structure

Each client feature follows this hierarchy:

```
feature-name/
├── FEATURE.md              # Feature documentation
├── api/                    # API queries and mutations (TanStack Query)
│   ├── use-sth.query.ts    # Data fetching queries
│   └── use-sth.mutation.ts # Data modification operations
├── components/             # React components specific to this feature
│   └── feature-component.tsx
├── data/                   # Static configuration and constants
│   └── feature-config.ts
├── hooks/                  # Custom React hooks for this feature
│   └── use-feature-hook.ts
├── lib/                    # Business logic and utilities
│   └── feature-utils.ts
└── types/                  # TypeScript types specific to this feature
    └── feature.types.ts
```

### 🚀 Server Feature Structure

Each server feature follows this hierarchy:

```
feature-name/
├── FEATURE.md              # Feature documentation
├── feature.controller.ts   # NestJS controller (if needed. Can have more than one)
├── feature.service.ts      # NestJS service (if needed. Can have more than one)
├── feature.module.ts       # NestJS module (if needed. Usually one per feature)
├── data/               # Static configuration and constants
│   └── feature-config.ts
├── decorators/         # Custom decorators (if needed)
│   └── feature.decorator.ts
├── guards/             # Custom guards (if needed)
│   └── feature.guard.ts
├── strategies/         # Authentication strategies (if needed)
│   └── feature.strategy.ts
├── lib/                # Business logic and utilities
│   └── feature-utils.ts
├── repositories/         # Database operations
│   └── feature.repository.ts
└── types/              # TypeScript types specific to this feature
    └── feature.types.ts
```

## 📝 FEATURE.md Template

Each feature must include a `FEATURE.md` file following this template:

```markdown
# Feature Name

## 📋 Overview
Brief description of what this feature does and its purpose.

## 🎯 Responsibilities
- List the main responsibilities of this feature
- What business logic it handles
- What problems it solves

## 🚧 Known Limitations (optional)
- Current limitations or technical debt
- Future improvements planned

## 📖 Related Documentation (optional)
- Links to relevant docs
- API specifications
- Design documents
