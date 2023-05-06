<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import SymbolArtDisplay from './SymbolArtDisplay.svelte';
	import exampleSymbolArtSrc from '../../../stories/assets/example-symbol-art.png';

	const discriminators = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
</script>

<Meta title="Components/Gallery/SymbolArtDisplay" component={SymbolArtDisplay} />

<Template let:args>
	<SymbolArtDisplay {...args} />
</Template>

<Story name="Default" args={{ title: 'bababooey', src: exampleSymbolArtSrc }} />

<Story name="In Grid">
	<div class="grid grid-cols-2 gap-8">
		{#each discriminators as discriminator}
			<!-- @ts-ignore -->
			<SymbolArtDisplay title={`Symbol ${discriminator}`} src={exampleSymbolArtSrc} />
		{/each}
	</div>
</Story>
