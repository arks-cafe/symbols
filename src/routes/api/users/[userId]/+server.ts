import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/clients/db.server';

export const GET: RequestHandler = async ({ params }) => {
	const { userId } = params;
	if (!userId) throw error(400, 'No user ID provided.');

	const profile = await prisma.profile.findUnique({ where: { userId } });
	if (!profile) throw error(404, 'User not found.');

	return json(profile);
};
