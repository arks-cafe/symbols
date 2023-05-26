import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('/');
	await page.getByTitle('Upload').click();
	await expect(page.getByText('You must be signed in to upload.')).toBeVisible();
	// todo: figure out how to upload a file
});
