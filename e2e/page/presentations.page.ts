import { type Page } from '@playwright/test'

export class PresentationsPage {
  constructor(page: Page) {
    this.page = page
  }

  private readonly page: Page

  // List view locators
  mainHeading = () => this.page.getByRole('heading', { name: 'Presentations', level: 1 })
  presentationListItem = (name: string) => this.page.getByRole('listitem').filter({ hasText: name })

  // Detail view locators
  presentationTitle = () => this.page.getByRole('heading', { level: 1 })
  slides = () => this.page.getByRole('region', { name: /slide/i })
  slideContent = (index: number) => this.slides().nth(index).getByRole('region', { name: 'slide content' })
  slideByIndex = (index: number) => this.slides().nth(index)

  // For nested slides, looking for regions with appropriate nesting context
  nestedSlides = (parentIndex: number) => this.slideByIndex(parentIndex).getByRole('region', { name: /nested slide/i })
  nestedSlideByIndex = (parentIndex: number, childIndex: number) => this.nestedSlides(parentIndex).nth(childIndex)

  // Actions
  async goto(path = '/jelly-time/presentations'): Promise<void> {
    await this.page.goto(path)
  }

  async gotoPresentation(slug: string): Promise<void> {
    await this.page.goto(`/jelly-time/presentations/${slug}`)
  }

  async getSlideCount(): Promise<number> {
    return await this.slides().count()
  }

  async getNestedSlideCount(parentIndex: number): Promise<number> {
    return await this.nestedSlides(parentIndex).count()
  }

  async clickPresentation(name: string): Promise<void> {
    await this.presentationListItem(name).click()
  }
}
