<script lang="ts">
	import { goto } from '$app/navigation';
	import SymbolArtDisplay from '$lib/components/gallery/SymbolArtDisplay';
	import type { PageData } from './$types';

	export let data: PageData;
	const post = data.post;

	function handleDelete(e: CustomEvent<{ id: string }>) {
		goto('/');
	}
</script>

<div class="max-w-xl mx-auto my-8">
	<SymbolArtDisplay on:delete={handleDelete} {post} />
</div>
