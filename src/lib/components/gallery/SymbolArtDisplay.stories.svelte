<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import SymbolArtDisplay from './SymbolArtDisplay.svelte';
	import exampleSymbolArtSrc from '../../../stories/assets/example-symbol-art.png';

	const posts = [
		{
			id: '48BWDDiLSKtw',
			cursor: 4,
			createdAt: new Date('2023-05-07T21:17:01.564Z'),
			updatedAt: new Date('2023-05-07T21:17:01.564Z'),
			title: 'lobby grind',
			fileUrl: 'https://files.symbols.arks.cafe/48BWDDiLSKtw.sar',
			thumbnailUrl: 'https://files.symbols.arks.cafe/48BWDDiLSKtw-thumbnail.png',
			rawLayerCount: 79,
			rawTitle: 'Drake',
			rawSoundId: 7,
			rawAuthorId: 10398326,
			authorId: '8q2op1xkjs1n',
			author: {
				userId: '8q2op1xkjs1n',
				createdAt: new Date('2023-05-07T20:59:39.406Z'),
				updatedAt: new Date('2023-05-07T20:59:39.406Z'),
				name: 'jojobii',
				description: null
			}
		},
		{
			id: 'c0MuTmaT5RzT',
			cursor: 3,
			createdAt: new Date('2023-05-07T21:16:45.593Z'),
			updatedAt: new Date('2023-05-07T21:16:45.593Z'),
			title: 'go to jail!',
			fileUrl: 'https://files.symbols.arks.cafe/c0MuTmaT5RzT.sar',
			thumbnailUrl: 'https://files.symbols.arks.cafe/c0MuTmaT5RzT-thumbnail.png',
			rawLayerCount: 208,
			rawTitle: 'BK: GO TO JAIL',
			rawSoundId: 4,
			rawAuthorId: 10507843,
			authorId: '8q2op1xkjs1n',
			author: {
				userId: '8q2op1xkjs1n',
				createdAt: new Date('2023-05-07T20:59:39.406Z'),
				updatedAt: new Date('2023-05-07T20:59:39.406Z'),
				name: 'jojobii',
				description: null
			}
		},
		{
			id: 'qqU1np8eP-O7',
			cursor: 2,
			createdAt: new Date('2023-05-07T20:59:54.767Z'),
			updatedAt: new Date('2023-05-07T20:59:54.767Z'),
			title: 'mosty',
			fileUrl: 'https://files.symbols.arks.cafe/qqU1np8eP-O7.sar',
			thumbnailUrl: 'https://files.symbols.arks.cafe/qqU1np8eP-O7-thumbnail.png',
			rawLayerCount: 206,
			rawTitle: '【敗者】',
			rawSoundId: 1,
			rawAuthorId: 10010594,
			authorId: '8q2op1xkjs1n',
			author: {
				userId: '8q2op1xkjs1n',
				createdAt: new Date('2023-05-07T20:59:39.406Z'),
				updatedAt: new Date('2023-05-07T20:59:39.406Z'),
				name: 'jojobii',
				description: null
			}
		}
	];
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
