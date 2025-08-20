# 🤝 Contributing to NestFlux

We're thrilled that you're interested in contributing to NestFlux! This document provides guidelines for contributing to this TypeScript monorepo scaffold project.

## 🌟 Welcome Contributors!

**Everyone is welcome to fork and create pull requests!** We believe in open collaboration and appreciate all contributions, whether they're bug fixes, documentation improvements, or new features.

## 🎯 Project Philosophy

NestFlux is designed to be a **generic, reusable scaffold** for TypeScript full-stack applications. When contributing, please keep these core principles in mind:

### ✅ What We Welcome
- **🐛 Bug fixes** - Fixing issues in existing functionality
- **📚 Documentation improvements** - Better explanations, examples, and guides
- **🧪 Test coverage** - Adding or improving tests
- **⚡ Performance improvements** - Optimizations that don't change core structure
- **🔧 Developer experience** - Tooling and workflow improvements
- **🛡️ Security enhancements** - Security fixes and improvements
- **📦 Dependency updates** - Keeping libraries up-to-date
- **✨ Generic features** - Features that benefit most scaffold users

### ❌ What We Cannot Accept
- **🏗️ Structural changes** that affect the scaffold's architecture (majors should be discussed)
- **🎨 Opinionated design decisions** that limit the scaffold's flexibility
- **🔗 Business logic** specific to particular domains or use cases
- **💼 Application-specific features** that don't serve the general scaffold purpose
- **🎛️ Breaking changes** to the established patterns and conventions

## 📋 Contribution Guidelines

### 🔍 Before You Start
1. **Check existing issues** - See if someone is already working on it
2. **Create an issue** - Discuss your idea before implementing
3. **Review the documentation** - Understand the project structure
4. **Follow the patterns** - Stay consistent with existing code

### 📝 Code Standards
- **TypeScript** - All code must be properly typed
- **ESLint/Biome** - Follow the established linting rules
- **Testing** - Include tests for new functionality
- **Documentation** - Update docs for new features
- **Commit messages** - Use clear, descriptive commit messages

## 🎨 Code Style Guidelines

### TypeScript Standards
- Use **strict TypeScript** configurations
- Prefer **interfaces over types** for object shapes
- Use **meaningful variable names**
- Add **JSDoc comments** for public APIs

### File Organization
- Follow the **feature-based structure**
- Keep files **focused and cohesive**
- Use **consistent naming conventions**

## 🔄 Pull Request Process

### 1. Prepare Your PR
- **Rebase** your branch on the latest main
- **Squash commits** if they're related
- **Add tests** for new functionality

### 2. PR Description Template
```markdown
## 📋 Description
Brief description of what this PR does.

## 🎯 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (please describe)

## 🧪 Testing
- [ ] Tests pass locally
- [ ] New tests added (if applicable)
- [ ] Manual testing completed

## 📚 Documentation
- [ ] Documentation updated
- [ ] README updated (if needed)
- [ ] Comments added to complex code

## ✅ Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] No breaking changes to scaffold structure
- [ ] Changes are generic and reusable
```

### 3. Review Process
1. **Automated checks** must pass (tests, linting, building)
2. **Code review** by maintainers
3. **Feedback incorporation** if requested
4. **Final approval** and merge

## 🚫 What Will Be Rejected

### Scaffold Structure Changes
- Modifying the monorepo structure
- Changing the feature organization pattern
- Altering the shared packages architecture

### Opinionated Additions
- Specific UI/UX designs that limit customization
- Business logic for particular industries
- Rigid styling or theming constraints

### Breaking Changes
- Changes that require existing users to restructure their code
- Modifications to established APIs without deprecation
- Removal of core functionality

## 🐛 Bug Reports

When reporting bugs, please include:

```markdown
## 🐛 Bug Description
Clear description of the issue

## 🔄 Steps to Reproduce
1. Step one
2. Step two
3. Step three

## 🎯 Expected Behavior
What should happen

## 📱 Environment
- Node.js version:
- pnpm version:
- Operating System:
- Browser (if applicable):
```

## 💡 Feature Requests

For new features, please consider:

1. **Is it generic enough?** - Will it benefit most scaffold users?
2. **Does it fit the philosophy?** - Maintains flexibility and reusability?

## 📞 Getting Help

- **💬 Discussions** - GitHub Discussions for questions
- **📋 Issues** - GitHub Issues for bugs and feature requests
- **📚 Documentation** - Check the `/docs` folder for guides

## 📄 License

By contributing to NestFlux, you agree that your contributions will be licensed under the MIT License.

---

## 🚀 Thank You!

Your contributions help make NestFlux a better scaffold for the entire TypeScript community. Whether you're fixing a typo or adding a major feature, every contribution matters!

**Happy coding! 🎉**
