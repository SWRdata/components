import { test, expect } from '@playwright/test';

test('VectorTileSource works in production builds (#348)', async ({ page }) => {
	let logs = [];
	page.on('console', (msg) => logs.push({ msg: msg.text(), type: msg.type() }));

	await page.goto('/348-repro/');

	await expect(page.getByTestId('map-container')).toBeVisible();
	await expect(page.locator('.maplibregl-canvas')).toBeVisible();
	expect(logs.filter((l) => l.type === 'error')).toStrictEqual([]);
});
