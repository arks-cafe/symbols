import { execSync } from 'child_process';

const teardown = async () => {
	execSync('docker compose --file tests/docker-compose.yml down');
};

export default teardown;
