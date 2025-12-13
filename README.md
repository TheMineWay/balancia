# 🚀 NestFlux

A comprehensive **TypeScript monorepo template** that combines the power of **React** and **NestJS** to accelerate modern web application development.

## 🧰 What is NestFlux?

NestFlux is a full-stack scaffold designed for building scalable applications with:

- **⚛️ React Frontend** - Modern React 19 application with TypeScript
- **🚀 NestJS Backend** - Robust Node.js server API with NestJS 11
- **🗄️ PostgreSQL Database** - Enterprise-grade database with full TypeScript integration
- **📦 Shared Libraries** - Common utilities, types, and constants across the entire stack
- **🏗️ Structured Methodology** - Feature-based architecture with consistent patterns
- **🧪 Comprehensive Testing** - Unit, integration, and E2E testing setup
- **📚 Complete Documentation** - Built-in documentation system with Docusaurus

## ✨ Key Features

### 🔐 **Type Safety First**
- **100% TypeScript** coverage across the entire stack
- **Compile-time validation** with Zod schemas
- **Type-safe API calls** between client and server
- **Database type safety** with Drizzle ORM

### 🏗️ **Structured Architecture**
- **Monorepo setup** with shared packages
- **Feature-based organization** for scalability
- **Consistent development patterns** across applications
- **Clear separation of concerns**

### 🛡️ **Production Ready**
- **Authentication & Authorization** system pre-built
- **Security best practices** with Helmet and CORS
- **Database migrations** and schema management
- **SSL/TLS configuration** for secure connections

### 🧪 **Testing & Quality**
- **Automated testing** with Vitest
- **Code quality tools** (Biome)
- **Comprehensive test coverage**

## 🛠️ Technology Stack

### **Frontend**
- **React 19** - Latest component-based UI library
- **TypeScript 5** - Strongly typed JavaScript
- **Vite** - Lightning-fast build tool
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **Mantine UI** - Comprehensive component library
- **Tailwind CSS** - Utility-first styling

### **Backend**
- **NestJS 11** - Progressive Node.js framework
- **Node.js 24** - Latest runtime features
- **TypeScript 5** - Full backend type safety
- **Drizzle ORM** - Type-safe database operations
- **PostgreSQL** - Enterprise database
- **Helmet** - Security middleware

### **Shared Tools**
- **pnpm** - Fast, efficient package manager
- **Vitest** - Blazing fast testing framework
- **Zod** - TypeScript-first schema validation
- **Biome** - Fast linter and formatter
- **Docker** - Containerization support

## 🚀 Quick Start

### Prerequisites
- **Node.js 24+** - Latest runtime features
- **pnpm 10+** - Package manager
- **PostgreSQL** - Database instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheMineWay/NestFlux.git
   cd NestFlux
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up the database**
   ```bash
   # Use the built-in CLI to generate PostgreSQL Docker setup
   pnpm tools
   ```

4. **Configure environment**
   - Start the documentation: `pnpm start:docs`
   - Navigate to the **Tools** section
   - Use the `Configuration generator` tool to generate `.env` files
   - Place the generated files in their respective project folders:
     - `apps/client/.env` for the React application
     - `apps/server/.env` for the NestJS API

5. **Build packages**
    ```bash
    pnpm build:packages
    ```

6. **Start development servers**
   ```bash
   # Start all services (client, server, packages)
   pnpm dev
   
   # Or start individually:
   pnpm dev:client    # React app at http://localhost:3000
   pnpm dev:server    # NestJS API at http://localhost:3001
   pnpm dev:packages  # Watch shared packages
   ```

   (or start the dev.docker-compose.yml)

7. **Start documentation**
   ```bash
   pnpm start:docs    # Documentation at http://localhost:3002
   ```

## 🎯 Who Should Use NestFlux?

NestFlux is perfect for:

- **🧑‍💻 Full-stack developers** building TypeScript applications
- **👥 Development teams** needing standardized project structure
- **🚀 Startups** requiring rapid prototyping and scaling
- **🏢 Enterprises** demanding maintainable, testable codebases
- **📚 Learners** wanting to explore modern full-stack development

## 🔧 CLI Tools

NestFlux includes a powerful CLI for project management:

```bash
pnpm tools
```

**Available features:**
- **📝 Project Metadata** - Update name and version across all packages
- **🐳 Docker Generation** - Generate PostgreSQL setup with SSL
- **📋 Consistency Checks** - Automated validation and testing

## 🧪 Testing

Comprehensive testing setup included:

```bash
# Run all tests
pnpm test

# Run all tests in watch mode
pnpm test:dev

# Run tests in UI mode
pnpm test:ui
```

## 📚 Documentation

- **📖 Full Documentation**: Available at `/docs` when running `pnpm start:docs`
- **🏗️ Architecture Guide**: Detailed explanation of project structure
- **🔐 Security Guidelines**: Best practices for secure development

## 🛡️ Security Features

- **🔒 SSL/TLS Encryption** for all connections
- **🔐 Authentication system** with role-based access
- **🛡️ Security headers** and CORS configuration
- **📊 Database security** with encrypted connections
- **🔑 Environment management** for sensitive data

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

## 🙏 Acknowledgments

Built with ❤️ using modern open-source technologies and community best practices.

---

**🚀 Ready to build something amazing?** [Get started with the documentation](https://themineway.github.io/NestFlux/) and join the NestFlux community!
