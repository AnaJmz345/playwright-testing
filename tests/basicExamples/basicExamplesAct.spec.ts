
import { test,firefox,chromium,expect } from '@playwright/test';

/* ¿Qué es un browser context?
cuando abres la páginaa creas el contexto de la página, el contexto es como un perfil/sesión independiente dentro del navegador, es como tener un chrome o un firefox, limpio con sus propias cookies,login,cache, permisos, etc. Dentro del contexto creas las páginas, cada página es una pestaña del navegador. En otras palabras, el contexto es como una ventana del navegador y las páginas son las pestañas dentro de esa ventana. 
 Si cierras el contexto, cierras todas las páginas dentro de ese contexto. Si cierras una página, solo cierras esa pestaña y el resto de las pestañas siguen abiertas.*/

 test.describe('GitHub website tests', () => {
  test('has title', async ({ page }) => {
    await page.goto('https://github.com');
    await expect(page).toHaveTitle(/GitHub/);
  });

  //Activity ONE: GitHub sign in
  test('Act 1: fail login in github', async ({ }) => {
    const browser = await firefox.launch();
     const context = await browser.newContext();
     const pageGithub = await context.newPage();
    await pageGithub.goto('https://github.com/login');

    const username = pageGithub.getByRole('textbox', { name: 'Username or email address' });
    const password = pageGithub.getByRole('textbox', { name: 'Password' });
    const signInButton = pageGithub.getByRole('button', { name: 'Sign in', exact: true });

    // I use a fake email because some usernames can trigger a different login flow.
    await username.fill(`fake-user-${Date.now()}@example.com`);
    await password.fill('invalid_password');

    await signInButton.click();

    //Assert that the error message is visible and contains the expected text
    await expect(pageGithub.locator('div').filter({ hasText: 'Incorrect username or ' }).nth(5)).toContainText( 'Incorrect username or password' );

    await context.close();
    await browser.close();
  });
});

test.describe('Firefox browser',()=>{
  //Activity 2: Browsers and Browser context
  test('Act2: Launch firefox browser', async ({}) => {
   
    
    const browser = await firefox.launch();
     const context = await browser.newContext();

    console.log('broswer context',browser.contexts().length);
    const page = await context.newPage();
    await page.goto('https://playwright.dev/');
    console.log('broswer context',browser.contexts().length,browser.contexts());
    await page.screenshot({ path: 'tests/screenshots/act2_screenshot.png' });

    // Dispose context once it's no longer needed.
    await context.close();
    await browser.close();
  })

  test('should open multiple pages', async ({}) => {
   
    const browser = await firefox.launch();
    const context = await browser.newContext();
    console.log('broswer context',browser.contexts().length);
    const page1 = await context.newPage();
    await page1.goto('https://playwright.dev/');
    const page2 = await context.newPage();
    await page2.goto('https://playwright.dev/docs/intro');
    console.log('broswer context',browser.contexts().length,browser.contexts());
    await page1.screenshot({ path: 'tests/screenshots/multiplepage.png' });
    await page2.screenshot({ path: 'tests/screenshots/multiplepage2.png' });
    // Dispose context once it's no longer needed.
    await context.close();
    await browser.close();
  })

})

//Activity 3: Multiple pages in chromium
test.describe('Act 3: Multiple pages',()=>{

  test('should open multiple pages, act 3', async () => {
      
    
      const browser = await chromium.launch();
      const context = await browser.newContext();

      //Playwright installation URL
      const page1 = await context.newPage();
      await page1.goto('https://playwright.dev/docs/intro');

      // Playwright writing tests URL
      const page2 = await context.newPage();
      await page2.goto('https://playwright.dev/docs/writing-tests');
      console.log('broswer context',browser.contexts().length,browser.contexts());

      await page1.screenshot({ path: 'tests/screenshots/act3_installation.png' });
      await page2.screenshot({ path: 'tests/screenshots/act3_writing_tests.png' });
      // Get the pages of the browser context aand check there are 2 open
      const pages = context.pages();
      expect(pages.length).toBe(2);

      await context.close();
      await browser.close();
  });
});


//Act 4: Page methods - Navigating through browser history
test.describe('Activity 4: Pages methods',()=>{

  test('Navigation through history', async ({}) => {

   
    const browser = await firefox.launch();
    const context = await browser.newContext();
    console.log('broswer context',browser.contexts().length);
    
    const otherPage = await context.newPage();
    await otherPage.goto('https://playwright.dev/');
    await otherPage.screenshot({ path: 'tests/screenshots/act4_ss_playwright.png' });
    
    // caada vez q la pag se abre despues del goto creaa el evento load que indica que la pagina ya se cargó completamente
    otherPage.once('load', () => console.log('Page loaded!'));
    
    await otherPage.goto('https://github.com/');
    await otherPage.screenshot({ path: 'tests/screenshots/act4_ss_github.png' });
    otherPage.once('load', () => console.log('Page loaded!'));

    await otherPage.goBack({ waitUntil: 'load' });
    
    await otherPage.screenshot({ path: 'tests/screenshots/act4_ss_playwrightHistory.png' });

    // Dispose context once it's no longer needed.
    await context.close();
    await browser.close();
  })

})



