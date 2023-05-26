<script lang="ts">
	import type { PageData } from './$types';
	import UploadForm from './UploadForm.svelte';
	export let data: PageData;

	console.log(data);
</script>

<div class="mx-auto mb-8 max-w-5xl">
	<h1 class="text-4xl font-black">Upload</h1>
</div>

{#if data.profile?.userId}
	<div class="mx-auto mb-16 max-w-xl rounded-xl bg-base-100 p-8 shadow-lg">
		<UploadForm />
	</div>
{:else}
	<div
		class="mx-auto mb-16 flex max-w-xl flex-col items-center rounded-xl bg-base-100 p-8 shadow-lg"
	>
		<h3 class="mb-4 text-center text-xl font-semibold">You must be logged in to upload.</h3>
		<a href="/logto/signin" class="btn-secondary btn">Sign In</a>
	</div>
{/if}
