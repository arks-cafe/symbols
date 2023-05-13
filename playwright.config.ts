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
	globalSetup: './tests/setup/globalSetup.js',
	globalTeardown: './tests/setup/globalTeardown.js',
	testDir: 'tests',
	testMatch: '**/*.@(spec|test|e2e).?(m)[jt]s?(x)',
	reporter: process.env.CI
		? [
				['html', { open: 'never' }],
				['github'],
				['dot'],
				['junit', { outputFile: 'test-results/junit-e2e.xml' }]
		  ]
		: 'list'
};

export default config;
