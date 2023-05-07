<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	console.log(data);
	import SymbolArtDisplay from '$lib/components/gallery/SymbolArtDisplay.svelte';
</script>

<div class="p-8 max-w-6xl mx-auto">
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
		{#each data.catalog.posts as post}
			<SymbolArtDisplay {post} />
		{/each}
	</div>
</div>
