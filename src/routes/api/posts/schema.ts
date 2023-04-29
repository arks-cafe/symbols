/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

export const postsGetQuerySchema = z.object({
	offset: z.number().int().min(0).default(0)
});

export type PostsGetQueryType = z.infer<typeof postsGetQuerySchema>;
