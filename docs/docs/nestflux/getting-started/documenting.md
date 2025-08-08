---
sidebar_position: 5
---

# 📚 Documenting

Learn how to create and maintain documentation in NestFlux.

## 🎯 Documentation Platform

NestFlux uses **Docusaurus** as its documentation platform, providing:

- **Modern Interface**: Clean, professional documentation site
- **Markdown Support**: Write docs in Markdown with MDX extensions
- **Search Functionality**: Built-in search across all documentation
- **Responsive Design**: Works perfectly on desktop and mobile
- **Version Control**: Documentation lives alongside code

## 🚀 Starting Documentation

Start the documentation development server:

```bash
pnpm start:docs
```

This launches Docusaurus at `http://localhost:3000` with hot reload for instant preview of changes.

## 📁 Documentation Structure

The documentation is organized into two main sections:

### 🏗️ NestFlux Documentation

Located in `docs/docs/nestflux/` - **Template Documentation**

Contains documentation about the NestFlux template itself:
- Architecture explanations
- Setup and configuration guides
- Feature patterns and conventions
- Technology stack information
- Development workflows

**Purpose**: Help developers understand how to use and extend the NestFlux template.

### 🎯 Project Documentation

Located in `docs/docs/project/` - **Your Project's Documentation**

Reserved for your specific project documentation:
- Business logic and requirements
- Domain-specific decisions
- Project architecture choices
- Team conventions and standards
- Deployment procedures

**Purpose**: Document your specific project built with NestFlux.

## ✍️ Writing Documentation

### Creating New Pages

1. **Choose the right section**:
   - NestFlux features → `docs/docs/nestflux/`
   - Project-specific content → `docs/docs/project/`

2. **Create the file**:
   ```markdown
   ---
   sidebar_position: 1
   ---
   
   # Your Page Title
   
   Page content here...
   ```

3. **Add to navigation**: Files are automatically included in the sidebar based on their location and `sidebar_position`.

### Markdown Features

Docusaurus supports enhanced Markdown with:

- **Code blocks** with syntax highlighting
- **Tabs** for multiple examples
- **Admonitions** for notes and warnings
- **Mermaid diagrams** for flowcharts and schemas
- **MDX components** for interactive content

### Example Structure

```
docs/docs/
├── nestflux/           # Template documentation
│   ├── index.md
│   ├── architecture/
│   ├── getting-started/
│   └── technologies/
└── project/            # Your project docs
    ├── index.md
    ├── business-rules/
    ├── deployment/
    └── team-guidelines/
```

## 🚀 Publishing Documentation

### Building Documentation

Build the documentation site:

```bash
pnpm build:docs
```

Output: `docs/build/` - Static site ready for deployment

### Automated Pipeline

NestFlux comes with a pre-configured GitHub Actions pipeline that:

- **Tests Documentation**: Runs Playwright tests to ensure documentation works correctly
- **Publishes to GitHub Pages**: Automatically deploys documentation on merge to main branch
- **Quality Assurance**: Validates links, builds, and functionality before deployment

The pipeline ensures your documentation is always tested and up-to-date in production.

### Manual Deployment Options

- **GitHub Pages**: Automatic deployment from repository (pre-configured)
- **Netlify/Vercel**: Connect to your repository for auto-deployment
- **Static Hosting**: Deploy the `build/` folder to any static host
