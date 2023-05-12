import { expect, test } from '@playwright/test';

test('index page has expected header text', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Symbol Bucket' })).toBeVisible();
});
