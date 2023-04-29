/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export const postsCreateSchema = z.object({
	name: z.string().trim().max(60),
	file: z.custom<File>(
		(file: any) => file instanceof File && file.type === 'application/octet-stream'
	),
	image: z.custom<File>((image: any) => image instanceof File && image.type === 'image/png')
});

export type PostsCreateType = z.infer<typeof postsCreateSchema>;
