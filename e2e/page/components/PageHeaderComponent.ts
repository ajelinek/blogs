import type { Locator, Page } from '@playwright/test'

export class PageHeaderComponent {
  constructor(
    private page: Page,
    private name: string = 'Blog Header'
  ) {}

  // Locators
  header = () => this.page.getByRole('region', { name: this.name })
  title = () => this.header().getByRole('heading', { level: 1 })
  description = () => this.header().getByText('Technical articles and tutorials', { exact: true })
  backLink = () => this.header().getByRole('link', { name: /Back to all posts/ })

  // Actions
  async clickBackLink() {
    await this.backLink().click()
  }

  // Helper methods
  async getTitleText(): Promise<string> {
    return (await this.title().textContent()) || ''
  }

  async isBackLinkVisible(): Promise<boolean> {
    return await this.backLink().isVisible()
  }
}
