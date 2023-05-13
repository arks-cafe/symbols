import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, configDefaults } from 'vitest/config';
import type { PluginOption } from 'vite';

/** @see https://github.com/davipon/svelte-component-test-recipes#viteconfigts */
export default defineConfig({
	plugins: [sveltekit() as PluginOption],
	test: {
		// jest like globals
		globals: true,
		environment: 'jsdom',
		// in-source testing
		includeSource: ['src/**/*.{js,ts,svelte}'],
		// Add @testing-library/jest-dom matchers & mocks of SvelteKit modules
		setupFiles: ['./setupTest.ts'],
		// Exclude files in c8
		coverage: {
			enabled: process.env.CI ? true : false,
			all: true,
			include: ['src/**/*.{js,ts,svelte}'],
			exclude: [
				...(configDefaults.coverage.exclude as string[]), // cast to string[] because typings suck for some reason
				'src/**/*.stories.*',
				// 'src/routes/**/+*',
				// 'src/lib/types.ts',
				'./scripts/**/*',
				'**/fixtures.ts'
			],
			reportsDirectory: './coverage'
		},
		// Exclude playwright tests folder
		exclude: [...configDefaults.exclude, 'tests'],
		deps: {
			// Add dependencies that are not automatically detected by vitest
			inline: ['@aws-sdk/util-user-agent-node', '@aws-sdk/signature-v4-multi-region']
		},
		reporters: process.env.CI ? ['default', 'junit'] : ['default'],
		outputFile: 'test-results/junit-unit.xml'
	}
});
