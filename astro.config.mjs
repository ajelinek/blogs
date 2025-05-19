// @ts-check
import { defineConfig } from 'astro/config'
import solidJs from '@astrojs/solid-js'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  integrations: [ solidJs(), mdx() ],
  site: 'https://your-username.github.io',
  base: '/jelly-time',
  output: 'static',
  server: {
    port: 4333,
  },
  devToolbar: {
    enabled: process.env.NODE_ENV !== 'test'
  }
})
