---
sidebar_position: 5
---

# 🧹 Linting & Formatting

Keep your codebase clean and consistent with BiomeJS.

## 🎯 Overview

NestFlux uses [BiomeJS](https://github.com/biomejs/biome) as a unified tool for both linting and formatting across the entire monorepo. BiomeJS provides:

- **Fast Performance**: Extremely fast linting and formatting written in Rust
- **Zero Configuration**: Works out of the box with sensible defaults
- **TypeScript Native**: Built-in TypeScript support without additional plugins
- **Consistent Style**: Unified formatting rules across all projects

## 🧰 Available Commands

### Format Code

Format all files in the project:

```bash
pnpm lint
```

### Format and Fix Issues

Format code and auto-fix linting issues:

```bash
pnpm lint:fix
```

### Check Issues

Check for linting issues without fixing them:

```bash
pnpm lint:report
```

This generates a summary report of all linting issues found.

## 📁 Configuration

BiomeJS is configured through `biome.json` files:

- **Root `biome.json`**: Main configuration for the entire monorepo
- **App-specific configs**: Individual configurations in `apps/client/` and `apps/server/` for app-specific rules
- **Package configs**: Each shared package has its own `biome.json` in `packages/*/` directories

By default, all configurations extend from the root `biome.json`, inheriting the base rules while allowing for project-specific customizations.

The project comes with pre-configured styling recommendations tailored to each technology:
- **React/TypeScript**: Optimized rules for React components and hooks
- **NestJS**: Backend-specific patterns and decorators
- **Shared Packages**: Library-focused rules for reusable code

## 🔍 What Gets Checked

BiomeJS analyzes:

- **TypeScript/JavaScript files**: `.ts`, `.tsx`, `.js`, `.jsx`
- **JSON files**: Configuration and package files
- **Code Quality**: Unused variables, imports, and dead code
- **Style**: Consistent formatting, spacing, and syntax
- **Best Practices**: Modern JavaScript/TypeScript patterns

## 🤖 GitHub Pipeline

The project includes automated linting checks:

- **On Pull Requests**: All code changes are automatically checked
- **On Push**: Ensures main branch maintains code quality
- **Status Checks**: PRs cannot be merged if linting fails
- **Fast Feedback**: Developers get immediate feedback on code quality

## 💡 Development Workflow

### Before Committing

Always run linting before committing:

```bash
pnpm lint:fix
```

This ensures your code follows the project's style guidelines.

### IDE Integration

For the best experience, install the BiomeJS extension in your editor:

- **VS Code**: BiomeJS extension for real-time linting and formatting
- **Auto-format on save**: Configure your editor to format on save
- **Inline errors**: See linting issues directly in your editor

### Common Issues

**Import/Export Order**: BiomeJS automatically sorts imports and exports
**Unused Variables**: Removes or flags unused variables and imports
**Formatting**: Consistent spacing, quotes, and semicolon usage
**TypeScript**: Ensures proper TypeScript patterns and type usage

## ⚡ Quick Tips

- **Format on Save**: Enable auto-formatting in your editor
- **Pre-commit**: Run `pnpm lint:fix` before committing
- **CI/CD**: The GitHub pipeline will catch any missed issues
- **Consistency**: BiomeJS ensures the same style across all team members

---

*BiomeJS helps maintain high code quality and consistency across the entire NestFlux codebase.*
