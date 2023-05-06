<script lang="ts">
	// TODO: figure out how i want to format this
	export let isOwnedByCurrentUser: boolean = false;
	export let title: string = 'Title';
	export let src: string = '';
	export let postUrl: string = '';
	export let userUrl: string = '';
	export let authorName: string = 'author';
	// export let authorId: number = '';
	export let ingameName: string = 'Ingame Name';
	export let ingameSoundId: number = 1;
	export let createdAt: string = '2/2/2022';

	const formattedDate = new Date(createdAt).toLocaleDateString();
	const soundName: string = 'TODO';

	function download() {
		//TODO: download
		alert('TODO: download');
	}

	function playSound() {
		// TODO: play sound
		alert('TODO: play sound');
		console.log(ingameSoundId);
	}

	function deletePost() {}
</script>

<li class="shadow-lg rounded-box p-3 flex flex-col justify-between">
	<a href={postUrl}><img class="aspect-[2/1] rounded-box w-full" {src} alt={title} /></a>
	<div class="flex-1">
		<a href={postUrl}>
			<h3 class="font-semibold text-lg link-hover break-words max-w-full">
				{title}
			</h3>
		</a>
		<a href={userUrl}>
			<h4 class="italic link-hover">@{authorName}</h4>
		</a>
		<div class="flex gap-2 py-2">
			<div class="badge badge-ghost badge-sm">
				<i class="fa-solid fa-file pr-1 text-xs" />{ingameName}
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
