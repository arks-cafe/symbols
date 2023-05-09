import { error, json, redirect } from '@sveltejs/kit';
import { isSvelteKitRedirect } from '../helpers';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const uri = new URL('/logto/callback', url.href);
	try {
		throw await locals.logto.signIn(uri.toString());
	} catch (err) {
		if (isSvelteKitRedirect(err)) {
			throw redirect(err.status, err.location);
		}
		console.error(err);
		throw error(400, 'error performing signin with Logto');
	}
};
