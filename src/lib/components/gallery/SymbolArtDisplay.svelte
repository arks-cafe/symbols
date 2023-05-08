<script lang="ts">
	import type { PostWithAuthor } from '$lib/types';
	export let post: PostWithAuthor;

	const postUrl: string = `/posts/${post.id}`;
	const userUrl: string = `/users/${post.authorId}`;

	const formattedDate = new Date(post.createdAt).toLocaleDateString();
	const soundName: string = 'TODO';

	import { page } from '$app/stores';
	let isOwnedByCurrentUser = $page.data.profile?.userId === post.authorId;
	$: isOwnedByCurrentUser = $page.data.profile?.userId === post.authorId;

	function download() {
		//TODO: download
		alert('TODO: download');
	}

	function playSound() {
		// TODO: play sound
		alert('TODO: play sound');
		console.log(post.rawSoundId);
	}

	function deletePost() {}
</script>

<li class="shadow-lg rounded-box p-3 flex flex-col justify-between">
	<a href={postUrl}
		><img
			class="aspect-[2/1] rounded-box w-full transition-all hover:scale-[101%] hover:shadow-md"
			src={post.thumbnailUrl}
			alt={post.title}
		/></a
	>
	<div class="flex-1">
		<a href={postUrl}>
			<h3 class="font-semibold text-lg link-hover break-words max-w-full">
				{post.title}
			</h3>
		</a>
		<a href={userUrl}>
			<h4 class="italic link-hover">@{post.author.name}</h4>
		</a>
		<div class="flex gap-2 py-2">
			<div class="badge badge-ghost badge-sm">
				<i class="fa-solid fa-file pr-1 text-xs" />{post.rawTitle}
			</div>
			<button
				on:click={() => {
					playSound();
				}}
				class="badge badge-ghost badge-sm hover:brightness-95 select-none"
			>
				<i class="fa-solid fa-volume-high pr-1 text-xs" />{soundName}
			</button>
		</div>
		<h4 class="text-sm italic">posted on {formattedDate}</h4>
	</div>
	<div class="pt-2 flex gap-2">
		<button on:click={download} class="btn btn-secondary btn-sm flex-1">Download</button>
		{#if isOwnedByCurrentUser}
			<button on:click={() => deletePost()} class="btn btn-error btn-sm hover:brightness-95"
				>Delete</button
			>
		{/if}
	</div>
</li>
