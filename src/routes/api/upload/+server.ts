import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { uploadSchema } from './schema';
import { ZodError } from 'zod';
import SymbolArt from 'symbol-art-parser';
import supabaseServiceRoleClient from '$lib/clients/supabase.server';
import { UserError } from '$lib/errors';
import { v4 as uuidv4 } from 'uuid';
import type { Json } from '$lib/types/supabase';

export const POST: RequestHandler = async ({ request, locals: { getSession } }) => {
	console.log('hello');
	// Require authentication.
	const session = await getSession();
	if (!session?.access_token) {
		return json({ error: 'Not logged in.' }, { status: 401 });
	}

	try {
		// Parse the form data.
		const form = await request.formData();
		const { name, file, image } = uploadSchema.parse(Object.fromEntries(form.entries()));

		// Parse the file as a Symbol Art file. Throw an error if it's not.
		const sar = new SymbolArt();
		try {
			sar.data = await file.arrayBuffer();
		} catch (error) {
			throw new UserError('The file provided is not a Symbol Art file.');
		}

		const uuid = uuidv4();

		const filePath = `${uuid}.sar`;
		const thumbnailPath = `${uuid}.png`;

		const uploads = await Promise.all([
			supabaseServiceRoleClient.storage.from('uploads').upload(filePath, file, {
				contentType: 'application/octet-stream'
			}),
			supabaseServiceRoleClient.storage.from('uploads').upload(thumbnailPath, image, {
				contentType: 'image/png'
			})
		]);

		if (uploads.some((upload) => upload.error)) {
			throw new Error('Failed to upload files.');
		}

		const { data: newPost, error: newPostError } = await supabaseServiceRoleClient
			.from('posts')
			.insert({
				author_id: session.user.id,
				name,
				file_path: filePath,
				thumbnail_path: thumbnailPath,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				json_raw: sar.json as any satisfies Json
			});

		if (newPostError || !newPost || !newPost[0]) {
			throw new Error('Failed to create post.');
		}

		return json({ message: 'success', data: newPost[0] }, { status: 201 });
	} catch (error) {
		if (error instanceof ZodError) {
			return json({ error: 'Incorrect form data.', issues: error.issues }, { status: 400 });
		}
		if (error instanceof UserError) {
			return json({ error: error.message }, { status: 400 });
		}
		if (error instanceof Error) {
			return json({ error: error.message }, { status: 500 });
		}
		return json({ error: 'Unknown error' }, { status: 500 });
	}
};
