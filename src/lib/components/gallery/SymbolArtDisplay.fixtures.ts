import exampleSymbolArtSrc from '$fixtures/example.png';

import type SymbolArtDisplay from './SymbolArtDisplay.svelte';
import type { ComponentProps } from 'svelte';
type SymbolArtDisplayProps = ComponentProps<SymbolArtDisplay>;

export const posts: SymbolArtDisplayProps['post'][] = [
	{
		id: 'xDWwCBRq0Piz',
		cursor: 3,
		createdAt: new Date('2023-05-08T14:57:06.914Z'),
		updatedAt: new Date('2023-05-08T14:57:06.914Z'),
		title: 'meow',
		fileUrl: 'https://files.symbols.arks.cafe/xDWwCBRq0Piz.sar',
		fileKey: 'xDWwCBRq0Piz.sar',
		thumbnailUrl: exampleSymbolArtSrc,
		thumbnailKey: 'xDWwCBRq0Piz-thumbnail.png',
		rawLayerCount: 225,
		rawTitle: 'カンナカムイ2',
		rawSoundId: 12,
		rawAuthorId: 13724959,
		authorId: '8q2op1xkjs1n',
		author: {
			userId: '8q2op1xkjs1n',
			createdAt: new Date('2023-05-08T14:55:29.523Z'),
			updatedAt: new Date('2023-05-08T14:55:29.523Z'),
			name: 'jojobii',
			description: null
		}
	},
	{
		id: 'fwSabXqAO9u9',
		cursor: 2,
		createdAt: new Date('2023-05-08T14:55:51.280Z'),
		updatedAt: new Date('2023-05-08T14:55:51.280Z'),
		title: 'Hell yeah!',
		fileUrl: 'https://files.symbols.arks.cafe/fwSabXqAO9u9.sar',
		fileKey: 'fwSabXqAO9u9.sar',
		thumbnailUrl: exampleSymbolArtSrc,
		thumbnailKey: 'fwSabXqAO9u9-thumbnail.png',
		rawLayerCount: 187,
		rawTitle: 'Untitled',
		rawSoundId: 12,
		rawAuthorId: 10002289,
		authorId: '8q2op1xkjs1n',
		author: {
			userId: '8q2op1xkjs1n',
			createdAt: new Date('2023-05-08T14:55:29.523Z'),
			updatedAt: new Date('2023-05-08T14:55:29.523Z'),
			name: 'jojobii',
			description: null
		}
	},
	{
		id: '8mSNWs5PH60L',
		cursor: 1,
		createdAt: new Date('2023-05-08T14:55:41.333Z'),
		updatedAt: new Date('2023-05-08T14:55:41.333Z'),
		title: "hey what's up :)",
		fileUrl: 'https://files.symbols.arks.cafe/8mSNWs5PH60L.sar',
		fileKey: '8mSNWs5PH60L.sar',
		thumbnailUrl: exampleSymbolArtSrc,
		thumbnailKey: '8mSNWs5PH60L-thumbnail.png',
		rawLayerCount: 167,
		rawTitle: 'Eggman Announcement',
		rawSoundId: 4,
		rawAuthorId: 0,
		authorId: '8q2op1xkjs1n',
		author: {
			userId: '8q2op1xkjs1n',
			createdAt: new Date('2023-05-08T14:55:29.523Z'),
			updatedAt: new Date('2023-05-08T14:55:29.523Z'),
			name: 'jojobii',
			description: null
		}
	}
];
