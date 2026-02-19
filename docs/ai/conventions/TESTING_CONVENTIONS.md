# Testing Conventions

These rules are mandatory for all test files in this repository.

## Stack

- **Vitest** for unit test runner and assertions.
- **@testing-library/vue** for component rendering and DOM queries.
- **@testing-library/user-event** for user interaction simulation.
- **Playwright** for E2E cross-browser testing.

## File Structure

### Unit & Integration Tests

- Test files live **next to the component/module they test** (same directory).
- Test files are named `{ComponentName}.spec.ts`.
- Test helpers and factories live in `src/helpers/`.

Example:

```
views/
    LoginView/
        LoginView.vue
        LoginView.scss
        __tests__/
            LoginView.spec.ts
```

### E2E Tests

- E2E tests live in `src/__e2e__/`.
- Test files are named `{feature}.spec.ts`.
- Page objects (if used) live in `src/__e2e__/pages/`.

## Unit Testing with Vitest

## Custom Renderer (Builder Pattern)

All tests that render Vue components with plugins **must** use the `customRenderer` builder from `@/test/helpers/customRenderer`.

### How it works

1. `customRenderer(Component)` creates a fresh Pinia instance, activates it, and returns a builder.
2. Chain optional configuration: `.withProps()`, `.withRoute()`, `.withRoutes()`, `.withI18n()`.
3. Call `.build()` to render the component with router, pinia, and i18n plugins.
4. `.build()` returns `{ ...renderResult, router, pinia, i18n }`.

### Rules

- **Never** create `createPinia()`, `createRouter()`, or `createI18n()` manually in test files. Use `customRenderer` instead.
- **Never** initialize the builder in `beforeEach`. Each test must create its own builder inline.
- **Never** store builders, stores, or render results in module-scope `let` variables.
- **Never** create local helper functions (`initStores`, `renderWithRouter`, etc.) that wrap store initialization. Store access must be explicit and visible in each test.
- After calling `customRenderer(Component)`, stores can be accessed immediately via `usePokemonStore()`, `useSessionStore()`, etc., since Pinia is already active.

### Pattern: Simple render

```js
it('renders empty list', async () => {
    await customRenderer(MyComponent).withProps({ items: [] }).build();

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
});
```

### Pattern: Store setup before render

```js
it('renders data from store', async () => {
    const builder = customRenderer(MyComponent);
    const pokemonStore = usePokemonStore();
    pokemonStore.pokemons = [somePokemon];
    await builder.withRoute('/pokemon/Pikachu').build();

    expect(screen.getByText('Pikachu')).toBeTruthy();
});
```

### Pattern: Accessing render result (router, i18n)

```js
it('redirects after action', async () => {
    const builder = customRenderer(MyComponent).withRoutes(customRoutes);
    const sessionStore = useSessionStore();
    sessionStore.loadSessionContext = vi.fn();
    const { router } = await builder.build();

    await userEvent.click(screen.getByRole('button'));
    expect(router.currentRoute.value.path).toBe('/target');
});
```

## Test Data

- Use factory functions from `@/test/factories/` to build test data.
- Prefer `buildPokemonDomain()`, `buildPokemonApiDto()`, `buildPokemonListResponse()`, etc.
- Shared mock data (e.g., `mockPokemons`, `pikachuDto`) can be defined as module-scope `const` values.
- **Mutable** test state (stores, builders, render results) must be scoped to each individual test.

## Mocking

- API modules must be mocked via `vi.mock('@/core/api/...')` at the module scope.
- Mock implementations should use factory functions for response data.
- Use `vi.fn()` for spying on store actions or service calls.
- Call `vi.clearAllMocks()` in `beforeEach` or `afterEach`.

## Cleanup

- Call `cleanup()` from `@testing-library/vue` in `beforeEach` or `afterEach`.
- Clear mocks in `beforeEach` or `afterEach` via `vi.clearAllMocks()`.

## Test Independence

- Each test must be fully self-contained and independently runnable.
- Tests must not depend on execution order.
- Tests must not share mutable state across test cases.
- Every store interaction must be visible in the test body — no hidden setup.

## Imports

- Use `@/` alias for all imports, including test helpers and factories.
- Import only what is needed from `vitest`: `describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach`.
- Import `screen`, `cleanup`, `waitFor` from `@testing-library/vue` — **not** `render` (use `customRenderer` instead).

## What NOT to Do

- Do not use `render()` directly from `@testing-library/vue` for components that need plugins.
- Do not create `createPinia()`, `createRouter()`, `createI18n()` in test files.
- Do not store builder or store references in module-scope `let` variables.
- Do not create wrapper/helper functions for store initialization inside test files.
- Do not use `beforeEach` to set up builders or stores — only for `cleanup()` and `vi.clearAllMocks()`.
- Do not pass store instances to `customRenderer` — it manages Pinia internally.

## Validation Checklist

- All component tests use `customRenderer` builder pattern.
- No manual plugin creation in test files.
- Each test is independent and self-contained.
- Store interactions are explicit in test body.
- E2E tests use `data-testid` attributes for selectors.
- E2E tests wait for network requests when needed.

---

## E2E Testing with Playwright

E2E tests verify complete user workflows across real browsers (Chromium, Firefox, WebKit).

### File Location

`src/__e2e__/{feature}.spec.ts`

### Basic Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
    test('should complete user workflow', async ({ page }) => {
        await page.goto('/');

        const element = page.locator('[data-testid="element"]');
        await expect(element).toBeVisible();
    });
});
```

### Selector Priority

1. **data-testid**: `[data-testid="submit-button"]` (best)
2. **ARIA roles**: `page.getByRole('button', { name: 'Submit' })`
3. **Text content**: `page.getByText('Hello')`
4. **CSS selectors**: Avoid

### Rules

- Always use `data-testid` attributes in Vue components for E2E tests.
- Wait for network responses when testing async operations.
- Each test should be independent (use `beforeEach` for setup).
- Never hardcode delays — use Playwright's auto-waiting.
- Use Page Object Model for complex pages.

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (recommended for development)
npm run test:e2e:ui

# Debug tests
npm run test:e2e:debug
```

See [PLAYWRIGHT.md](../../PLAYWRIGHT.md) for complete documentation.

- No module-scope mutable variables (`let`) for builders, stores, or render results.
- No local helper functions for store initialization.
- Each test creates its own builder and accesses stores inline.
- Factory functions are used for test data.
- API mocks use `vi.mock()` at module scope.
- `cleanup()` and `vi.clearAllMocks()` are called in `beforeEach` or `afterEach`.
- All imports use `@/` alias.
