import prisma from '$lib/clients/db.server';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { PostWithAuthor } from '$lib/types';

const count = 3;

export type GetPostsResult = {
	posts: PostWithAuthor[];
	pages: number;
};

export const GET: RequestHandler = async ({ url }) => {
	const page = url.searchParams.get('page');
	const parsedPage = Number.parseInt(page ?? '') || 1;

	const posts = await prisma.post.findMany({
		skip: (parsedPage - 1) * count,
		take: count,
		include: { author: true },
		orderBy: { createdAt: 'desc' }
	});
	const total = await prisma.post.count();
	const pages = Math.ceil(total / count);
	return json({ posts, pages } as GetPostsResult);
};
