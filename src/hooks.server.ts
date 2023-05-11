import { redirect, type Handle } from '@sveltejs/kit';
import { LogtoAuthHandler, UserScope } from '@cntr/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { env } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';
import prisma from '$lib/clients/db.server';

// ? Ignoring files untestable in unit tests
/* c8 ignore start */

const setLogtoAuthenticatedUser: Handle = async ({ event, resolve }) => {
	try {
		const user = await event.locals.logto.fetchUserInfo();
		event.locals.user = user;
	} catch (err) {
		event.locals.user = null;
	}

	return await resolve(event);
};

const attachProfileOrCreateIfNotExists: Handle = async ({ event, resolve }) => {
	const { user } = event.locals;

	if (!user) {
		event.locals.profile = null;
		return await resolve(event);
	}
	let profile = await prisma.profile.findFirst({ where: { userId: user.sub } });
	if (!profile) {
		profile = await prisma.profile.create({
			data: {
				userId: user.sub,
				name: user.name ?? user.sub
			}
		});
	}
	event.locals.profile = profile;
	return await resolve(event);
};

const MockLogtoAuthHandler: Handle = async ({ event, resolve }) => {
	event.locals.logto = {
		isAuthenticated: async () => true,
		fetchUserInfo: async () =>
			event.cookies.get('logto-mock-auth') === 'mock-code' ? { sub: 'mock-user-id' } : null,
		signIn: async () => {
			event.cookies.set('logto-mock-auth', 'mock-code', { path: '/' });
			throw redirect(303, '/logto/callback?code=mock-code');
		},
		signOut: async () => {
			event.cookies.delete('logto-mock-auth', { path: '/' });
			throw redirect(303, '/');
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any;

	return await resolve(event);
};

const handleForTest: Handle = sequence(
	MockLogtoAuthHandler,
	setLogtoAuthenticatedUser,
	attachProfileOrCreateIfNotExists
);

/* c8 ignore stop */

const isTesting = privateEnv.NODE_ENV === 'test';

if (isTesting) {
	console.log('Running in test mode!');
} else {
	console.log('Running in normal mode!');
}

const handleForOther = sequence(
	LogtoAuthHandler(env.PUBLIC_LOGTO_APP_ID as string, env.PUBLIC_LOGTO_ENDPOINT as string, [
		UserScope.Email,
		UserScope.Profile
	]),
	// authenticationHandler,
	setLogtoAuthenticatedUser,
	attachProfileOrCreateIfNotExists
);

export const handle = isTesting ? handleForTest : handleForOther;
