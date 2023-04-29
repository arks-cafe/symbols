import type { RequestHandler } from './$types';
import supabaseServiceRoleClient from '$lib/clients/supabase.server';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	try {
		const { data, error } = await supabaseServiceRoleClient
			.from('posts')
			.select('*')
			.order('created_at', { ascending: false });
		if (error) {
			throw error;
		}
		return json({ data });
	} catch (error) {
		if (error instanceof Error) {
			return json({ error: error.message }, { status: 500 });
		}
		return json({ error: 'Unknown error' }, { status: 500 });
	}
};
