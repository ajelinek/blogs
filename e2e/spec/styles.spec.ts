import { test, expect } from '@playwright/test'

// Checks for global style application and mobile layout

async function setUp(page: import('@playwright/test').Page) {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/jelly-time/')
}

test('shows navigation and content on mobile', async ({ page }) => {
  await setUp(page)
  const nav = await page.getByRole('navigation', { name: 'Main navigation' })
  await expect(nav).toBeVisible()
  const home = await page.getByRole('link', { name: 'Home', exact: true })
  await expect(home).toBeVisible()
  const blog = await page.getByRole('link', { name: 'Blog', exact: true })
  await expect(blog).toBeVisible()
  const presentations = await page.getByRole('link', { name: 'Presentations', exact: true })
  await expect(presentations).toBeVisible()
})
