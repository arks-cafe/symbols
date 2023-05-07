// import type { RequestHandler } from './$types';
// import { uploadFile } from '$lib/clients/s3.server';
// import { json } from '@sveltejs/kit';

// export const POST: RequestHandler = async ({ request }) => {
// 	const formData = await request.formData();

// 	const file = formData.get('file') as File;
// 	const key = formData.get('key') as string;

// 	const url = await uploadFile(file, key);
// 	return json({ message: 'success', url });
// };
