import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';

import {
	S3_ENDPOINT_URL,
	S3_ACCESS_KEY,
	S3_SECRET_KEY,
	S3_CDN_URL,
	S3_BUCKET_NAME,
	S3_REGION
} from '$env/static/private';

const s3Client = new S3({
	endpoint: S3_ENDPOINT_URL,
	credentials: {
		accessKeyId: S3_ACCESS_KEY,
		secretAccessKey: S3_SECRET_KEY
	},
	region: S3_REGION
});

export async function uploadFile(file: File, key: string): Promise<string> {
	const command = await s3Client.send(
		new PutObjectCommand({
			Bucket: S3_BUCKET_NAME,
			Key: key,
			Body: Buffer.from(await file.arrayBuffer()), // I hate this so much lkjhsfgdalkj;hsgdf
			ACL: 'public-read'
		})
	);

	if (!command.$metadata.httpStatusCode || command.$metadata.httpStatusCode !== 200) {
		throw new Error('Failed to upload file to S3.');
	}

	// If putObject is successful, return the public URL of the object.

	return `${S3_CDN_URL}/${key}`;
}

export default s3Client;
