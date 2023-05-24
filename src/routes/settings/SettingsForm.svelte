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

{#each themeOptions as option}
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">{option.label}</span>
			<input
				type="radio"
				name="radio-theme"
				class="radio"
				bind:group={$theme}
				value={option.value}
			/>
		</label>
	</div>
{/each}
