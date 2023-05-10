<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import SymbolArtDisplay from '$lib/components/gallery/SymbolArtDisplay';

	// Set initial posts from page load.
	let posts = data.posts;
	let profile = data.profile;
	let loading = false;

	async function showMore() {
		try {
			loading = true;
			const res = await fetch(
				`/api/posts?untilCursor=${posts.at(-1)?.cursor}&userId=${profile.userId}`
			);
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
	<h1 class="font-black text-4xl">Posts from @{profile.name}</h1>
</div>

<div class="mx-auto max-w-5xl mb-16">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
		{#each posts as post}
			<SymbolArtDisplay on:delete={handleDelete} {post} />
		{/each}
	</div>
	<button on:click={showMore} disabled={loading} class="btn btn-block btn-sm">Load More</button>
</div>
