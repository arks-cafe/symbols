import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import type { PluginOption } from 'vite';

export default defineConfig({
	plugins: [sveltekit() as PluginOption],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
