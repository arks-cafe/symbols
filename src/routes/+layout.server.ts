/** @see https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#send-session-to-client */
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	return {
		session: await getSession()
	};
};
