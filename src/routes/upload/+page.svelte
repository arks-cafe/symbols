<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    
</script>

<main class="max-w-3xl mx-auto my-8">
	<h1 class="font-black text-4xl">Upload</h1>
	<a class="btn" href="/">Home</a>
	<h3>
		{#if data.session}
			Welcome, {data.session.user.id}
		{:else}
			Welcome, guest
		{/if}
	</h3>
</main>
