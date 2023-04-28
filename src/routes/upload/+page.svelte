<script lang="ts">
	import type { PageData } from './$types';
	import { uploadSchema, type UploadType } from '$routes/api/posts/create/schema';
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

	let readyToSubmit = false;
	$: readyToSubmit = !!file && !!name && !!previewSrc;
	let submitting = false;

	async function handleSubmit() {
		// Ensure all fields are filled.
		if (!file || !name || !previewSrc || !readyToSubmit) return;

		if (submitting) return;

		submitting = true;

		// Convert preview image DataURL to file.
		let image = await fetch(previewSrc)
			.then((res) => res.blob())
			.then((blob) => new File([blob], 'image.png', { type: 'image/png' }));

		const newFile = new File([file], `${name}.sar`, { type: 'application/octet-stream' });

		// Validate all inputs.
		uploadSchema.parse({ name, file: newFile, image });

		// Create form data.
		const formData = new FormData();
		formData.append('name', name);
		formData.append('file', file);
		formData.append('image', image);

		const res = await fetch('/api/posts/create', {
			method: 'POST',
			body: formData
		});

		const json = await res.json();
		console.log(json);
		if (json.message === 'success') {
			alert('Successfully uploaded!');
		} else {
			alert(json.message ?? 'Something went wrong...');
		}
		submitting = false;
	}
</script>

<main class="mx-auto my-8 max-w-3xl">
	<h1 class="text-4xl font-black">Upload</h1>
	<a class="btn" href="/">Home</a>
	<h3>
		{#if data.session}
			Welcome, {data.session.user.id}
		{:else}
			Welcome, guest
		{/if}
	</h3>
	<form
		on:submit|preventDefault={handleSubmit}
		class="mx-auto rounded-xl border px-8 py-6 drop-shadow-sm flex flex-col gap-4"
	>
		<div>
			<input
				type="file"
				bind:files
				class="file-input input-bordered w-full"
				accept=".sar"
				disabled={submitting}
				required
			/>
		</div>

		{#if previewSrc}
			<h2 class="text-center font-bold text-lg">Preview</h2>
			<img src={previewSrc} alt="preview" class="max-w-sm mx-auto" />
		{:else if loading}
			<p class="text-center">Loading...</p>
		{/if}

		{#if previewSrc}
			<div class="form-control">
				<label>
					<span class="label-text">Post Title</span>
					<input
						type="text"
						bind:value={name}
						class="input-bordered input w-full"
						required
						disabled={submitting}
					/>
				</label>
			</div>

			<div>
				<button type="submit" class="btn btn-block" disabled={!readyToSubmit || submitting}
					>submit</button
				>
			</div>
		{/if}
	</form>
</main>
