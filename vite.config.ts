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
		setupFiles: ['./scripts/setupTest.ts'],
		// Exclude files in c8
		coverage: {
			exclude: ['./scripts/**/*']
		},
		// Exclude playwright tests folder
		exclude: [...configDefaults.exclude, 'tests']
	}
});
