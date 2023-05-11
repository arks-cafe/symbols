import { execSync } from 'child_process';
import chalk from 'chalk';
import { BucketAlreadyExists, BucketAlreadyOwnedByYou, S3 } from '@aws-sdk/client-s3';

const setup = async () => {
	try {
		if (
			!process.env.S3_ENDPOINT_URL ||
			!process.env.S3_REGION ||
			!process.env.S3_ACCESS_KEY ||
			!process.env.S3_SECRET_KEY ||
			!process.env.S3_BUCKET_NAME
		) {
			console.log(chalk.red('Please provide all the required environment variables!'));
			process.exit(1);
		}

		// Check if docker compose is available, if not, throw an error
		const dockerComposeVersion = execSync('docker compose version', { stdio: 'pipe' }).toString();
		if (!dockerComposeVersion) throw new Error();
		console.log(chalk.cyan('Using docker compose version:', dockerComposeVersion));

		// Start the containers
		console.log(chalk.cyan.italic('Starting Containers...'));
		execSync('docker compose --file tests/docker-compose.yml up -d', { stdio: 'inherit' });
		console.log(chalk.green('Containers Started\n'));

		// Initialize the database
		console.log(chalk.cyan.italic('Initializing Database...'));
		execSync('pnpm dotenv -e .env.testing -- prisma db push --accept-data-loss', {
			stdio: 'inherit'
		});
		console.log(chalk.green('Database Initialized\n'));

		// Initialize test bucket in minio
		console.log(chalk.cyan.italic('Initializing Minio...'));
		const minioClient = new S3({
			endpoint: process.env.S3_ENDPOINT_URL,
			region: process.env.S3_REGION,
			forcePathStyle: true,
			credentials: {
				accessKeyId: process.env.S3_ACCESS_KEY ?? '',
				secretAccessKey: process.env.S3_SECRET_KEY ?? ''
			}
		});
		try {
			await minioClient.createBucket({ Bucket: process.env.S3_BUCKET_NAME });
		} catch (error) {
			if (error instanceof BucketAlreadyOwnedByYou || error instanceof BucketAlreadyExists) {
				console.log(chalk.yellow('Bucket already exists!'));
			} else {
				throw error;
			}
		}

		console.log(chalk.green('Minio Initialized\n'));
	} catch (error) {
		console.error(error);
		console.log(chalk.red('Something went wrong when initializing test containers!'));
		throw error;
	}
};

export default setup;
