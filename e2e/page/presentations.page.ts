import { type Page, type Locator } from '@playwright/test'

export class PresentationsPage {
  constructor(page: Page) {
    this.page = page
  }

  private readonly page: Page

  // List view locators (for /presentations page)
  mainPresentationsListingHeading = () => this.page.getByRole('heading', { name: 'Presentations', level: 1 })
  presentationListItem = (name: string) => this.page.getByRole('listitem').filter({ hasText: name })

  // Detail view locators (for /presentation/[presentationSlug]/[slideSlug] or /index pages)
  presentationTitleOnSlidePage = () => this.page.getByRole('heading', { level: 1 })
  // Locates the currently displayed slide container on the page.
  // Since only one slide is displayed per page, this should find 0 or 1.
  currentSlideContainer = () => this.page.locator('div[data-slide-id]')
  // Gets the ID of the currently displayed slide.
  getCurrentSlideId = async (): Promise<string | null> => {
    return await this.currentSlideContainer().getAttribute('data-slide-id')
  }
  // Gets a locator for a slide if it's the one currently displayed on the page.
  slideById = (id: string) => this.page.locator(`div[data-slide-id="${id}"]`)
  // Gets the content area of the currently displayed slide.
  currentSlideContent = () => this.currentSlideContainer().locator('.slide-content')
  // Navigation links on a slide page
  prevSlideLink = () => this.page.getByRole('link', { name: /Previous/i })
  nextSlideLink = () => this.page.getByRole('link', { name: /Next/i })
  childSlideLink = () => this.page.getByRole('link', { name: /Child Slides/i })

  // Actions
  async gotoPresentationsList(path = '/jelly-time/presentations'): Promise<void> {
    await this.page.goto(path)
  }

  // Navigates to a presentation's root slide or a specific slide if slideId is provided.
  async gotoPresentationSlide(presentationSlug: string, slideId?: string): Promise<void> {
    const url = slideId
      ? `/jelly-time/presentation/${presentationSlug}/${slideId}`
      : `/jelly-time/presentation/${presentationSlug}/`
    await this.page.goto(url)
    await this.page.waitForLoadState('domcontentloaded') // Wait for page to load
  }

  async getDisplayedSlideCount(): Promise<number> {
    return await this.currentSlideContainer().count() // Should be 0 or 1
  }

  async clickPresentationOnListing(name: string): Promise<void> {
    await this.presentationListItem(name).click()
  }

  async clickNextSlide(): Promise<void> {
    await this.nextSlideLink().click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async clickPrevSlide(): Promise<void> {
    await this.prevSlideLink().click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async clickChildSlide(): Promise<void> {
    await this.childSlideLink().click()
    await this.page.waitForLoadState('domcontentloaded')
  }
}
