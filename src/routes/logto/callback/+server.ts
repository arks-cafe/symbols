import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { isSvelteKitRedirect } from '../helpers';

const isTesting = env.NODE_ENV === 'test';

const getForOther: RequestHandler = async ({ locals, url }) => {
	try {
		// url.toString() here is something like:
		// <origin>/logto/callback for eg, in localhost:3000, it's http://localhost:3000/logto/callback
		// this url must be registered as the redirect url in your Logto Application
		await locals.logto.handleSignInCallback(url.toString());
	} catch (err) {
		if (isSvelteKitRedirect(err)) {
			throw redirect(err.status, err.location);
		}

		console.log('ERR_LOGTO_SIGNIN_CALLBACK: ', err);
		throw error(401, {
			message: (err as Error).message
		});
	}

	// redirect to route once signed in
	throw redirect(303, '/');
};

// Handle mock code for testing
const getForTest: RequestHandler = async ({ url }) => {
	if (url.searchParams.get('code') === 'mock-code') {
		throw redirect(303, '/');
	} else {
		throw error(401, 'Sign-in session not found.');
	}
};

export const GET: RequestHandler = isTesting ? getForTest : getForOther;
