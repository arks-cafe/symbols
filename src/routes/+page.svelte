<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="max-w-3xl mx-auto my-8">
	<h1 class="font-black text-4xl">Home</h1>
	<a class="btn" href="/auth">Account</a>
	<a class="btn" href="/preview">Preview</a>
	<a class="btn" href="/upload">Upload</a>
	<h3 class="mb-8">Welcome, guest</h3>
</main>
