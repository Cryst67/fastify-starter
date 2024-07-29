import 'dotenv/config';
import validateEnv from '@/utils/validate-env';

async function main() {
	validateEnv();
}

main();
