import * as z from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production']),
	PORT: z.string().optional(),
	HOST: z.string().optional(),
	CORS_ORIGIN: z.string().optional()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error('Missing environment variables');
	parsedEnv.error.issues.map((issue) => {
		console.error(issue.path[0], issue.message);
	});
	process.exit(1);
}

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}
