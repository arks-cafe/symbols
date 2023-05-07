import prisma from '$lib/clients/db.server';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

const count = 3;

export const GET: RequestHandler = async ({ url }) => {
	const page = url.searchParams.get('page');
	const parsedPage = Number.parseInt(page ?? '') || 1;

	const posts = await prisma.post.findMany({
		skip: (parsedPage - 1) * count,
		take: count,
		select: { id: true, createdAt: true, cursor: true },
		orderBy: { createdAt: 'desc' }
	});
	const total = await prisma.post.count();
	const pages = Math.ceil(total / count);
	return json({ posts, pages });
};
