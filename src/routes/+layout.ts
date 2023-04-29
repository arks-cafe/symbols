/** @see https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#shared-load-functions-and-pages */
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';
import type { Database } from '$lib/types/supabase';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (session) {
		console.log(session.user.user_metadata);
		console.log(session.user.id);
		let supabaseProfile = await supabase
			.from('profiles')
			.select('*')
			.eq('id', session.user.id)
			.single();
		if (!supabaseProfile.data) {
			supabaseProfile = await supabase
				.from('profiles')
				.insert({
					id: session.user.id,
					name: session.user.user_metadata.full_name ?? session.user.id
				})
				.select()
				.single();
		}
		console.log(supabaseProfile);

		return { supabase, session, profile: supabaseProfile.data };
	}

	return { supabase, session, profile: null };
};
