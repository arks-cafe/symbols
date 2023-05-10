<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import SymbolArtDisplay from './SymbolArtDisplay.svelte';
	import { posts } from '$routes/api/posts/fixtures';
</script>

<Meta title="Components/Gallery/SymbolArtDisplay" component={SymbolArtDisplay} />

<Template let:args>
	<SymbolArtDisplay {...args} />
</Template>

<Story name="Default" args={{ post: posts[0] }} />

<Story name="In Grid">
	<div class="grid grid-cols-2 gap-8">
		{#each posts as post}
			<SymbolArtDisplay {post} />
		{/each}
	</div>
</Story>
