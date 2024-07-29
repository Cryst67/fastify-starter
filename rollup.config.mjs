import path from 'path';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

export default {
	input: 'src/index.ts',
	output: [
		{
			dir: 'dist',
			format: 'cjs',
			sourcemap: true,
			entryFileNames: '[name].cjs'
		},
		{
			dir: 'dist',
			format: 'esm',
			sourcemap: true,
			entryFileNames: '[name].mjs'
		}
	],
	plugins: [
		alias({
			entries: [{ find: '@', replacement: path.resolve('src') }]
		}),
		resolve(),
		commonjs(),
		typescript({ tsconfig: './tsconfig.json' }),
		terser({
			output: {
				ascii_only: true
			}
		}),
		json()
	],
	external: []
};
