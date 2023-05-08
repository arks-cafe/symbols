import type { PageLoad } from './$types';
import type { GetPostsResult } from '$routes/api/posts/+server';

// Prefetch posts for the first page
export const load = (async ({ fetch }) => {
	const res = await fetch(`/api/posts`);
	const catalog: GetPostsResult = await res.json();
	return { catalog };
}) satisfies PageLoad;
