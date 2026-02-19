# Prettier Configuration

This project uses Prettier for consistent code formatting across the codebase.

## Configuration

All settings are defined in [.prettierrc.json](.prettierrc.json):

- **Indentation**: 4 spaces (no tabs)
- **Quotes**: Single quotes
- **Semicolons**: Enabled
- **Trailing commas**: ES5 style (objects, arrays)
- **Print width**: 100 characters
- **Arrow parens**: Always
- **End of line**: LF (Unix)
- **Vue**: Single attribute per line, no indent for script/style

## Commands

```bash
# Format all files
npm run format

# Check formatting without changes
npm run format:check
```

## Pre-commit Hook

Prettier runs automatically on staged files via Husky + lint-staged:

1. Stage your changes: `git add .`
2. Commit: `git commit -m "message"`
3. Prettier formats staged files before commit

## Editor Integration

### VS Code

Install the Prettier extension:

```json
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```

### WebStorm / IntelliJ

1. Go to **Settings** → **Languages & Frameworks** → **Prettier**
2. Enable "On save"
3. Set Node interpreter and Prettier package path

## Integration with ESLint

Prettier is integrated with ESLint via `eslint-config-prettier`, which disables conflicting ESLint formatting rules.

**Order of execution in lint-staged:**
1. Prettier formats the code
2. ESLint fixes remaining issues

## Ignored Files

See [.prettierignore](.prettierignore) for excluded files:

- `node_modules/`
- `dist/`
- `coverage/`
- Build artifacts
- Lock files

## Rules Alignment

Prettier configuration matches ESLint conventions:

| Rule | ESLint | Prettier |
|------|--------|----------|
| Indentation | 4 spaces | `tabWidth: 4` |
| Quotes | Single | `singleQuote: true` |
| Trailing commas | ES5 | `trailingComma: "es5"` |
| Semicolons | Enabled | `semi: true` |
| Print width | - | `printWidth: 100` |
| Vue attributes | Multiline | `singleAttributePerLine: true` |

## Common Issues

### Conflict between ESLint and Prettier

If you see conflicts, ensure `eslint-config-prettier` is last in ESLint config.

### Format not applied on save

1. Check editor settings for format on save
2. Verify Prettier is set as default formatter
3. Check `.prettierignore` - file might be excluded

### Different formatting in CI

Ensure all developers use the same:
- Node version
- Prettier version (defined in `package.json`)
- Configuration files (`.prettierrc.json`)
