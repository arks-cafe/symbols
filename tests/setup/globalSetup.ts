import { execSync } from 'child_process';
import chalk from 'chalk';

const setup = () => {
	// Check if docker compose is available, if not, throw an error
	try {
		const dockerComposeVersion = execSync('docker compose version', { stdio: 'pipe' }).toString();
		if (!dockerComposeVersion) throw new Error();
		console.log(chalk.cyan('Using docker compose version:', dockerComposeVersion));
		console.log(chalk.cyan.italic('Starting Containers...'));
		execSync('docker compose --file tests/docker-compose.yml up -d', { stdio: 'inherit' });
		console.log(chalk.green('Containers Started\n'));
		// Initialize the database
		console.log(chalk.cyan.italic('Initializing Database...'));
		execSync('pnpm dotenv -e .env.testing -- prisma db push --accept-data-loss', {
			stdio: 'inherit'
		});
		console.log(chalk.green('Database Initialized\n'));
	} catch (error) {
		console.error(error);
		console.log(chalk.red('Docker compose is not available!'));
		throw error;
	}
};

export default setup;
