import { test, expect, Page } from '@playwright/test'

class NavigationPage {
  constructor(private page: Page) {}
  async goto() {
    await this.page.goto('/jelly-time/')
  }
  navLink(name: string) {
    return this.page.getByRole('link', { name, exact: true })
  }
  async goTo(name: string) {
    await this.navLink(name).click()
  }
  async title() {
    return this.page.title()
  }
}

async function setUp(page: Page) {
  const navigation = new NavigationPage(page)
  await navigation.goto()
  return { navigation }
}

test('should navigate between pages', async ({ page }) => {
  const { navigation } = await setUp(page)
  await expect(await navigation.title()).toContain('Home | Blog and Presentations')
  await navigation.goTo('Blog')
  await expect(await navigation.title()).toContain('Blog | Articles and Tutorials')
  await navigation.goTo('Presentations')
  await expect(await navigation.title()).toContain('Presentations | Tech Talks and Slides')
  await navigation.goTo('Home')
  await expect(await navigation.title()).toContain('Home | Blog and Presentations')
})

test('navigation should be keyboard accessible', async ({ page }) => {
  const { navigation } = await setUp(page)
  await page.keyboard.press('Tab')
  await expect(navigation.navLink('Home')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(navigation.navLink('Blog')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(navigation.navLink('Presentations')).toBeFocused()
  await page.keyboard.press('Enter')
  await page.waitForNavigation()
  await expect(await navigation.title()).toContain('Presentations | Tech Talks and Slides')
})

test('responsive layout shows navigation on mobile', async ({ page }) => {
  const { navigation } = await setUp(page)
  await page.setViewportSize({ width: 375, height: 667 })
  await expect(navigation.navLink('Home')).toBeVisible()
  await expect(navigation.navLink('Blog')).toBeVisible()
  await expect(navigation.navLink('Presentations')).toBeVisible()
})
