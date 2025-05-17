import { type Page } from '@playwright/test'

export class PresentationsPage {
  constructor(page: Page) {
    this.page = page
  }

  private readonly page: Page

  // Locators
  mainHeading = () => this.page.getByRole('heading', { name: 'Presentations', level: 1 })
  presentationListItem = (name: string) => this.page.getByRole('listitem', { name })

  // Actions
  async goto(): Promise<void> {
    await this.page.goto('/presentations')
  }
}
