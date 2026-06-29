import { test, expect } from '@playwright/test';

interface ConsoleMsg {
	msg: string;
	type: string;
}

test('Geocoder works in a custom element context (#446)', async ({ page }) => {
	let logs: ConsoleMsg[] = [];
	page.on('console', (msg) => logs.push({ msg: msg.text(), type: msg.type() } as ConsoleMsg));

	await page.goto('/450-repro');
	await page.getByText('loaded').waitFor({ state: 'attached', timeout: 3000 });

	await expect(page.getByPlaceholder('placeholder goes here')).toBeVisible();
	expect(logs.filter((l) => l.type === 'error')).toStrictEqual([]);
});

test('Geocoder supports the id prop (#446)', async ({ page }) => {
	await page.goto('/450-repro');
	await page.getByText('loaded').waitFor({ state: 'attached', timeout: 3000 });
	const inputEl = page.getByPlaceholder('placeholder goes here');
	await expect(inputEl).toBeVisible();
	await expect(inputEl).toHaveId('input-id');
});
