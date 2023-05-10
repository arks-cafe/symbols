import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { PostWithAuthor } from '$lib/types';

export const load = (async ({ params, fetch }) => {
	const id = params.id || undefined;
	if (!id) {
		throw error(400, 'Missing post id.');
	}
	const res = await fetch('/api/posts/' + id);
	if (!res.ok) {
		throw error(res.status, await res.json());
	}
	const post = await res.json();
	return { post } as { post: PostWithAuthor };
}) satisfies PageLoad;
