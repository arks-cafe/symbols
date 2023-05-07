import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	if (!(await locals.logto.isAuthenticated()) || !locals.user?.sub) {
		throw error(401, 'Unauthorized');
	}

	return json({ message: 'pong' });
};
