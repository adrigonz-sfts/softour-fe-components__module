# Playwright E2E Testing

End-to-end testing with Playwright for cross-browser testing.

## Setup

Playwright is already installed. To install browsers:

```bash
npx playwright install
```

## Running Tests

```bash
# Run all E2E tests (headless)
npm run test:e2e

# Run tests with UI mode (recommended for development)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug

# View last test report
npm run test:e2e:report
```

## Test Structure

Tests are located in `src/__e2e__/`:

```
src/__e2e__/
├── app.spec.ts           # Example test
└── [feature].spec.ts     # Feature-specific tests
```

## Writing Tests

### Basic Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
    test('should do something', async ({ page }) => {
        await page.goto('/');

        const element = page.locator('[data-testid="element"]');
        await expect(element).toBeVisible();
    });
});
```

### Using Page Object Model

```typescript
// src/__e2e__/pages/LoginPage.ts
export class LoginPage {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.page.fill('[data-testid="email"]', email);
        await this.page.fill('[data-testid="password"]', password);
        await this.page.click('[data-testid="submit"]');
    }
}

// src/__e2e__/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('user can login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('user@example.com', 'password');

    await expect(page).toHaveURL('/dashboard');
});
```

## Configuration

Configuration is in [playwright.config.ts](../playwright.config.ts):

- **Test directory**: `src/__e2e__/`
- **Base URL**: `http://localhost:5173` (auto-starts dev server)
- **Browsers**: Chromium, Firefox, WebKit
- **Retries**: 2 on CI, 0 locally
- **Trace**: On first retry
- **Screenshots**: On failure
- **Video**: On failure

## Best Practices

### Use data-testid Attributes

```vue
<template>
    <button data-testid="submit-button">Submit</button>
</template>
```

```typescript
await page.click('[data-testid="submit-button"]');
```

### Wait for Network Requests

```typescript
await page.waitForResponse(
    (response) => response.url().includes('/api/users') && response.status() === 200
);
```

### Test Isolation

Each test should be independent:

```typescript
test.beforeEach(async ({ page }) => {
    // Reset state before each test
    await page.goto('/');
});
```

### Use Fixtures for Reusable Setup

```typescript
import { test as base } from '@playwright/test';

const test = base.extend({
    authenticatedPage: async ({ page }, use) => {
        // Setup: login
        await page.goto('/login');
        await page.fill('[data-testid="email"]', 'user@example.com');
        await page.fill('[data-testid="password"]', 'password');
        await page.click('[data-testid="submit"]');

        await use(page);

        // Teardown: logout
        await page.click('[data-testid="logout"]');
    },
});

test('dashboard shows user info', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/dashboard');
    // Test authenticated page
});
```

## Debugging

### VS Code Extension

Install the [Playwright VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) for:

- Run tests from editor
- Set breakpoints
- Step through test execution
- Pick locators

### Debug Mode

```bash
npm run test:e2e:debug
```

Opens Playwright Inspector to step through tests.

### Trace Viewer

If a test fails on CI:

1. Download `test-results/` artifact
2. Run: `npx playwright show-trace trace.zip`

## CI Integration

### Git Hooks (Husky)

E2E tests run automatically on every commit via Husky pre-commit hook:

- **When**: Before each commit
- **Mode**: Headless (all browsers)
- **Browsers**: Chromium, Firefox, WebKit
- **Blocking**: Commit is rejected if tests fail

To skip hooks in emergencies:

```bash
git commit --no-verify -m "message"
```

### Continuous Integration

Tests run automatically in CI pipelines with:

- Retry on failure (2 retries)
- Single worker (no parallelization)
- Trace capture on failure
- HTML report generation

## Selectors Priority

1. **ARIA roles**: `page.getByRole('button', { name: 'Submit' })` (best)
2. **Text content**: `page.getByText('Hello')`
3. **data-testid**: `[data-testid="element"]` (only especific cases)
4. **CSS selectors**: `.class-name` (avoid)

## Common Patterns

### Wait for Navigation

```typescript
await Promise.all([page.waitForNavigation(), page.click('[data-testid="link"]')]);
```

### Check API Responses

```typescript
const response = await page.waitForResponse('/api/users');
const data = await response.json();
expect(data).toHaveLength(10);
```

### Multiple Browser Contexts

```typescript
test('multiple users', async ({ browser }) => {
    const userA = await browser.newContext();
    const userB = await browser.newContext();

    const pageA = await userA.newPage();
    const pageB = await userB.newPage();

    // Test with both users
});
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
