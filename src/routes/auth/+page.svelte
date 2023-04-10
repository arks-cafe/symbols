<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import supabaseClient from '$lib/clients/supabase';
</script>

<main class="max-w-3xl mx-auto my-8">
	<h1 class="font-black text-4xl">Account</h1>
	<a class="btn" href="/">Back Home</a>
	<div class="rounded-xl px-8 py-12 drop-shadow-sm max-w-sm mx-auto border">
		<Auth {supabaseClient} appearance={{ theme: ThemeSupa }} providers={['discord']} />
	</div>
</main>
