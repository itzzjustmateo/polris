# Contributing to Polaris

Thank you for your interest in improving Polaris! Your feedback, issues, and pull requests (PRs) are all welcome. This guide will help you participate effectively.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Making Changes](#making-changes)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community Guidelines](#community-guidelines)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher
- **Package Manager**: Bun (recommended) or npm/pnpm/yarn
- **Git**: Latest version
- **Code Editor**: VS Code (recommended) with the following extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

> This Guide will use `bun` as the package manager, but `npm`, `pnpm`, or `yarn` can be used as well.

### Fork and Clone

1. **Fork the repository** on GitHub by clicking the "Fork" button
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/itzzjustmateo/polris.git
   cd polris
   ```
3. **Add upstream remote** to keep your fork in sync:
   ```bash
   git remote add upstream https://github.com/itzzjustmateo/polris.git
   ```

### Development Setup

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables (see [docs/deployment.md](docs/deployment.md))

3. **Run the development server**:
   ```bash
   bun dev
   ```

4. **Open your browser** at `http://localhost:3000`

5. **Verify the setup** by checking that the app loads without errors

---

## 🔄 Development Workflow

### Branch Naming Conventions

Use descriptive branch names following this pattern:

- `feat/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/what-changed` - Documentation updates
- `refactor/what-changed` - Code refactoring
- `test/what-added` - Adding or updating tests
- `chore/what-changed` - Maintenance tasks

**Examples:**
```bash
feat/add-code-folding
fix/editor-crash-on-save
docs/update-deployment-guide
refactor/extract-editor-hooks
```

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
feat(editor): add syntax highlighting for Python
fix(auth): resolve Clerk authentication redirect loop
docs: update contributing guidelines with commit format
refactor(ui): extract button component variants
```

### Code Style Guidelines

- **TypeScript**: Use strict mode, avoid `any` types
- **Formatting**: Prettier handles formatting automatically
- **Linting**: ESLint catches common issues
- **Naming**:
  - Components: kebab-case (`code-editor.tsx`)
  - Utilities: camelCase (`formatCode.ts`)
  - Constants: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)

### Before Committing

Always run these commands before committing:

```bash
# Format code
bun run format

# Lint code
bun run lint

# Type check
bun run type-check

# Run tests (when available)
bun run test
```

---

## 🛠️ Making Changes

### 1. Create a Feature Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feat/your-feature-name
```

### 2. Make Your Changes

- Write clean, readable code
- Follow existing patterns in the codebase
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

- Test manually in the browser
- Verify on different screen sizes
- Check dark mode compatibility
- Test with different user scenarios

### 4. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat(editor): add code folding support"
```

### 5. Push to Your Fork

```bash
git push origin feat/your-feature-name
```

### 6. Create a Pull Request

- Go to your fork on GitHub
- Click "Compare & pull request"
- Fill out the PR template
- Link related issues

---

## 📐 Code Standards

### TypeScript Best Practices

```typescript
// ✅ Good: Explicit types
interface EditorProps {
  content: string;
  language: string;
  onChange: (value: string) => void;
}

// ❌ Bad: Using any
function handleChange(value: any) {
  // ...
}

// ✅ Good: Type inference where appropriate
const files = ['index.ts', 'app.tsx'];

// ✅ Good: Use const assertions
const EDITOR_THEMES = ['light', 'dark', 'monokai'] as const;
```

### React Component Patterns

```typescript
// ✅ Good: Functional components with TypeScript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  return (
    <button className={cn('btn', variant)} onClick={onClick}>
      {children}
    </button>
  );
}

// ✅ Good: Use hooks appropriately
function useCodeEditor(initialContent: string) {
  const [content, setContent] = useState(initialContent);
  
  useEffect(() => {
    // Setup logic
    return () => {
      // Cleanup logic
    };
  }, []);
  
  return { content, setContent };
}
```

### File Organization

> Note: The following directory structure is an illustrative example. Actual implementations may vary based on specific project requirements.

```
src/
├── app/                    # Next.js app directory
│   ├── (routes)/          # Route groups
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── features/         # Feature-specific components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

### Naming Conventions

- **Components**: `code-editor.tsx`, `file-explorer.tsx`
- **Hooks**: `useCodeEditor.ts`, `useFileSystem.ts`
- **Utils**: `formatCode.ts`, `parseFile.ts`
- **Types**: `editor.types.ts`, `file.types.ts`
- **Constants**: `constants.ts` or `config.ts`

---

## 🧪 Testing Guidelines

### Writing Tests

```typescript
// Example: Component test
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run tests with coverage
bun test --coverage
```

### Coverage Requirements

- Aim for at least 80% code coverage
- All new features should include tests
- Bug fixes should include regression tests

---

## 🔀 Pull Request Process

### PR Checklist

Before submitting a PR, ensure:

- [ ] Code follows the style guidelines
- [ ] All tests pass
- [ ] No linting errors
- [ ] Documentation is updated (if needed)
- [ ] Commit messages follow conventional format
- [ ] PR description is clear and complete
- [ ] Related issues are linked

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Screenshots (if applicable)
[Add screenshots here]

## Testing
- [ ] Tested locally
- [ ] Tested on different browsers
- [ ] Tested dark mode

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process

1. **Automated Checks**: CI/CD runs linting, type checking, and tests
2. **Code Review**: Maintainers review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged
5. **Merge**: Maintainers will merge using squash or rebase

### After Your PR is Merged

- Delete your feature branch (if needed)
- Update your local main branch
- Celebrate! 🎉

---

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on what's best for the community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Pull Requests**: Code contributions

### Reporting Issues

When reporting a bug, include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, browser, Node version
- **Screenshots**: If applicable

### Feature Requests

When requesting a feature:

- Describe the problem you're trying to solve
- Explain your proposed solution
- Provide examples or mockups if possible
- Discuss alternatives you've considered

### Getting Help

- Check existing issues and discussions first
- Ask clear, specific questions
- Provide context and examples
- Be patient and respectful

---

## 🎯 Areas to Contribute

Looking for where to start? Here are some areas:

- **Documentation**: Improve guides, add examples
- **Bug Fixes**: Check issues labeled `bug`
- **Features**: Check issues labeled `enhancement`
- **UI/UX**: Improve design and user experience
- **Performance**: Optimize code and bundle size
- **Accessibility**: Improve a11y compliance
- **Testing**: Add or improve tests

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org)

---

## 🙏 Thank You!

Your contributions make Polaris better for everyone. We appreciate your time and effort!

If you have any questions, feel free to open an issue or discussion.

Happy coding! 🚀
