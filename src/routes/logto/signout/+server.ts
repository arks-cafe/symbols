import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isSvelteKitRedirect } from '../helpers';

export const GET: RequestHandler = async ({ locals, url }) => {
	try {
		throw await locals.logto.signOut(url.origin);
	} catch (err) {
		if (isSvelteKitRedirect(err)) {
			throw redirect(err.status, err.location);
		}

		throw error(401, err as string);
	}
};
