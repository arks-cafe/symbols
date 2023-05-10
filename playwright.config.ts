import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: [
		{
			// Backend DB
			command: 'docker compose --file tests/docker-compose.yml up',
			port: 4174,
			timeout: 120 * 1000
		},
		{
			// App
			command: 'pnpm build && pnpm preview',
			port: 4173
		}
	],
	use: {
		baseURL: 'http://localhost:4173'
	},
	globalTeardown: './tests/globalTeardown.ts',
	testDir: 'tests',
	testMatch: '**/e2e.ts'
};

export default config;
