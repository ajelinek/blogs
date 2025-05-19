import type { Locator, Page } from '@playwright/test'

export class TagFilterComponent {
  constructor(private page: Page) {}

  // Locators
  filter = () => this.page.getByRole('region', { name: 'Tag Filter' })
  tagList = () => this.filter().getByRole('list')
  tagLinks = () => this.tagList().getByRole('link')
  tagLink = (tag: string) => this.filter().getByRole('link', { name: tag })
  allTagsLink = () => this.filter().getByRole('link', { name: 'All' })

  // Actions
  async clickTag(tag: string) {
    await this.tagLink(tag).click()
  }

  async clickAllTags() {
    await this.allTagsLink().click()
  }

  // Helper methods
  async getTagsCount(): Promise<number> {
    return await this.tagLinks().count()
  }

  async getAllTags(): Promise<string[]> {
    const count = await this.tagLinks().count()
    const tags: string[] = []

    for (let i = 0; i < count; i++) {
      const text = await this.tagLinks().nth(i).textContent()
      if (text) tags.push(text)
    }

    return tags
  }
}
