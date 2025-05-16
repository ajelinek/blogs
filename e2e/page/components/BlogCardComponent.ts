import type { Locator, Page } from '@playwright/test'

export class BlogCardComponent {
  constructor(
    private card: Locator,
    private page: Page
  ) {}

  // Locators
  title = () => this.card.getByRole('heading', { level: 2 })
  titleLink = () => this.title().getByRole('link')
  imageLinkLocator = () => this.card.locator('a').first() // Assuming first 'a' is the image container link
  description = () => this.card.locator('.description, p')
  meta = () => this.card.locator('.meta')
  date = () => this.meta().locator('.date')
  author = () => this.meta().locator('.author')
  tags = () => this.card.locator('.tags a')
  image = () => this.card.locator('img')

  // Actions
  async clickTitle() {
    await this.titleLink().click()
  }

  async clickToNavigate() {
    const titleLinkElement = this.titleLink()
    // Check if titleLinkElement is a valid locator and if it's visible to be clicked
    // Direct isVisible check on locator before click is Playwright best practice
    if (await titleLinkElement.isVisible()) {
      await titleLinkElement.click()
    } else {
      // Fallback to clicking the image container link
      await this.imageLinkLocator().click()
    }
    // page.waitForLoadState is crucial here, but this.page needs to be valid.
    // This requires passing 'page' to BlogCardComponent constructor.
    await this.page.waitForLoadState('networkidle')
  }

  async clickTag(tagName: string) {
    await this.tags().filter({ hasText: tagName }).click()
  }

  // Helper methods
  async getTitle(): Promise<string> {
    return (await this.title().textContent()) || ''
  }

  async getTagsCount(): Promise<number> {
    return await this.tags().count()
  }
}
