import type { PlaywrightTestConfig } from '@playwright/test';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.testing' });

const config: PlaywrightTestConfig = {
	webServer: [
		{
			// App
			command: 'pnpm build && pnpm preview',
			port: 4173
		}
	],
	use: {
		baseURL: 'http://localhost:4173'
	},
	globalSetup: './tests/setup/globalSetup.ts',
	globalTeardown: './tests/setup/globalTeardown.ts',
	testDir: 'tests',
	testMatch: '**/*.@(spec|test|e2e).?(m)[jt]s?(x)',
	reporter: process.env.CI
		? [['junit', { outputFile: 'coverage/playwright-results.xml' }], ['github']]
		: 'list'
};

export default config;
