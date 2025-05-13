import type { Locator, Page } from '@playwright/test'

export class BlogCardComponent {
  constructor(private card: Locator) {}

  // Locators
  title = () => this.card.getByRole('heading', { level: 2 })
  titleLink = () => this.title().getByRole('link')
  description = () => this.card.locator('.description, p')
  meta = () => this.card.locator('.meta')
  date = () => this.meta().locator('.date')
  author = () => this.meta().locator('.author')
  tags = () => this.card.locator('.tags a')
  image = () => this.card.locator('img')

  // Actions
  async click() {
    await this.titleLink().click()
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
