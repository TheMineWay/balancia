---
sidebar_position: 1
---

# Getting Started

Get started by **instantiating a new site** or **starting an existing one**.

## What you'll need

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.
- Tmux (used to display client and backend in the same terminal).
- [pnpm](https://pnpm.io/) for managing dependencies and starting the workspace.
- [VSCode](https://code.visualstudio.com/): recommended editor. The project has some prebuilt configs.

## 🆕 Generate a new project

You can use [this repository](https://github.com/TheMineWay/NestFlux) as a template. This will create a new repository with this template files. Now, clone your new repository, and you are ready to go!

## 📦 Install dependencies

In order to install all dependencies, in the project's root folder, run:

```bash
pnpm i
```

## 🔨 Build packages

In order to install all dependencies, in the project's root folder, run:

```bash
pnpm build:packages
```

## ▶️ Start your site

Start your app in development mode:

```bash
pnpm dev
```

If you want to start is as production mode, run:

```bash
pnpm prod
```
