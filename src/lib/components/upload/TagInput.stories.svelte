<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import TagInput from './TagInput.svelte';
</script>

<Meta title="Components/Upload/TagInput" component={TagInput} />

<Template let:args>
	<TagInput {...args} />
</Template>

<Story name="Default" />
