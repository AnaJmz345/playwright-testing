import {test,expect} from "@playwright/test";

test.describe('Mocking http requests and fallbacks',()=>{
    test('go to Playwright page without loading images', async ({ page }) => {

        // Block image requests
        await page.route('**/*.{png,jpg,jpeg,svg,gif,webp}', async (route) => {
            await route.abort();
        });

        await page.goto('https://playwright.dev/');
        expect(page.getByRole("img")).toHaveCount(0);
        expect(page.getByRole("heading",{name: "Playwright enables end-to-end testing for modern web apps"})).toBeVisible();
    });
})