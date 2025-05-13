import type { Locator, Page } from '@playwright/test'

export class RelatedPostsComponent {
  constructor(private page: Page) {}

  // Locators
  section = () => this.page.locator('section.related-posts')
  title = () => this.section().getByRole('heading', { level: 2 })
  posts = () => this.section().locator('.related-post')
  postTitles = () => this.posts().getByRole('heading', { level: 3 })
  postLinks = () => this.postTitles().getByRole('link')

  // Actions
  async clickRelatedPost(index: number = 0) {
    await this.postLinks().nth(index).click()
  }

  // Helper methods
  async getPostsCount(): Promise<number> {
    return await this.posts().count()
  }

  async getPostTitle(index: number = 0): Promise<string> {
    return (await this.postTitles().nth(index).textContent()) || ''
  }

  async isVisible(): Promise<boolean> {
    return await this.section().isVisible()
  }
}
