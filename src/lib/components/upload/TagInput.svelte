<script lang="ts">
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	export let tags: string[] = [];
	let value: string;

	function addTag(e) {
		console.log(e);
		// console.log('meow');
		// if (tags.includes(value)) return;
		// if (value) {
		// 	tags = [...tags, value];
		// 	value = '';
		// }
	}

	function deleteTag(tag: string) {
		console.log('deleting');
		tags = tags.filter((t) => t !== tag);
	}
</script>

<div class="form-control">
	<label for="taginput" class="label">Tags</label>
	<input
		on:submit|stopPropagation|preventDefault
		bind:value
		name="taginput"
		type="text"
		class="input-bordered input input-sm w-full"
	/>
</div>

<ul class="flex flex-wrap gap-2">
	{#each tags as tag (tag)}
		<li transition:scale={{ duration: 200 }} animate:flip={{ duration: 100 }}>
			<button
				on:click|preventDefault|stopPropagation={() => {
					deleteTag(tag);
				}}
				class="badge-ghost badge flex select-none items-center justify-between hover:brightness-95"
				>{tag}<i class="fa-solid fa-x ml-2 text-xs" /></button
			>
		</li>
	{/each}
</ul>
