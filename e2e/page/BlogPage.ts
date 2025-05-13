import type { Page } from '@playwright/test'

export class BlogPage {
  constructor(readonly page: Page) {}

  goto = async () => {
    await this.page.goto('/jelly-time/blog')
  }

  gotoTag = async (tag: string) => {
    await this.page.goto(`/jelly-time/blog/tag/${tag}`)
  }

  pageHeader = () => this.page.getByRole('region', { name: 'Blog Header' })
  pageTitle = () => this.pageHeader().getByRole('heading', { level: 1 })
  pageDescription = () => this.pageHeader().getByText('Technical articles and tutorials', { exact: true })
  tagFilter = () => this.page.getByRole('region', { name: 'Tag Filter' })
  tagLinks = () => this.tagFilter().getByRole('list').getByRole('link')
  tagLink = (tag: string) => this.tagFilter().getByRole('link', { name: tag })
  postsRegion = () => this.page.getByRole('region', { name: 'Blog Posts' })
  blogCards = () => this.postsRegion().getByRole('article', { name: 'Blog Post' })
  firstBlogCard = () => this.blogCards().first()
  blogCardTitle = (card: ReturnType<Page['locator']>) => card.getByRole('heading', { level: 2 })
  pagination = () => this.page.getByRole('region', { name: 'Pagination' })
  backLink = () => this.page.getByRole('link', { name: '← Back to all posts' })

  blogPost = () => this.page.getByRole('article', { name: 'Blog Post' })
  blogPostHeader = () => this.blogPost().getByRole('banner', { name: 'Post Header' }).getByRole('heading', { level: 1 })
  blogPostMeta = () => this.blogPost().getByRole('banner', { name: 'Post Header' }).getByLabel('Post Meta')
  blogPostContent = () => this.blogPost().getByLabel('Post Content')
  readingTime = () => this.blogPostMeta().getByText('min read')
  relatedPosts = () => this.page.getByRole('region', { name: 'Related Posts' })

  clickFirstBlogPost = async () => {
    await this.firstBlogCard().getByRole('heading', { level: 2 }).click()
  }

  clickTagLink = async (tag: string) => {
    await this.tagLink(tag).click()
  }

  clickBackLink = async () => {
    await this.backLink().click()
  }
}
