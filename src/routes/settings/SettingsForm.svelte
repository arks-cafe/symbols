<script lang="ts">
	// import type { PageData } from './$types';
	// export let data: PageData;

	import theme from '$lib/stores/theme';

	const themeOptions = [
		{
			label: 'Light',
			value: 'light'
		},
		{
			label: 'Dark',
			value: 'dark'
		},
		{
			label: 'Use System Default',
			value: 'system'
		}
	];
</script>

<h3 class="mb-2 font-bold">Theme</h3>
{#each themeOptions as option}
	<label
		class="btn-ghost btn-block btn flex flex-nowrap justify-between px-2 text-start font-normal normal-case"
	>
		<span class="text-sm">{option.label}</span>
		<input type="radio" name="radio-theme" class="radio" bind:group={$theme} value={option.value} />
	</label>
{/each}
