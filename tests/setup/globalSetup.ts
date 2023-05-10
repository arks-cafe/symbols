import { execSync } from 'child_process';
import chalk from 'chalk';

const setup = async () => {
	// Check if docker compose is available, if not, throw an error
	try {
		const dockerComposeVersion = execSync('docker compose version').toString();
		console.log(chalk.cyan('Using docker compose version:', dockerComposeVersion));
		console.log(chalk.cyan.italic('Starting Containers...'));
		execSync('docker compose --file tests/docker-compose.yml up -d', { stdio: 'ignore' });
		console.log(chalk.green('Containers Started\n'));
		// Initialize the database
		console.log(chalk.cyan.italic('Initializing Database...'));
		execSync('pnpm prisma db push --accept-data-loss');
		console.log(chalk.green('Database Initialized\n'));
	} catch (error) {
		console.error(error);
		console.log(chalk.red('Docker compose is not available!'));
		throw error;
	}
};

export default setup;
