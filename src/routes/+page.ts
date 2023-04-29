import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const posts = (await fetch('/api/posts')).json();
	return { posts };
}) satisfies PageLoad;
