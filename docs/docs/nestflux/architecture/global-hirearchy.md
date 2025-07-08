---
sidebar_position: 2
---

# 🌍 Global hirearchy

This template offers a defined structure that should be followed and maintained.

## 🌲 Project files hierarchy

```text
NestFlux/
├── apps/               # Contains application-related code
│   ├── client          # Frontend code for the client application (React + Vite)
│   └── server          # Backend code for the server application (NestJS)
├── docs/               # Documentation project (Docusaurus)
├── packages/           # Libraries available for projects & libraries inside this monorepo
│   ├── api-definition  # Defines API contracts and endpoints
│   ├── constants       # Shared constants
│   ├── models          # Shared models & Zod schemas
│   ├── mocks           # Data mocks
│   ├── types           # Common types
│   └── utils           # Shared logics
└── scripts/            # CLI utilities
```

## ⚙️ Configuration hierarchy

```text
NestFlux/
├── .githooks/          # Contains git commit settings
├── .github/            # Contains GitHub pipelines for testing, deployment, etc
└── .vscode/            # Contains specific configurations for VSCode
```
