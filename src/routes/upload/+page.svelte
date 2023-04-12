<script lang="ts">
	import type { PageData } from './$types';
	import { uploadSchema, type UploadType } from '$routes/api/upload/schema';
	import SymbolArt from 'symbol-art-parser';
	import renderSar from '$lib/utils/renderSar';

	export let data: PageData;

	let files: FileList | undefined;
	let file: File | undefined;
	$: file = files ? files[0] : undefined;
	let name: string = '';
	let loading = false;
	let previewSrc: string | undefined;

	$: if (typeof file !== 'undefined' && file instanceof File) {
		(async () => {
			try {
				loading = true;
				const sar = new SymbolArt();
				sar.data = await file.arrayBuffer();
				const x = await renderSar(sar.json, '/render/');
				previewSrc = x;
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				} else {
					console.error(error);
					alert('Something went wrong with loading the file...');
				}
			} finally {
				loading = false;
			}
		})();
	}

	async function handleSubmit() {
		// Ensure all fields are filled.
		if (!file || !name || !previewSrc) return;

		// Convert preview image DataURL to file.
		let image = await fetch(previewSrc)
			.then((res) => res.blob())
			.then((blob) => new File([blob], 'image.png', { type: 'image/png' }));

		// Validate all inputs.
		uploadSchema.parse({ name, file, image });

		// Create form data.
		const formData = new FormData();
		formData.append('name', name);
		formData.append('file', file);
		formData.append('image', image);

		const res = await fetch('/api/upload', {
			method: 'POST',
			body: formData
		});

		const json = await res.json();
		console.log(json);
	}
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
	<form on:submit|preventDefault={handleSubmit}>
		<input type="text" bind:value={name} class="input" required />
		<input type="file" bind:files class="file-input w-full max-w-xs" />
		<button type="submit">submit</button>
	</form>
</main>
