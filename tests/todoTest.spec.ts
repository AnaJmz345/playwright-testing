import { test, expect } from '@playwright/test';
//documentaacion playwroght actions
const FIRST_TODO = 'Buy apples';
const SECOND_TODO = 'Play with Aslan';

test.describe('Todo demo tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    await expect(page.getByText('This is just a demo of TodoMVC')).toBeVisible();

    await page
      .getByRole('textbox', { name: 'What needs to be done?' })
      .fill(FIRST_TODO);

    await page
      .getByRole('textbox', { name: 'What needs to be done?' })
      .press('Enter');
  });


  test('Add a todo item', {
    tag: '@addItem',
    annotation: {
      type: 'description',
      description: 'Checks that the first todo item is Buy apples.'
    }
  }, async ({ page }) => {
    await expect(page.getByText(FIRST_TODO)).toBeVisible();
    await expect(page.getByTestId('todo-title')).toHaveText([FIRST_TODO]);
  });


  test('Complete a todo item', {
    tag: '@completeItem',
    annotation: {
      type: 'description',
      description: 'Marks one todo item as completed.'
    }
  }, async ({ page }) => {
    const todoItem = page.getByTestId('todo-item').filter({
      hasText: FIRST_TODO
    });

    await todoItem.getByRole('checkbox').check();

    await expect(todoItem).toHaveClass(/completed/);
  });


  test('Delete first item', {
    tag: '@deleteItem',
    annotation: {
      type: 'description',
      description: 'Deletes the first todo item.'
    }
  }, async ({ page }) => {
    const firstTodo = page.getByTestId('todo-item').filter({
      hasText: FIRST_TODO
    });

    // Good practice: the delete button appears when hovering the todo item
    await firstTodo.hover();

    await firstTodo.getByRole('button', { name: 'Delete' }).click();

    await expect(firstTodo).not.toBeVisible();
  });


  test('Filter active todo items', {
    tag: '@filterActive',
    annotation: {
      type: 'description',
      description: 'Filters the list to show only active todo items.'
    }
  }, async ({ page }) => {
    await page
      .getByRole('textbox', { name: 'What needs to be done?' })
      .fill(SECOND_TODO);

    await page
      .getByRole('textbox', { name: 'What needs to be done?' })
      .press('Enter');

    const firstTodo = page.getByTestId('todo-item').filter({
      hasText: FIRST_TODO
    });

    await firstTodo.getByRole('checkbox').check();

    // getByRole
    await page.getByRole('link', { name: 'Active' }).click();

    // Only the active todo should be visible
    await expect(page.getByText(SECOND_TODO)).toBeVisible();
    await expect(page.getByText(FIRST_TODO)).not.toBeVisible();

    // getByTestId
    await expect(page.getByTestId('todo-title')).toHaveText([SECOND_TODO]);
  });


  test('Filter completed todo items', {
    tag: '@filterCompleted',
    annotation: {
      type: 'description',
      description: 'Filters the list to show only completed todo items.'
    }
  }, async ({ page }) => {
    await page
      .getByRole('textbox', { name: 'What needs to be done?' })
      .fill(SECOND_TODO);

    await page
      .getByRole('textbox', { name: 'What needs to be done?' })
      .press('Enter');

    const firstTodo = page.getByTestId('todo-item').filter({
      hasText: FIRST_TODO
    });

    await firstTodo.getByRole('checkbox').check();

    // getByRole
    await page.getByRole('link', { name: 'Completed' }).click();

    // Only the completed todo should be visible
    await expect(page.getByText(FIRST_TODO)).toBeVisible();
    await expect(page.getByText(SECOND_TODO)).not.toBeVisible();

    // getByTestId
    await expect(page.getByTestId('todo-title')).toHaveText([FIRST_TODO]);
  });

});