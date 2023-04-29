import type { RequestHandler } from './$types';
import sql from '$lib/clients/db.server';
import { json } from '@sveltejs/kit';
import { postsGetQuerySchema } from './schema';

export const GET: RequestHandler = async ({ params }) => {
	try {
		// Parse query data.
		const x = postsGetQuerySchema.parse(params);
		console.log(x);

		const data = await sql`/* SQL */
			SELECT *
			FROM posts
			ORDER BY created_at DESC
			LIMIT 20
			OFFSET ${x.offset}
		`;
		return json(data);
	} catch (error) {
		if (error instanceof Error) {
			return json({ error: error.message }, { status: 500 });
		}
		return json({ error: 'Unknown error' }, { status: 500 });
	}
};
