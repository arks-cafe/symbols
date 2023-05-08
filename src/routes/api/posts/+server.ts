import prisma from '$lib/clients/db.server';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { PostWithAuthor } from '$lib/types';
import { getPostsCount } from '$lib/constants';

export type GetPostsResult = {
	posts: PostWithAuthor[];
	pages: number;
};

export const GET: RequestHandler = async ({ url }) => {
	const untilCursor = Number(url.searchParams.get('untilCursor')) || undefined;

	const posts = await prisma.post.findMany({
		skip: untilCursor ? 1 : 0,
		take: getPostsCount,
		cursor: untilCursor ? { cursor: untilCursor } : undefined,
		include: { author: true },
		orderBy: { createdAt: 'desc' }
	});

	return json({ posts } as GetPostsResult);
};
