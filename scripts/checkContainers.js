import { execSync } from 'node:child_process';
import chalk from 'chalk';
const containers = execSync(
	'docker compose -f tests/docker-compose.yml ps --status running --quiet '
);

if (containers.length > 0) {
	console.log(chalk.yellow('Containers are running!'));
	process.exit(0);
} else {
	console.log(chalk.yellow('Containers are not running.'));
	process.exit(0);
}
