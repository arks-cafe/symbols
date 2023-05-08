import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { postsCreateSchema } from './schema';
import { uploadFile } from '$lib/clients/s3.server';
import prisma from '$lib/clients/db.server';
import SymbolArt from 'symbol-art-parser';
import { nanoid } from 'nanoid';

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

	const [fileUrl, thumbnailUrl] = await Promise.all([
		uploadFile(file, `${uuid}.sar`),
		uploadFile(image, `${uuid}-thumbnail.png`)
	]);

	// Create post in database.
	const post = await prisma.post
		.create({
			data: {
				id: uuid,
				title,
				fileUrl,
				thumbnailUrl,
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

	return json({ message: 'success', post });
};
