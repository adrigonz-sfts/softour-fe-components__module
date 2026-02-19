# Code Conventions

**Naming rules**: See `NAMING_CONVENTIONS.md`

**Below**: Code style and structure rules enforced by ESLint and Prettier.

## Formatting (Prettier)

All code is automatically formatted by Prettier. Key settings:

- **Indentation**: 4 spaces (no tabs)
- **Quotes**: Single quotes
- **Semicolons**: Required
- **Trailing commas**: ES5 style
- **Print width**: 100 characters
- **Vue attributes**: One per line

Run `npm run format` before committing or use format-on-save in your editor.

## CSS/SCSS (Stylelint)

All styles follow **BEM (Block Element Modifier)** naming convention with flexible rules:

- **Classes**: BEM format (`.block__element--modifier`)
- **Variables**: kebab-case (`$primary-color`)
- **Mixins/Functions**: kebab-case
- **No IDs** for styling
- **No `!important`**
- **Max specificity**: 0,4,0

```scss
// ✅ Good
.user-card {
}
.user-card__avatar {
}
.user-card__avatar--large {
}
$primary-color: #007bff;

// ❌ Bad
.userCard {
} // Not BEM
.user-card-avatar {
} // Should use __
#header {
} // No IDs
color: red !important; // No !important
```

Run `npm run lint:styles` to check styles. See [STYLELINT.md](../../STYLELINT.md) for complete guide.

## Code Style Rules

- Code must be self-explanatory and maintainable; avoid cleverness.
- Keep logic simple, predictable, and explicit.

## Syntax Rules (ESLint Enforced)

- No magic numbers; extract to named constants.
- No unnecessary comparisons.
- No ambiguous conditions; must be explicit.
- No `innerHTML` without sanitization.
- No `else` statements.
- All `if` statements use `{}` even for single lines.
- HTML tags with multiple attributes: multiline.
- `async/await` requires `try/catch`.
- `map` only for returning values; no side effects.

## Forbidden Code Patterns

- Implicit type changes within a single function.
- Side effects inside `map` or `filter` callbacks.
- Truthy/falsy without explicit intent.

## Validation Checklist

- No magic numbers (constants extracted).
- No `else` statements.
- All `if` statements use `{}`.
- No `innerHTML` without sanitization.
- `async` functions have `try/catch`.
- `map` returns values only.
