import type { PageLoad } from './$types';

export const load = (async ({ url, fetch }) => {
	const page = url.searchParams.get('page') ?? 1;

	const res = await fetch(`/api/posts?page=${page}`);
	const data: {
		posts: {
			cursor: number;
			id: string;
			createdAt: Date;
		}[];
		pages: number;
	} = await res.json();

	return { data };
}) satisfies PageLoad;
