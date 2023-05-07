// import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { LogtoAuthHandler, UserScope } from '@cntr/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { env } from '$env/dynamic/public';
import prisma from '$lib/clients/db.server';

// const authenticationHandler: Handle = async ({ event, resolve }) => {
// 	const authenticated = await event.locals.logto.isAuthenticated();

// if (event.url.pathname.includes('/protected') && !authenticated) {
// 	throw redirect(
// 		303,
// 		'/?error=This is a protected route, please login before accessing this page'
// 	);
// }

// if (event.url.pathname === '/' && authenticated) {
// 	throw redirect(301, '/protected');
// }

// 	return await resolve(event);
// };

const setLogtoAuthenticatedUser: Handle = async ({ event, resolve }) => {
	try {
		const user = await event.locals.logto.fetchUserInfo();
		event.locals.user = user;
	} catch (err) {
		event.locals.user = null;
	}

	return await resolve(event);
};

const createProfileIfNotExists: Handle = async ({ event, resolve }) => {
	const { user } = event.locals;
	if (!user) return await resolve(event);
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

export const handle = sequence(
	LogtoAuthHandler(env.PUBLIC_LOGTO_APP_ID as string, env.PUBLIC_LOGTO_ENDPOINT as string, [
		UserScope.Email,
		UserScope.Profile
	]),
	// authenticationHandler,
	setLogtoAuthenticatedUser,
	createProfileIfNotExists
);
