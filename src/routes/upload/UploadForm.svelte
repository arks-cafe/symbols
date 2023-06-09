<script lang="ts">
	import { page } from '$app/stores';
	let data = $page.data;
	$: data = $page.data;

	import { postsCreateSchema } from '$routes/api/posts/schema';
	import renderSar from '$lib/utils/renderSar';
	import parseSar from '$lib/utils/parseSar';
	import type { PostPostResult } from '$routes/api/posts/+server';
	import { goto } from '$app/navigation';

	let files: FileList | undefined;
	let file: File | undefined;
	let title: string = '';
	let loading = false;
	let previewSrc: string | undefined;
	let titleInput: HTMLInputElement;

	$: if (files && typeof files[0] !== 'undefined' && files[0] instanceof File) {
		(async () => {
			try {
				loading = true;
				const sar = await parseSar(files[0]);
				const x = await renderSar(sar, '/render/');
				previewSrc = x;
				file = files[0];
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				} else {
					console.error(error);
					alert('Something went wrong with loading the file...');
				}
			} finally {
				loading = false;
				if (titleInput) titleInput.focus();
			}
		})();
	}

	let readyToSubmit = false;
	$: readyToSubmit = !!file && !!title && !!previewSrc;
	let submitting = false;

	async function handleSubmit() {
		try {
			// Ensure all fields are filled.
			if (!file || !title || !previewSrc || !readyToSubmit)
				throw new Error('Please fill all fields...');

			if (submitting) throw new Error('Already submitting...');

			submitting = true;

			// Convert preview image DataURL to file.
			let image = await fetch(previewSrc)
				.then((res) => res.blob())
				.then((blob) => new File([blob], 'image.png', { type: 'image/png' }));

			const newFile = new File([file], `${title}.sar`, { type: 'application/octet-stream' });

			// Validate all inputs.
			postsCreateSchema.parse({ title, file: newFile, image });

			// Create form data.
			const formData = new FormData();
			formData.append('title', title);
			formData.append('file', file);
			formData.append('image', image);

			const res = await fetch('/api/posts', {
				method: 'POST',
				body: formData
			});

			const json: PostPostResult = await res.json();
			console.log(json);
			if (res.status === 200) {
				goto('/posts/' + json.post.id);
			} else {
				throw new Error(json.message ?? 'Something went wrong...');
			}
			submitting = false;
		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				alert(err.message);
			} else {
				alert('Something went wrong...');
			}
		} finally {
			submitting = false;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="mx-auto flex flex-col gap-4">
	<div>
		<label aria-label="button" class="btn w-full">
			Select File
			<input type="file" bind:files class="hidden" accept=".sar" disabled={submitting} required />
		</label>
		{#if file}
			<h3 class="font-thing text-center text-sm">{file.name}</h3>
		{/if}
	</div>

	{#if previewSrc && file}
		<div>
			<h2 class="text-center text-lg font-bold">Preview</h2>
		</div>
		<img src={previewSrc} alt="preview" class="mx-auto w-full rounded-lg" />
	{:else if loading}
		<p class="text-center">Loading...</p>
	{/if}

	{#if previewSrc}
		<div class="form-control">
			<label>
				<span class="label-text">Post Title</span>
				<input
					type="text"
					bind:value={title}
					bind:this={titleInput}
					class="input-bordered input w-full"
					required
					disabled={submitting}
				/>
			</label>
		</div>

		<div>
			<button type="submit" class="btn-block btn" disabled={!readyToSubmit || submitting}
				>submit</button
			>
		</div>
	{/if}
</form>
