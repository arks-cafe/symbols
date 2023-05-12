import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('http://localhost:5173/');
	await page.getByRole('link', { name: 'Upload' }).click();
	await expect(page.getByText('You must be signed in to upload.')).toBeVisible();
	// todo: figure out how to upload a file
});
