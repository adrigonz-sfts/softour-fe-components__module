# Testing Conventions

These rules are mandatory for all test files in this repository.

## Stack

- **Vitest** for unit test runner and assertions.
- **@testing-library/vue** for component rendering and DOM queries.
- **@testing-library/user-event** for user interaction simulation.
- **Playwright** for E2E cross-browser testing.

## File Structure

- Unit/integration: test next to component, `{ComponentName}.spec.ts`; helpers/factories in `src/helpers/`. E2E: `src/__e2e__/{feature}.spec.ts`; page objects in `src/__e2e__/pages/`.

## Custom Renderer (mandatory)

Use `customRenderer` from `@/test/helpers/customRenderer` for any test that renders Vue components with plugins. Chain `.withProps()`, `.withRoute()`, `.withRoutes()`, `.withI18n()` then `.build()`; `.build()` returns `{ ...renderResult, router, pinia, i18n }`.

**Rules**: Never create Pinia/Router/I18n manually. Never put builder or store in `beforeEach` or module-scope `let`. No wrapper helpers for store init; store access explicit per test. After `customRenderer(Component)` stores are active (e.g. `usePokemonStore()`).

**Pattern** (store setup then build):

```js
it('renders data from store', async () => {
    const builder = customRenderer(MyComponent);
    usePokemonStore().pokemons = [somePokemon];
    await builder.withRoute('/pokemon/Pikachu').build();
    expect(screen.getByText('Pikachu')).toBeTruthy();
});
```

## Test Data & Mocking

- Factories from `@/test/factories/`; shared mock data as module-scope `const` OK; mutable state (stores, builders, render) scoped per test. API: `vi.mock('@/core/api/...')` at module scope; use factories for responses; `vi.fn()` for spies; `vi.clearAllMocks()` in `beforeEach`/`afterEach`.

## Cleanup & Independence

- `cleanup()` and `vi.clearAllMocks()` in `beforeEach` or `afterEach`. Tests self-contained, no execution-order dependency, no shared mutable state; store interaction visible in test body.

## Imports

- `@/` for all imports. From vitest: `describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach`. From `@testing-library/vue`: `screen`, `cleanup`, `waitFor` — not `render` (use `customRenderer`).

## Prohibitions

- No `render()` from Testing Library for components that need plugins; no manual Pinia/Router/I18n; no module-scope `let` for builders/stores; no store-init helpers; no builder/store setup in `beforeEach` (only `cleanup()` and `vi.clearAllMocks()`); do not pass store instances to `customRenderer`.

## Validation Checklist

See `../AI_RULES.md`. Test-specific: use `customRenderer` only; no manual plugins; no module-scope mutable state; E2E use `data-testid` and wait for network when needed.

---

## E2E (Playwright)

- Location: `src/__e2e__/{feature}.spec.ts`. Selector priority: `data-testid` (prefer), ARIA roles, text; avoid CSS. Use `data-testid` in components; wait for network when async; no hardcoded delays. See [PLAYWRIGHT.md](../../PLAYWRIGHT.md). Commands: `npm run test:e2e`, `test:e2e:ui`, `test:e2e:debug`.
