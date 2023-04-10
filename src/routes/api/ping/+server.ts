import sql from '$lib/clients/db.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const [postgres] = await sql`
		select * from
		(select version()) as version,
		(select current_setting('server_version_num')) as version_number;
	`;

	return json({ message: 'pong', postgres });
};
