// @ts-check
import { defineConfig } from 'astro/config'
import solidJs from '@astrojs/solid-js'

// https://astro.build/config
export default defineConfig({
  integrations: [ solidJs() ],
  site: 'https://your-username.github.io',
  base: '/blogs',
  output: 'static',
  vite: {
    server: {
      port: 4399,
      strictPort: true
    }
  }
})
