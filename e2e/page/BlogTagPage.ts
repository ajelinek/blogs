import type { Page } from '@playwright/test'
import { BlogPage } from './BlogPage'
import { PageHeaderComponent } from './components/PageHeaderComponent'

export class BlogTagPage extends BlogPage {
  readonly tagHeader: PageHeaderComponent

  constructor(page: Page) {
    super(page)
    this.tagHeader = new PageHeaderComponent(page)
  }

  gotoTagPage = async (tag: string) => {
    await this.page.goto(`/jelly-time/blog/tag/${tag}`)
  }

  // Specialized locators for tag page
  tagPostsSection = () => this.page.locator('section[aria-label="Tag Posts"]')
  postsList = () => this.tagPostsSection().getByRole('list')
  postItems = () => this.postsList().getByRole('listitem')

  // Override blog cards to use the correct locator for tag pages
  blogCards = () => this.postItems().locator('article')

  // Helper methods
  async getTagName(): Promise<string> {
    return await this.tagHeader.getTitleText()
  }

  async getPostsCount(): Promise<number> {
    return await this.blogCards().count()
  }

  async hasBackLink(): Promise<boolean> {
    return await this.tagHeader.isBackLinkVisible()
  }

  // Actions
  async navigateBackToBlog() {
    await this.clickBackLink()
    await this.page.waitForURL('/jelly-time/blog')
  }
}
