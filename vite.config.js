import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoAlias from './config/autoAlias.js';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			...autoAlias,
		},
	},
	base: './',
	build: {
		outDir: './docs',
		emptyOutDir: true, // also necessary
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler', // remove deprecated warning
			},
		},
	},
});
