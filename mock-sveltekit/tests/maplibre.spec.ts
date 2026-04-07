import { test, expect } from '@playwright/test';

interface ConsoleMsg {
	msg: string;
	type: string;
}

test('VectorTileSource works in production builds (#348)', async ({ page }) => {
	let logs: ConsoleMsg[] = [];
	page.on('console', (msg) => logs.push({ msg: msg.text(), type: msg.type() } as ConsoleMsg));

	await page.goto('/348-repro');
	await page.getByText('loaded').waitFor({ state: 'attached', timeout: 3000 });

	await expect(page.getByTestId('map-container')).toBeVisible();
	await expect(page.locator('.maplibregl-canvas')).toBeVisible();

	expect(logs.filter((l) => l.type === 'error')).toStrictEqual([]);
});
