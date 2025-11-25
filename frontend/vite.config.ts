import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    console.log("I'm here")

    console.log(`Env var weather api https ${process.env.services__weatherapi__https__0}`)
    console.log(`Env var weather api http ${process.env.services__weatherapi__http__0}`)
    console.log(`Env var weather api APISERVICE ${process.env.APISERVICE_HTTPS}`)

    

    return {
        plugins: [vue(), vueDevTools()],
        resolve: {
          alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
          },
        },
        server: {
            port: parseInt(env.PORT),
            proxy: {
                '/api': {
                    target: process.env.services__weatherapi__https__0 || process.env.APISERVICE_HTTPS,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                    secure: false,
                }
            }
        },
        build: {
            outDir: 'dist',
            rollupOptions: {
                input: './index.html'
            }
        }
    }
})

