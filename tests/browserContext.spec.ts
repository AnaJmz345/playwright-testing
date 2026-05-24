
import { test,firefox } from '@playwright/test';

// cuando abres la páginaa creas el contexto de la página, el contexto es el que maneja las cookies, el cache, etc. y dentro del contexto creas las páginas, cada página es una pestaña del navegador. El contexto es como una ventana del navegador y las páginas son las pestañas dentro de esa ventana. Si cierras el contexto, cierras todas las páginas dentro de ese contexto. Si cierras una página, solo cierras esa pestaña y el resto de las pestañas siguen abiertas.
test.describe('Firefox browser',()=>{
  test('Launch firefox browser', async ({}) => {
   
    const browser = await firefox.launch();
    console.log('broswer context',browser.contexts().length);
    const page = await browser.newPage();
    await page.goto('https://playwright.dev/');
    console.log('broswer context',browser.contexts().length,browser.contexts());
    await page.screenshot({ path: 'screenshot.png' });
    // Dispose context once it's no longer needed.
    await browser.close();
  })

  test('should open multiple pages', async ({}) => {
   
    const browser = await firefox.launch();
    console.log('broswer context',browser.contexts().length);
    const page1 = await browser.newPage();
    await page1.goto('https://playwright.dev/');
    const page2 = await browser.newPage();
    await page2.goto('https://playwright.dev/docs/intro');
    console.log('broswer context',browser.contexts().length,browser.contexts());
    await page1.screenshot({ path: 'screenshot1.png' });
    await page2.screenshot({ path: 'screenshot2.png' });
    // Dispose context once it's no longer needed.
    await browser.close();
  })

})


test.describe('History in firefox',()=>{

  test('Navigation through history', async ({}) => {
   
    const browser = await firefox.launch();
    console.log('broswer context',browser.contexts().length);
    const otherPage = await browser.newPage();
    await otherPage.goto('https://playwright.dev/');
    await otherPage.screenshot({ path: 'screenshot.png' });
    await otherPage.goto('https://github.com/');
    await otherPage.screenshot({ path: 'github.png' });

    // caada vez q la pag se abre despues del goto creaa el evento load que indica que la pagina ya se cargó completamente
    await otherPage.once('load', () => console.log('Page loaded!'));
    await otherPage.goBack();
    await otherPage.screenshot({ path: 'playwrightHistory.png' });
    // Dispose context once it's no longer needed.
    await browser.close();
  })

})

test.describe('Mercado Libre',()=>{

  test('Identifing elements ', async ({}) => {
   
    const browser = await firefox.launch();
    const mercadoLibre = await browser.newPage();
    await mercadoLibre.goto('https://www.mercadolibre.com.mx/');
    await mercadoLibre.screenshot({ path: 'screenshot.png' });
    await mercadoLibre.getByRole('link', { name: 'Mercado Libre México - Donde' })
    await mercadoLibre.getByText('Crea tu cuenta').click();
    await mercadoLibre.getByTestId('thb-double-container').getByRole('link', { name: 'FULL HASTA 50% DE DESCUENTO' }).click();
    await mercadoLibre.getByLabel('Beneficios en entretenimiento').locator('li').filter({ hasText: 'Página 1' });
    //HACER LOS OTROS 3
    await browser.close();
  })

})


