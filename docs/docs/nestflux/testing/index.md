---
sidebar_position: 1
---

# 🧪 Testing Overview

An introduction to testing strategies and tools in NestFlux applications.

## 🎯 Testing Philosophy

NestFlux embraces comprehensive testing to ensure code quality and reliability:

- **Test-Driven Development**: Writing tests alongside or before implementation
- **Fast Feedback**: Quick test execution for immediate developer feedback
- **Comprehensive Coverage**: Unit, integration, and end-to-end testing
- **Maintainable Tests**: Clear, readable tests that serve as living documentation

## 🛠️ Testing Stack

### Vitest - Core Testing Framework

NestFlux uses **Vitest** as the primary testing framework across the entire monorepo:

- **Lightning Fast**: Native ESM support with instant hot module replacement
- **TypeScript Native**: First-class TypeScript support without additional setup
- **Jest Compatible**: Familiar API for developers coming from Jest
- **Vite Integration**: Leverages Vite's transformation and bundling capabilities

### Vitest Workspace

The monorepo uses **Vitest Workspace** for coordinated testing:

- **Unified Configuration**: Shared testing setup across all packages and applications
- **Parallel Execution**: Run tests across multiple projects simultaneously
- **Selective Testing**: Target specific packages or applications
- **Consistent Tooling**: Same testing experience everywhere in the monorepo

## 🏗️ Testing Architecture

### Workspace Structure

The testing setup is organized across the monorepo:

```
vitest.workspace.ts          # Main workspace configuration
vitest.shared.ts            # Shared test utilities and setup
├── apps/
│   ├── client/
│   │   └── vitest.config.ts  # Client-specific test config
│   └── server/
│       └── vitest.config.ts  # Server-specific test config
└── packages/
    ├── api-definition/
    ├── constants/
    ├── models/
    ├── types/
    └── utils/
        └── vitest.config.ts  # Package-specific configs
```

### Testing Types

#### Unit Testing
- **Pure Functions**: Business logic and utility functions
- **Components**: React components in isolation
- **Services**: NestJS services and controllers
- **Utilities**: Shared package functions

#### Component Testing
- **React Components**: User interface components with user interactions
- **Integration**: Component interactions with services and state
- **Accessibility**: Ensuring components meet accessibility standards

#### Integration Testing
- **API Endpoints**: Testing server routes and middleware
- **Database Operations**: Testing data layer interactions
- **Service Integration**: Testing service-to-service communication

## 🚀 Running Tests

### All Tests

Run tests across the entire monorepo:

```bash
pnpm test
```

### Watch Mode

Run tests in watch mode for development:

```bash
pnpm test:dev
```

### UI Mode

Run tests with Vitest's interactive UI:

```bash
pnpm test:ui
```

## 🔧 Test Configuration

### Shared Configuration

Common test setup is defined in `vitest.shared.ts`:
- Global test utilities
- Mock configurations
- Common matchers and helpers
- Environment setup

### Project-Specific Configuration

Each application and package can have its own `vitest.config.ts`:
- Custom test environment settings
- Project-specific mocks
- Specialized testing utilities
- Coverage configuration

## 📊 Test Coverage

Vitest provides built-in coverage reporting:

- **Line Coverage**: Percentage of code lines executed
- **Branch Coverage**: Percentage of code branches tested
- **Function Coverage**: Percentage of functions called
- **Statement Coverage**: Percentage of statements executed

Coverage reports help identify untested code and maintain quality standards.

## 🧩 Testing Ecosystem

### CI/CD Integration

Tests are automatically run in the CI/CD pipeline:
- **Pull Request Validation**: All tests must pass before merging
- **Coverage Reporting**: Track coverage trends over time
- **Parallel Execution**: Fast test feedback in automated workflows

---

*Good tests are an investment in code quality, developer confidence, and long-term maintainability.*
