import { DeleteObjectsCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';

import { env } from '$env/dynamic/private';

const s3Client = new S3({
	endpoint: env.S3_ENDPOINT_URL,
	credentials: {
		accessKeyId: env.S3_ACCESS_KEY,
		secretAccessKey: env.S3_SECRET_KEY
	},
	region: env.S3_REGION,
	// Resolve to correct endpoint in test environment
	forcePathStyle: env.NODE_ENV === 'test'
	// endpointProvider:
	// 	env.NODE_ENV === 'test' ? () => ({ url: new URL(env.S3_ENDPOINT_URL) }) : undefined
});

export async function uploadFile(
	file: FileList[0],
	key: string,
	newFileName?: string
): Promise<string> {
	console.log('sending file to s3');

	const x = await s3Client.send(
		new PutObjectCommand({
			Bucket: env.S3_BUCKET_NAME,
			Key: key,
			Body: Buffer.from(await file.arrayBuffer()), // I hate this so much lkjhsfgdalkj;hsgdf
			ACL: 'public-read',
			ContentDisposition: newFileName ? `filename="${newFileName}"` : undefined
		})
	);

	// If putObject is successful, return the public URL of the object.

	return `${env.S3_CDN_URL}/${key}`;
}

export async function deleteFiles(key: string[]): Promise<void> {
	const x = await s3Client.send(
		new DeleteObjectsCommand({
			Bucket: env.S3_BUCKET_NAME,
			Delete: {
				Objects: key.map((e) => ({
					Key: e
				}))
			}
		})
	);
}

export default s3Client;
