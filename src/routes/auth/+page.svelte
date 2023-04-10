<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import type { PageData } from './$types';
	export let data: PageData;

	async function signOut() {
		await data.supabase.auth.signOut();
	}

	$: console.log(data.session);
</script>

<main class="max-w-3xl mx-auto my-8">
	<h1 class="font-black text-4xl">Account</h1>
	<a class="btn" href="/">Back Home</a>
	{#if !data.session}
		<div class="rounded-xl px-8 py-6 drop-shadow-sm max-w-sm mx-auto border">
			<Auth
				supabaseClient={data.supabase}
				appearance={{ theme: ThemeSupa }}
				providers={['discord']}
			/>
		</div>
	{:else}
		<div class="rounded-xl px-8 py-6 drop-shadow-sm max-w-sm mx-auto border">
			<h2 class="text-xl font-bold mb-2">You're already logged in!</h2>
			<button on:click={signOut} class="btn btn-block">Sign Out</button>
		</div>
	{/if}
</main>
