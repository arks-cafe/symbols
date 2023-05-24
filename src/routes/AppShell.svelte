<script lang="ts">
	import ThemeHandler from './ThemeHandler.svelte';
	import Header from './Header.svelte';
</script>

<ThemeHandler />

<main class="container mx-auto min-h-screen max-w-6xl bg-base-200 pb-4 shadow-lg">
	<Header />
	<div class="px-8">
		<slot />
	</div>
</main>
