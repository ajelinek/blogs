import type { Locator, Page } from '@playwright/test'

export class BlogPostComponent {
  constructor(private page: Page) {}

  // Locators
  article = () => this.page.getByRole('article', { name: 'Blog Post' })
  header = () => this.article().locator('header')
  title = () => this.header().locator('h1')
  meta = () => this.header().locator('.meta')
  readingTime = () => this.meta().locator('.reading-time')
  date = () => this.meta().locator('.date')
  author = () => this.header().locator('.author')
  description = () => this.header().locator('.description')
  tags = () => this.header().locator('.tags a')
  content = () => this.article().getByLabel('Post Content')
  featuredImage = () => this.article().locator('.featured-image img')

  // Mermaid diagram locators
  mermaidDiagrams = () => this.content().locator('.mermaid')
  mermaidSvgs = () => this.content().locator('.mermaid svg')

  // Helper methods
  async getTitle(): Promise<string> {
    return (await this.title().textContent()) || ''
  }

  async getReadingTime(): Promise<string> {
    return (await this.readingTime().textContent()) || ''
  }

  async getTagsCount(): Promise<number> {
    return await this.tags().count()
  }

  async getMermaidDiagramsCount(): Promise<number> {
    return await this.mermaidDiagrams().count()
  }

  async getMermaidSvgsCount(): Promise<number> {
    return await this.mermaidSvgs().count()
  }

  // Actions
  async clickTag(tagName: string) {
    await this.tags().filter({ hasText: tagName }).click()
  }
}
