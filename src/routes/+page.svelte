<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import SymbolArtDisplay from '$lib/components/gallery/SymbolArtDisplay.svelte';

	// Set initial posts from page load.
	let posts = data.posts;
	let loading = false;

	async function showMore() {
		try {
			loading = true;
			const res = await fetch(`/api/posts?untilCursor=${posts.at(-1)?.cursor}`);
			const json = await res.json();
			console.log(json);
			if (!json.length) {
				alert('No more posts!');
				return;
			}
			posts = [...posts, ...json];
		} finally {
			loading = false;
		}
	}

	function handleDelete(e: CustomEvent<{ id: string }>) {
		posts = posts.filter((post) => post.id !== e.detail.id);
	}
</script>

<div class="max-w-5xl mx-auto mb-8">
	<h1 class="font-black text-4xl">Home</h1>
	<div class="flex justify-between">
		<div class="flex gap-2">
			<a class="btn" href="/upload">Upload</a>
			<a class="btn" href="/preview">Preview</a>
		</div>
		<div class="flex">
			{#if data.user}
				<a href="/logto/signout" class="btn">sign out</a>
			{:else}
				<a href="/logto/signin" class="btn">sign in</a>
			{/if}
		</div>
	</div>
	{#if data.profile?.name}
		<h3>Welcome, {data.profile.name}</h3>
	{:else}
		<h3>Welcome, Guest</h3>
	{/if}
</div>

<div class="mx-auto max-w-5xl mb-16">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
		{#each posts as post (post.id)}
			<SymbolArtDisplay on:delete={handleDelete} {post} />
		{/each}
	</div>
	<button on:click={showMore} disabled={loading} class="btn btn-block btn-sm">Load More</button>
</div>
