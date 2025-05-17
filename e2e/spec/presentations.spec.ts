import { test, expect, type Page } from '@playwright/test'
import { PresentationsPage } from '../page/presentations.page'

async function setUp(page: Page) {
  const presentationsPage = new PresentationsPage(page)
  await presentationsPage.goto()
  return { presentationsPage }
}

test('page has correct title', async ({ page }) => {
  await setUp(page)
  await expect(page).toHaveTitle('Presentations')
})

test('page displays presentation list', async ({ page }) => {
  const { presentationsPage } = await setUp(page)
  await expect(presentationsPage.mainHeading()).toBeVisible()
  await expect(presentationsPage.presentationListItem('Sample Presentation')).toBeVisible()
})
