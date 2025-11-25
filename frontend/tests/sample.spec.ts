import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:6000/');

  await expect(page).toHaveTitle(/Vite \+ Vue \+ ASP\.NET Core/);
});

