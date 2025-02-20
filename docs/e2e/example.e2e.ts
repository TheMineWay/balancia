import { expect, test } from '@playwright/test';
import { E2E_CONSTANTS } from './e2e.constants';

test('has title', async ({ page }) => {
  await page.goto(E2E_CONSTANTS.HOST);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hello from/);
});
