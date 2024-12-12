---
sidebar_position: 3
---

# Architecture

This template offers a defined structure that should be followed and maintained.

## Projects

Projects are stored inside the apps folder.

### Client

A ReactJS project made with Vite and Antd as the design system.

### Server

A NestJS project. Connected to a MySQL database.

## Tests

This project uses [Vitest](https://vitest.dev). A single vitest workspace is present in the root folder, it is configured to detect all vitest projects inside this template.

Notice you can modify global test settings by updating the `vitest.shared.ts` file.

## Settings

### Editor configuration files

There is a `.vscode` folder that contains some Visual Studio Code settings specifically designed for this project.

### Git settings

You can find a `.githooks` folder. This contains precommit scripts that ensure that commits follow the Conventional Commit naming strategy. Also, it checks no file names contain capital letters (to ensure compatibility with Windows and Unix).
