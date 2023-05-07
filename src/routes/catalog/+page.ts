import type { PageLoad } from './$types';
import type { GetPostsResult } from '$routes/api/posts/+server';

export const load = (async ({ url, fetch }) => {
	const page = url.searchParams.get('page') ?? 1;

	const res = await fetch(`/api/posts?page=${page}`);
	const catalog: GetPostsResult = await res.json();

	return { catalog };
}) satisfies PageLoad;
