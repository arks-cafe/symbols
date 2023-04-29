/** @see https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#generate-types-from-your-database */
import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from '$lib/types/supabase';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
			profile: Database['public']['Tables']['profiles']['Row'] | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}
