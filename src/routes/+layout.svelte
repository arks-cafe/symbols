<script lang="ts">
	/** Import Tailwind CSS */
	import '../app.css';

	import AppShell from './AppShell.svelte';
	import SvelteSeo from 'svelte-seo';
</script>

<SvelteSeo
	title="Symbol Bucket"
	description="Upload and share your Symbol Arts from PSO2!"
	openGraph={{
		title: 'Symbol Bucket',
		description: 'Upload and share your Symbol Arts from PSO2!',
		url: 'https://symbol.arks.cafe',
		images: [{ url: 'https://symbols.arks.cafe/og-image.png' }]
	}}
	twitter={{
		card: 'summary',
		site: '@arks_cafe',
		title: 'Symbol Bucket',
		description: 'Upload and share your Symbol Arts from PSO2!',
		image: 'https://symbols.arks.cafe/og-image.png'
	}}
/>

<AppShell>
	<slot />
</AppShell>
