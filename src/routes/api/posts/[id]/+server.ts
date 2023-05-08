import prisma from '$lib/clients/db.server';
import { deleteFiles } from '$lib/clients/s3.server';
import { type RequestHandler, error, json } from '@sveltejs/kit';

// Fetch for single post.
export const GET: RequestHandler = async ({ params }) => {
	const id = params.id || undefined;
	if (!id) {
		throw error(400, 'Missing post id.');
	}

	const post = await prisma.post.findUnique({ where: { id } });
	if (!post) {
		throw error(404, 'Post not found.');
	}

	return json({ post });
};

// Handle deletion of posts.
export const DELETE: RequestHandler = async ({ params, locals }) => {
	if (!(await locals.logto.isAuthenticated()) || !locals.user?.sub) {
		throw error(401, 'Unauthorized. Please sign in to continue.');
	}

	const id = params.id || undefined;

	if (!id) {
		throw error(400, 'Missing post id.');
	}

	console.log('haiii');

	const post = await prisma.post.findUnique({ where: { id } });
	if (!post) {
		throw error(404, 'Post not found.');
	}

	if (post.authorId !== locals.user.sub) {
		throw error(403, 'You do not have permission to delete this post.');
	}

	// Delete files from bucket and post from database.
	await Promise.all([
		prisma.post.delete({ where: { id } }),
		deleteFiles([post.fileKey, post.thumbnailKey])
	]).catch((err) => {
		console.error(err);
		throw error(500, 'Failed to delete post.');
	});

	return json({ message: 'Post Deleted' });
};
