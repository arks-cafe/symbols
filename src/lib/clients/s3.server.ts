import { DeleteObjectsCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';

import { env } from '$env/dynamic/private';

const s3Client = new S3({
	endpoint: env.S3_ENDPOINT_URL,
	credentials: {
		accessKeyId: env.S3_ACCESS_KEY,
		secretAccessKey: env.S3_SECRET_KEY
	},
	region: env.S3_REGION
});

export async function uploadFile(file: File, key: string, newFileName?: string): Promise<string> {
	await s3Client
		.send(
			new PutObjectCommand({
				Bucket: env.S3_BUCKET_NAME,
				Key: key,
				Body: Buffer.from(await file.arrayBuffer()), // I hate this so much lkjhsfgdalkj;hsgdf
				ACL: 'public-read',
				ContentDisposition: newFileName ? `filename="${newFileName}"` : undefined
			})
		)
		.catch((e) => {
			if (e instanceof Error) {
				throw e;
			}
			throw new Error('Failed to upload file to S3.');
		});

	// If putObject is successful, return the public URL of the object.

	return `${env.S3_CDN_URL}/${key}`;
}

export async function deleteFiles(key: string[]): Promise<void> {
	await s3Client
		.send(
			new DeleteObjectsCommand({
				Bucket: env.S3_BUCKET_NAME,
				Delete: {
					Objects: key.map((e) => ({
						Key: e
					}))
				}
			})
		)
		.catch((e) => {
			if (e instanceof Error) {
				throw e;
			}
			throw new Error('Failed to delete files from S3.');
		});
}

export default s3Client;
