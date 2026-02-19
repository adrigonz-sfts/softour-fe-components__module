# Stylelint Configuration

This project uses Stylelint to enforce consistent CSS/SCSS code style following BEM naming convention.

## BEM (Block Element Modifier)

BEM is a naming methodology that helps create reusable components and code sharing.

### Structure

```
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

### Examples

```scss
// ✅ Good - BEM naming
.button {
}
.button__icon {
}
.button--primary {
}
.button__icon--large {
}

.card {
}
.card__header {
}
.card__title {
}
.card__body {
}
.card--highlighted {
}

// ❌ Bad - Not following BEM
.Button {
} // Should be lowercase
.card-header {
} // Should use __ for element
.button_primary {
} // Should use -- for modifier
.btn {
} // Abbreviations (use full words)
```

### BEM Patterns Allowed

Our configuration uses **flexible BEM** rules:

- **Block**: `block-name` (kebab-case)
- **Element**: `block__element-name` (double underscore)
- **Modifier**: `block--modifier-name` or `block__element--modifier` (double dash)
- Multiple words in block/element/modifier: use hyphen (`-`)

```scss
// ✅ Valid patterns
.user-profile {
}
.user-profile__avatar {
}
.user-profile__avatar--large {
}
.user-profile--premium {
}
.navigation-menu__item {
}
.navigation-menu__item--active {
}
```

## Commands

```bash
# Check styles
npm run lint:styles

# Auto-fix style issues
npm run lint:styles:fix
```

## Configuration Files

- **[.stylelintrc.json](.stylelintrc.json)**: Main configuration
- **[.stylelintignore](.stylelintignore)**: Ignored files/folders

## Key Rules

### BEM Naming

Class names must follow BEM pattern:

```scss
// Pattern: ^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$

.component-name {
} // Block
.component-name__element {
} // Element
.component-name--modifier {
} // Modifier
```

### Naming Conventions

- **Classes**: BEM (see above)
- **IDs**: kebab-case (avoid using IDs for styling)
- **Variables**: kebab-case (`$primary-color`)
- **Mixins**: kebab-case (`@mixin button-style`)
- **Functions**: kebab-case (`@function calculate-rem()`)

### Restrictions

- ❌ **No ID selectors** for styling (`#id`)
- ❌ **No `!important`** declarations
- ⚠️ **Max specificity**: `0,4,0` (4 classes max)
- ✅ Use classes for all styling

## Vue Components

Stylelint works with `<style>` blocks in `.vue` files:

```vue
<template>
    <div class="user-card">
        <div class="user-card__avatar"></div>
        <h2 class="user-card__name"></h2>
    </div>
</template>

<style lang="scss" scoped>
.user-card {
    padding: 16px;
}

.user-card__avatar {
    width: 48px;
    height: 48px;
}

.user-card__name {
    font-size: 18px;
}
</style>
```

## Pre-commit Hook

Stylelint runs automatically on staged files before commit via lint-staged:

```json
{
    "src/**/*.{css,scss}": ["stylelint --fix", "prettier --write"],
    "src/**/*.vue": ["stylelint --fix"]
}
```

## Common Violations

### 1. Not Following BEM

```scss
// ❌ Bad
.card-title {
} // Should be .card__title
.button_active {
} // Should be .button--active

// ✅ Good
.card__title {
}
.button--active {
}
```

### 2. Using IDs for Styling

```scss
// ❌ Bad
#header {
    background: blue;
}

// ✅ Good
.header {
    background: blue;
}
```

### 3. Using !important

```scss
// ❌ Bad
.button {
    color: red !important;
}

// ✅ Good
.button {
    color: red;
}
```

### 4. High Specificity

```scss
// ❌ Bad (too specific)
.page .section .card .title .text {
    color: red;
}

// ✅ Good
.card__title {
    color: red;
}
```

## SCSS Features

### Variables

```scss
// ✅ Good - kebab-case
$primary-color: #007bff;
$font-size-large: 18px;
$spacing-unit: 8px;

// ❌ Bad
$primaryColor: #007bff; // camelCase not allowed
$FONT_SIZE: 18px; // SCREAMING_SNAKE_CASE not allowed
```

### Mixins

```scss
// ✅ Good
@mixin button-style {
    padding: 8px 16px;
    border-radius: 4px;
}

@mixin respond-to($breakpoint) {
    @media (min-width: $breakpoint) {
        @content;
    }
}
```

### Nesting

Keep nesting shallow (max 3 levels recommended):

```scss
.card {
    padding: 16px;

    &__header {
        margin-bottom: 8px;
    }

    &__title {
        font-size: 18px;
    }

    &--featured {
        border: 2px solid gold;
    }
}
```

## Editor Integration

### VS Code

Install the [Stylelint extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint):

```json
{
    "stylelint.validate": ["css", "scss", "vue"],
    "editor.codeActionsOnSave": {
        "source.fixAll.stylelint": "explicit"
    }
}
```

## Disabling Rules

Only when absolutely necessary:

```scss
/* stylelint-disable-next-line selector-max-id */
#legacy-id {
    color: red;
}

/* stylelint-disable */
.legacy-code {
    // Old code that can't be refactored yet
}
/* stylelint-enable */
```

## Resources

- [BEM Methodology](https://getbem.com/)
- [Stylelint Documentation](https://stylelint.io/)
- [Stylelint Rules](https://stylelint.io/user-guide/rules/)
- [SCSS Guidelines](https://sass-guidelin.es/)
