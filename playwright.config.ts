import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright config for end-to-end testing
 */
export default defineConfig({
  testDir: './e2e/spec',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4333',
    trace: 'on-first-retry',
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'pnpm preview',
    port: 4333,
    reuseExistingServer: false,
  },
})
