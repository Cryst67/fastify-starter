import 'dotenv/config';
import '@/utils/validate-env';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

const PORT = parseInt(process.env.PORT || '8000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

async function buildServer() {
	const app = fastify();

	await app.register(fastifyCors, {
		origin: CORS_ORIGIN
	});

	app.get('/health', () => {
		return {
			status: 'ok',
			port: PORT
		};
	});

	return app;
}

async function main() {
	const app = await buildServer();

	try {
		await app.listen({ port: PORT, host: HOST });
		console.log(`Server listening at http://${HOST}:${PORT}`);
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}

main();
