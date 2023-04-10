/**
 * Script to generate types for Supabase.
 * @see https://supabase.com/docs/reference/javascript/typescript-support#generating-types
 */

import * as dotenv from 'dotenv';
dotenv.config();

import { execSync } from 'node:child_process';
import chalk from 'chalk';

if (typeof process.env.PUBLIC_SUPABASE_PROJECT_ID !== 'string') {
	console.error(chalk.red('PUBLIC_SUPABASE_PROJECT_ID is not provided in .env, exiting...'));
	process.exit(1);
}

try {
	console.log(chalk.cyan('Generating Types...'));
	execSync(
		`supabase gen types typescript --project-id ${process.env.PUBLIC_SUPABASE_PROJECT_ID} --schema public | pnpm prettier --stdin-filepath .ts > src/lib/types/supabase.ts`
	);
	console.log(chalk.green('Types can be found in src/lib/types/supabase.ts'));
} catch (error) {
	console.error(chalk.red('Something went wrong when generating types...'));
	process.exit(1);
}
