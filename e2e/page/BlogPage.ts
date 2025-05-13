import type { Page } from '@playwright/test'

export class BlogPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/jelly-time/blog')
  }

  async gotoTag(tag: string) {
    await this.page.goto(`/jelly-time/blog/tag/${tag}`)
  }

  pageHeader() {
    return this.page.locator('.page-header')
  }

  pageTitle() {
    return this.pageHeader().locator('h1')
  }

  pageDescription() {
    return this.pageHeader().locator('p')
  }

  blogCards() {
    return this.page.locator('article[class*="blogCard"]')
  }

  firstBlogCard() {
    return this.blogCards().first()
  }

  blogCardTitle(card: any) {
    return card.locator('h2 a')
  }

  tagLinks() {
    return this.page.locator('div[class*="tags"] a')
  }

  tagLink(tag: string) {
    return this.page.getByText(tag, { exact: true })
  }

  backLink() {
    return this.page.locator('.back-link')
  }

  blogPostContent() {
    return this.page.locator('div[class*="content"]')
  }

  blogPostHeader() {
    return this.page.locator('article header h1').first()
  }

  blogPostMeta() {
    return this.page.locator('div[class*="meta"]')
  }

  readingTime() {
    return this.page.locator('.reading-time')
  }

  relatedPosts() {
    return this.page.locator('.related-posts')
  }

  async clickFirstBlogPost() {
    await this.blogCardTitle(this.firstBlogCard()).click()
  }

  async clickTagLink(tag: string) {
    await this.tagLink(tag).first().click()
  }

  async clickBackLink() {
    await this.backLink().click()
  }
}
