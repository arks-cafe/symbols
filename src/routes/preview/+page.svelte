<script lang="ts">
	import SymbolArt from 'symbol-art-parser';
	import renderSar from '$lib/utils/renderSar';

	let files: HTMLInputElement['files'];
	let file: File | null;
	$: file = files ? files[0] : null;

	let src: string | null = '';
	let loading: boolean = false;

	$: if (file) {
		(async () => {
			try {
				loading = true;
				const sar = new SymbolArt();
				sar.data = await file.arrayBuffer();
				const x = await renderSar(sar.json, '/render/');
				src = x;
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
</script>

<div class="container mx-auto py-16">
	<header class="mb-8">
		<h1 class="text-4xl font-black"><code>.sar</code> File Previewer</h1>
		<a href="/" class="btn">Back Home</a>
	</header>

	<div class="mb-8 rounded-xl bg-base-300 p-4 text-base-content">
		<label class="italic" for="symbolart">Load <code>.sar</code> file</label>
		<br />
		<input type="file" name="symbolart" id="symbolart" accept=".sar" bind:files />
	</div>

	<div>
		<h3 class="mb-8 text-2xl font-bold">Preview</h3>

		{#if loading}
			<p>Rendering Symbol Art...</p>
		{/if}

		{#if src}
			<img {src} alt="" />
		{/if}

		{#if !file}
			Please load a file.
		{/if}
	</div>
</div>
