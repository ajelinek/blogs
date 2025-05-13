// @ts-check
import { defineConfig } from 'astro/config'
import solidJs from '@astrojs/solid-js'

// https://astro.build/config
export default defineConfig({
  integrations: [ solidJs() ],
  site: 'https://your-username.github.io',
  base: '/jelly-time',
  output: 'static',
  server: {
    port: 4333,
  }
})
