<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="max-w-3xl mx-auto my-8">
	<h1 class="font-black text-4xl">Home</h1>
	<a class="btn" href="/profile">Account</a>
	<a class="btn" href="/preview">Preview</a>
	<a class="btn" href="/upload">Upload</a>
	<h3 class="mb-8">
		{#if data.session}
			Welcome, {data.session.user.id}
		{:else}
			Welcome, guest
		{/if}
	</h3>

	<ul class="flex flex-col gap-4">
		{#each data.posts as post}
			<li>
				<h3 class="text-xl">{post.name}</h3>
				<img
					class="max-w-sm"
					src={data.supabase.storage.from('posts').getPublicUrl(post.thumbnail_path).data.publicUrl}
					alt={post.name}
				/>
			</li>
		{/each}
	</ul>
</main>
