# NestFlux

NestFlux is a **monorepo scaffold application** designed for rapid development and easy customization. Built entirely with **TypeScript**, it combines **React** for the client and **NestJS** for the backend. By default, it integrates **MySQL** as the database, offering a robust starting point for full-stack applications. The project uses **pnpm** for dependency management and is fully Dockerized.

## Features

- **Monorepo Architecture**:

  - Shared **common types** and **static data** across both client and backend projects.

- **Frontend**

  - **React**: Modern UI framework for the client.
  - **Ant Design (AntD)**: Pre-configured UI components for sleek and professional designs.
  - **next-i18n**: Out-of-the-box internationalization support.

- **Backend**

  - **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
  - **MySQL**: Default relational database support (easily replaceable).

- **Testing**

  - **Vitest**: Lightweight and fast testing for both client and backend.
  - **Playwright**: End-to-end testing to ensure a smooth user experience.

- **Continuous Integration**

  - **Prebuilt GitHub Pipelines**:
    - **Testing**: Runs Vitest and Playwright tests on pull requests and merges.
    - **Linting**: Ensures code quality and adheres to project standards.
    - **GitHub Pages Deployment** (disabled by default): Automates static builds for documentation or app previews.

- **Dockerization**:
  - Both client and backend solutions include prebuilt **Dockerfiles** for containerized deployment.

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **pnpm** (v8 or higher)
- **Docker** and **Docker Compose**
- **MySQL** (or compatible database server)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TheMineWay/NestFlux
   cd NestFlux
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up the database:

   - Update the database configuration in `.env`:
     ```env
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=password
     DB_NAME=nestflux
     ```

4. Run database migrations:
   ```bash
   pnpm run migrate
   ```

### Running the Application

- **Using Docker**:

  ```bash
  docker-compose up
  ```

  This will start both the client and backend services in a containerized environment.

- **Without Docker**:
  - **Start the backend**:
    ```bash
    pnpm run start:server
    ```
  - **Start the client**:
    ```bash
    pnpm run start:client
    ```

By default:

- API is accessible at `http://localhost:3000`
- Client is accessible at `http://localhost:3001`

## Testing

### Unit and Integration Tests

Run all Vitest tests:

```bash
pnpm run test
```

### End-to-End Testing

Run Playwright tests:

```bash
pnpm run e2e
```

## Scripts

| Command                 | Description                                |
| ----------------------- | ------------------------------------------ |
| `pnpm run start:client` | Start the React client application.        |
| `pnpm run start:server` | Start the NestJS backend application.      |
| `pnpm run test`         | Run all Vitest tests (client and backend). |
| `pnpm run e2e`          | Run Playwright end-to-end tests.           |
| `pnpm run lint`         | Check code quality using linter rules.     |
| `pnpm run migrate`      | Run database migrations.                   |

## Customization

### UI Design

NestFlux uses **Ant Design** for UI components. Visit [Ant Design documentation](https://ant.design/docs/react/introduce) to learn more about customization and component usage.

### Internationalization (i18n)

The project is pre-configured with **next-i18n**. Add translations to the `public/locales` directory and refer to [next-i18n documentation](https://www.npmjs.com/package/next-i18next) for more details.

### GitHub Pipelines

NestFlux includes prebuilt GitHub workflows:

- **Testing and Linting**: Enabled by default.
- **GitHub Pages Deployment**: Available but disabled by default. Enable it in `.github/workflows/gh-pages.yml` as needed.

## License

NestFlux is licensed under the [MIT License](LICENSE). Feel free to use and modify it for your projects.

---

Happy coding with **NestFlux**! 🚀
