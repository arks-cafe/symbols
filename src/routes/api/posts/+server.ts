import prisma from '$lib/clients/db.server';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import type { PostWithAuthor } from '$lib/types';
import { getPostsCount } from '$lib/constants';
import { postsCreateSchema } from './schema';
import { uploadFile } from '$lib/clients/s3.server';
import SymbolArt from 'symbol-art-parser';
import { nanoid } from 'nanoid';
import type { Post } from '@prisma/client';

export type GetPostsResult = PostWithAuthor[];
// Handle reading of posts.
export const GET: RequestHandler = async ({ url }) => {
	const untilCursor = Number(url.searchParams.get('untilCursor')) || undefined;
	const authorId = url.searchParams.get('userId') || undefined;

	if (authorId) {
		// check if user exists.
		const profile = await prisma.profile.findUnique({ where: { userId: authorId } });
		if (!profile) {
			throw error(404, 'User not found.');
		}
	}

	const posts = await prisma.post.findMany({
		skip: untilCursor ? 1 : 0,
		take: getPostsCount,
		cursor: untilCursor ? { cursor: untilCursor } : undefined,
		include: { author: true },
		orderBy: { createdAt: 'desc' },
		where: authorId ? { authorId } : undefined
	});

	return json(posts);
};

export type PostPostResult = { message: string; post: Post };
// Handle creation of posts.
export const POST: RequestHandler = async ({ request, locals }) => {
	if (!(await locals.logto.isAuthenticated()) || !locals.user?.sub) {
		throw error(401, 'Unauthorized. Please sign in to continue.');
	}

	// Parse formData into object for uploading.
	const formData = await request.formData();
	const input = postsCreateSchema.parse(Object.fromEntries(formData.entries()));

	// Variables to be used in the operation.
	const { file, image, title } = input;
	const uuid = nanoid(12);
	const { sub: authorId } = locals.user;

	let jsonRaw;

	// Attempt to parse/validate file Symbol Art into JSON.
	try {
		const sar = new SymbolArt();
		sar.data = await file.arrayBuffer();
		jsonRaw = sar.json;
	} catch (e) {
		throw error(400, 'Failed to parse Symbol Art.');
	}

	const fileKey = `${uuid}.sar`;
	const thumbnailKey = `${uuid}-thumbnail.png`;
	const [fileUrl, thumbnailUrl] = await Promise.all([
		uploadFile(file, fileKey, `${title}.sar`),
		uploadFile(image, thumbnailKey)
	]);

	// Create post in database.
	const post = await prisma.post
		.create({
			data: {
				id: uuid,
				title,
				fileUrl,
				fileKey,
				thumbnailUrl,
				thumbnailKey,
				rawTitle: jsonRaw.name,
				rawAuthorId: jsonRaw.authorId,
				rawLayerCount: jsonRaw.layers.length,
				rawSoundId: jsonRaw.sound,
				authorId
			}
		})
		.catch((err) => {
			console.error(err);
			throw error(500, 'Failed to create post.');
		});

	return json({ message: 'Post Created', post } as PostPostResult);
};
