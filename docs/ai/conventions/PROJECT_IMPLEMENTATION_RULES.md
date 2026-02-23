# Project Implementation Rules

**Layer architecture**: See `../AI_RULES.md` for strict layer separation rules.

**Below**: Framework-specific and code style conventions derived from current codebase.

## Import and Module Rules

- Use the `@/` alias for imports from `src`.
- Do not use relative paths when an `@/` alias is available.
- Import Vue components from `views` for routing.

## Vue Component Rules

- Use `<script setup>` in all Vue single-file components.
- Keep component logic inside `<script setup>` only.
- Use external SCSS files via `<style src="./ComponentName.scss" lang="scss" scoped />`. NO closing tag, it is auto-closed.
- Do not inline large style blocks in `.vue` files.

## Module Organization Rules

- Modules that are view-specific (used by only one view) must live inside `views/{viewName}/` alongside the view component.
- Only truly reusable modules that are shared across multiple views should live in `shared/modules/`.
- Test files (`.spec.ts`) must live **at the same level** as the component/module they test.
- View components must use relative imports for their view-specific modules: `import Module from './login/Module.vue'`.
- Shared modules must be imported via `@/` alias: `import Module from '@/shared/modules/Module.vue'`.

Example structure:

```
views/
    LoginView/
        LoginView.vue
        LoginView.scss
        __tests__/
            LoginView.spec.ts
        modules/
            AuthRedirect.vue
            AuthRedirect.scss
            __tests__/
                AuthRedirect.spec.ts
```

## Store Rules

- Define Pinia stores using `defineStore`.
- Store files must be split into `state`, `actions`, and `getters` modules.
- Store actions must use `try/catch/finally` for async work. Finally can be avoided.
- Store actions must manage `loading` and `error` consistently if needed.
- Store must call `core/services` for data loading.

## Routing Rules

- Use hash history via `createWebHashHistory`.
- Routes must map to components inside `views`.

## i18n Rules

- Use `$t('key.path')` in templates for user-facing strings.
- i18n keys must be defined in `src/locale/{languaje-code}.json` or the active i18n registry.
- Do not hardcode UI strings when an i18n key is expected.

## Testing Rules

- Use Vitest and Testing Library for tests.
- API calls must be mocked in tests via `vi.mock()`.
- Tests may import and mock `core/api` modules to isolate IO.
- Component tests must use the `customRenderer` builder from `@/test/helpers/customRenderer` — never create plugins manually.
- Each test must create its own builder and access stores inline — no shared mutable state in `beforeEach` or module-scope `let` variables.
- Use factory functions from `@/test/factories/` for test data.
- See `TESTING_CONVENTIONS.md` for full rules and patterns.

## Validation Checklist

See `../AI_RULES.md`; test-specific items: `TESTING_CONVENTIONS.md`.
