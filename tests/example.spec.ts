import { test, expect } from '@playwright/test';

test.describe('Playwright website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('has title',{tag: '@smoke'}, async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();

    await expect(
      page.getByRole('heading', { name: 'Installation' })
    ).toBeVisible();
  });
});

test.describe('GitHub website', () => {
  test('has title', async ({ page }) => {
    await page.goto('https://github.com');
    await expect(page).toHaveTitle(/GitHub/);
  });

  test('fail login in github', async ({ page }) => {
    await page.goto('https://github.com/login');

    const username = page.getByRole('textbox', { name: 'Username or email address' });
    const password = page.getByRole('textbox', { name: 'Password' });
    const signInButton = page.getByRole('button', { name: 'Sign in' });

    // I use a fake email because some usernames can trigger a different login flow.
    await username.fill(`fake-user-${Date.now()}@example.com`);
    await password.fill('invalid_password');

    await signInButton.click();

    await expect(page.locator('div').filter({ hasText: 'Incorrect username or ' }).nth(5)).toContainText( 'Incorrect username or password' );
  });
});

test.describe('Google search flow', () => {
  test('go to playwright via google', async ({ page }) => {
    await page.goto('https://google.com');

    await expect(page).toHaveTitle(/Google/);

    await page.getByRole('combobox', { name: 'Buscar' }).fill('Playwright');
    await page.keyboard.press('Enter');

    await expect(page.getByRole('link', { name: 'Playwright: Fast and reliable end-to-end testing for modern web apps' })).toBeVisible();
    
    await page.getByRole('link', { name: 'Playwright: Fast and reliable end-to-end testing for modern web apps' }).click();

    await expect(page).toHaveTitle(/Playwright/);
  });
});


