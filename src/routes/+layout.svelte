<script lang="ts">
	/** Import Tailwind CSS */
	import '../app.css';

	/** @see https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#setting-up-the-event-listener-on-the-client-side */
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<slot />
