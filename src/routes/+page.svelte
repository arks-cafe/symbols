<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="max-w-3xl mx-auto my-8">
	<h1 class="font-black text-4xl">Home</h1>
	<a class="btn" href="/auth">Account</a>
	<a class="btn" href="/preview">Preview</a>
	<a class="btn" href="/upload">Upload</a>
	{#if data.user}
		<h3 class="mb-8">Welcome, {data.user.name}</h3>
		<a href="/logto/signout" class="btn">sign out</a>
	{:else}
		<h3 class="mb-8">Welcome, Guest</h3>
		<a href="/logto/signin" class="btn">sign in</a>
	{/if}
</main>
