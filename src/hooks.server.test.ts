/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, expect, it, vi } from 'vitest';

describe('hooks.server.ts', () => {
	const log = vi.fn(() => {});

	beforeEach(() => {
		vi.stubGlobal('console', {
			log
		});

		vi.mock('$env/dynamic/public', () => {
			return { env: {} };
		});
		vi.mock('$env/dynamic/private', () => {
			return {
				env: process.env
			};
		});
	});

	afterEach(() => {
		vi.resetModules();
	});

	it(`Should use normal hooks if NODE_ENV isn't "test"`, async () => {
		vi.stubEnv('NODE_ENV', 'bababooey');
		const { handle } = await import('./hooks.server');

		expect(handle).toBeDefined();
		expect(log).toHaveBeenCalledWith('Running in normal mode!');
	});

	it(`Should use test hooks if NODE_ENV is "test"`, async () => {
		vi.stubEnv('NODE_ENV', 'test');

		const { handle } = await import('./hooks.server');

		expect(handle).toBeDefined();
		expect(log).toHaveBeenCalledWith('Running in test mode!');
	});
});
