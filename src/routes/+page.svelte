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

<div class="mx-auto mb-16 mt-16 max-w-5xl">
	<div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
		{#each posts as post (post.id)}
			<SymbolArtDisplay on:delete={handleDelete} {post} />
		{/each}
	</div>
	<button on:click={showMore} disabled={loading} class="btn-block btn-sm btn">Load More</button>
</div>
