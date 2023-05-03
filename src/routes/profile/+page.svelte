<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import { dev } from '$app/environment';
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
		<!-- ? Handle login -->

		<div class="rounded-xl px-8 py-6 drop-shadow-sm max-w-md mx-auto border">
			<Auth
				supabaseClient={data.supabase}
				appearance={{ theme: ThemeSupa }}
				providers={['discord']}
				redirectTo={dev ? 'http://localhost:5173' : undefined}
				onlyThirdPartyProviders={true}
			/>
			<p class="text-center text-sm">
				<i>Your account is tied to the email used in your Discord account.</i>
			</p>
		</div>
	{:else}
		<!-- ? Handle profile customization -->

		<div class="rounded-xl px-8 py-6 drop-shadow-sm max-w-md mx-auto border">
			<h2 class="text-xl font-bold mb-2">Profile</h2>
			<p class="text-sm mb-4">
				<b>Username:</b>
				{data.profile?.name}
				<br />
				<b>Discord:</b>
				{data.session.user.user_metadata.name}
				<br />
				<b>Email:</b>
				{data.session.user.email}
			</p>
			<button on:click={signOut} class="btn btn-block">Sign Out</button>
		</div>
	{/if}
</main>
