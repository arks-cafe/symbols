import chalk from 'chalk';
import { execSync } from 'child_process';

const teardown = () => {
	console.log(chalk.cyan.italic('Stopping Containers...'));
	execSync('docker compose --file tests/docker-compose.yml down', { stdio: 'inherit' });
	console.log(chalk.green('Containers Stopped!'));
};

export default teardown;
