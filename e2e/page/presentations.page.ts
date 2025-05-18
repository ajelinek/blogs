import { type Page, type Locator } from '@playwright/test'

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
  slides = () => this.page.getByRole('region', { name: /slide/i }) // Generic selector for any slide
  slideById = (id: string) => this.page.locator(`[data-slide-id="${id}"]`)
  slideContentByLocator = (locator: Locator) => locator.getByRole('region', { name: 'slide content' })
  slideContentById = (id: string) => this.slideContentByLocator(this.slideById(id))
  // Get all slides that are children of a given parent ID (e.g., parentId "S1" -> finds "S1.1", "S1.2")
  childSlidesOf = (parentId: string) =>
    this.page.locator(`[data-slide-id^="${parentId}."]`).filter(
      // Ensure it's a direct child, not a grandchild (e.g. S1.1.1 for parent S1)
      { has: this.page.locator(`[data-slide-id^="${parentId}."]:not([data-slide-id*=".${parentId}."])`) }
    )

  // Actions
  async goto(path = '/jelly-time/presentations'): Promise<void> {
    await this.page.goto(path)
  }

  async gotoPresentation(slug: string): Promise<void> {
    await this.page.goto(`/jelly-time/presentations/${slug}`)
  }

  async getSlideCount(): Promise<number> {
    // Counts all elements with data-slide-id, as they are all rendered at the same DOM level now
    return await this.page.locator('[data-slide-id]').count()
  }

  async countChildSlidesOf(parentId: string): Promise<number> {
    // Filter to ensure we only count direct children.
    // Example: for parent S1, we want S1.1, S1.2, but not S1.1.1
    const children = this.page.locator(`[data-slide-id^="${parentId}."]`)
    let count = 0
    for (const child of await children.all()) {
      const childId = await child.getAttribute('data-slide-id')
      if (childId) {
        const parentPrefixLength = parentId.length + 1 // Length of "S1."
        if (childId.substring(parentPrefixLength).split('.').length === 1) {
          count++
        }
      }
    }
    return count
  }

  slideContentByIndex = (index: number) => this.slides().nth(index).getByRole('region', { name: 'slide content' })

  async clickPresentation(name: string): Promise<void> {
    await this.presentationListItem(name).click()
  }
}
