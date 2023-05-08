import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Profile } from '@prisma/client';
import type { PostWithAuthor } from '$lib/types';

export const load = (async ({ fetch, params }) => {
	const { id } = params;
	if (!id) throw error(400, 'Invalid user ID.');

	const [profile, posts] = await Promise.all([
		fetch('/api/users/' + id).then((res) => res.json()),
		fetch('/api/posts?userId=' + id).then((res) => res.json())
	]);

	return { profile, posts } as {
		profile: Profile;
		posts: PostWithAuthor[];
	};
}) satisfies PageLoad;
