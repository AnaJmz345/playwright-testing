import { test, expect,firefox } from '@playwright/test';

const FIRST_TODO = 'Buy apples';
const SECOND_TODO = 'Play with Aslan';

/*Requirements list used:

autowaiting actions: fill, press, check, click, hover, etc. will automatically wait for the element to be ready before performing the action, so we don't need to add explicit waits in our tests.

Auto-retrying assertions: Assertions like toBeVisible, toHaveText, toHaveClass, etc. will automatically retry until the condition is met or the timeout is reached, so we don't need to add explicit waits for assertions either.

Non retrying assertions: toBe is non-retrying assertions and they will check the condition immediately without waiting, so we need to be careful when using them in our tests and make sure that the element is in the expected state before using them. These aren't recommended to be used in playwright tests due to the asynchronous nature of playwright but it is recommended to use in vitest.

Negative assertions: Use of not, for example in not.toBeVisible()

Soft assertions: Use of expect.soft, for example in expect.soft(page.getByRole('textbox', { name: 'What needs to be done?' })).toBeEmpty() which allows the test to continue even if the assertion fails, allowing us to check multiple conditions in a single test without stopping at the first failure.


*/
/*
test.describe('Activity 2: TodoMVC tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await expect(page.getByText('This is just a demo of TodoMVC')).toBeVisible();
  });

  test('Add a todo item', {
    tag: '@addItem',
    annotation: {
      type: 'description',
      description: 'Adds a new todo item and verifies it.'
    }
  }, async ({ page }) => {
    //just to use it, but it makes the test increase the waiting time limit
    test.slow();

    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(FIRST_TODO);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

    await expect(page.getByText(FIRST_TODO)).toBeVisible();
    await expect(page.getByTestId('todo-title')).toHaveText([FIRST_TODO]);

    const allTodos = await page.getByTestId('todo-item').count();
    expect(allTodos).toBe(1);

    // soft asserion to check that the input field is empty after adding a todo item, but it won't fail the test if it is not empty, allowing the rest of the assertions to be executed.
    await expect.soft(page.getByRole('textbox', { name: 'What needs to be done?' })).toBeEmpty();
  });

  test('Complete a todo item', {
    tag: '@completeItem',
    annotation: {
      type: 'description',
      description: 'Marks a todo item as completed.'
    }
  }, async ({ page }) => {

   await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(FIRST_TODO);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

    const todoItem = page.getByTestId('todo-item').filter({ hasText: FIRST_TODO });

    await todoItem.getByRole('checkbox').check();

    await expect(todoItem).toHaveClass(/completed/);
    
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(page.getByText(FIRST_TODO)).not.toBeVisible(); //negative assertion to check that the completed item is not visible in the active filter
  });

  test('Delete first item', {
    tag: '@deleteItem',
    annotation: {
      type: 'description',
      description: 'Deletes the first todo item.'
    }
  }, async ({ page }) => {
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(FIRST_TODO);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

    const firstTodo = page.getByTestId('todo-item').filter({ hasText: FIRST_TODO });

    await firstTodo.hover();
    await firstTodo.getByRole('button', { name: 'Delete' }).click();

    await expect(firstTodo).not.toBeVisible();

    const allTodos = await page.getByTestId('todo-item').count();
    expect(allTodos).toBe(0); //toBe is a non-retrying assertion and it isn't recommended to use it in playwright tests due to the asynchronous nature of playwright but it is recommended to use in vitest.
  });

  test('Filter active todo items', {
    tag: '@filterActive',
    annotation: {
      type: 'description',
      description: 'Filters only active todo items.'
    }
  }, async ({ page }) => {
     await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(FIRST_TODO);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

     await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(SECOND_TODO);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

    const firstTodo = page.getByTestId('todo-item').filter({ hasText: FIRST_TODO });
    await firstTodo.getByRole('checkbox').check();

    await page.getByRole('link', { name: 'Active' }).click();

    await expect(page.getByText(SECOND_TODO)).toBeVisible();
    await expect(page.getByText(FIRST_TODO)).not.toBeVisible();

    await expect.soft(page.getByTestId('todo-title')).toHaveText([SECOND_TODO]);
  });

  test('Filter completed todo items', {
    tag: '@filterCompleted',
    annotation: {
      type: 'description',
      description: 'Filters only completed todo items.'
    }
  }, async ({ page }) => {
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(FIRST_TODO);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

     await page.getByRole('textbox', { name: 'What needs to be done?' }).fill(SECOND_TODO);
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

    const firstTodo = page.getByTestId('todo-item').filter({ hasText: FIRST_TODO });

    await firstTodo.getByRole('checkbox').check();

    await page.getByRole('link', { name: 'Completed' }).click();

    await expect(page.getByText(FIRST_TODO)).toBeVisible();
    await expect(page.getByText(SECOND_TODO)).not.toBeVisible();

    await expect.soft(page.getByTestId('todo-title')).toHaveText([FIRST_TODO]);
  });


  test('Test fail annotation', {
    tag: '@fail',
    annotation: {
      type: 'description',
      description: 'Example of test.fail annotation.'
    }
  }, async ({ page }) => {
    test.fail();

    await expect(page.getByText('Shalalala')).toBeVisible();
  });

 test.fixme('Pending test using missing recommended locators @fixme', async ({page }) => {
    await expect(page.getByAltText('TodoMVC')).toBeVisible();
    await expect(page.getByTitle('TodoMVC')).toBeVisible();
    await expect(page.getByLabel('What needs to be done?')).toBeVisible();
    await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
  });
});
*/

test.describe('Mercado Libre',()=>{

  test('Identifing elements ', async ({page}) => {
   
    // go to the Mercado Libre main page
    await page.goto('https://www.mercadolibre.com.mx/');

    //take screenshot
    await page.screenshot({ path: 'screenshots/mercado_libre.png' });

    // get by title test
    await expect(page.getByTitle("Carrito")).toBeVisible();

    // get by alt text test
    await expect(page.getByAltText('MLM FSNB')).toBeVisible();

    // get by placeholder test
    await expect(page.getByPlaceholder("Buscar productos, marcas y más…",)).toBeVisible();

    // get by label test
    await expect(page.getByLabel("Ingresa lo que quieras encontrar")).toBeVisible();

    // get by role test 
    await page.getByRole('link', { name: 'Crea tu cuenta' }).click();

    // get by test id test
    await page.getByTestId('email').fill('example@example.com');

    // get by text test
    await expect(page.getByText("Mis compras").first()).toBeHidden();


  })

})
