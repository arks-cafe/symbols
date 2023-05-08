<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

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

<main class="mx-auto max-w-5xl">
	<div class="mb-8">
		<h1 class="text-4xl font-black">Upload</h1>
		<div class="flex justify-between">
			<a class="btn" href="/">Home</a>
			{#if data.user}
				<a href="/logto/signout" class="btn">sign out</a>
			{:else}
				<a href="/logto/signin" class="btn">sign in</a>
			{/if}
		</div>
		{#if data.profile?.name}
			<h3>Welcome, {data.profile.name}</h3>
		{:else}
			<h3>Welcome, Guest</h3>
		{/if}
	</div>

	{#if data.profile?.name}
		<form
			on:submit|preventDefault={handleSubmit}
			class="mx-auto rounded-xl bg-base-100 border p-8 shadow-lg flex flex-col gap-4"
		>
			<div>
				<label class="btn w-full">
					Select File
					<input
						type="file"
						bind:files
						class="hidden"
						accept=".sar"
						disabled={submitting}
						required
					/>
				</label>
				{#if file}
					<h3 class="text-center font-thing text-sm">{file.name}</h3>
				{/if}
			</div>

			{#if previewSrc && file}
				<div>
					<h2 class="text-center font-bold text-lg">Preview</h2>
				</div>
				<img src={previewSrc} alt="preview" class="w-full rounded-lg mx-auto" />
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
	{:else}
		<p class="text-center">You must be signed in to upload.</p>
	{/if}
</main>
