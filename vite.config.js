import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [react()],

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
        host: host || false,
        hmr: host
            ? {
                  protocol: 'ws',
                  host,
                  port: 1421,
              }
            : undefined,
        watch: {
            // 3. t
            ignored: ['**/src-tauri/**'],
        },
    },

    // Bybit manager migrated conf
    resolve: {
        alias: {
            app: path.resolve(__dirname, './src/app'),
            pages: path.resolve(__dirname, './src/pages'),
            widgets: path.resolve(__dirname, './src/widgets'),
            features: path.resolve(__dirname, './src/features'),
            entities: path.resolve(__dirname, './src/entities'),
            shared: path.resolve(__dirname, './src/shared'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // remove deprecated warning
            },
        },
    },
    assetsInclude: '**/*.MP4',
}));
