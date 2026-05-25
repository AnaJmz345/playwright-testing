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


