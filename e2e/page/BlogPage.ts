import type { Page } from '@playwright/test'
import { BlogCardComponent } from './components/BlogCardComponent'
import { PageHeaderComponent } from './components/PageHeaderComponent'
import { TagFilterComponent } from './components/TagFilterComponent'
import { BlogPostComponent } from './components/BlogPostComponent'
import { RelatedPostsComponent } from './components/RelatedPostsComponent'

export class BlogPage {
  readonly header: PageHeaderComponent
  readonly tagFilter: TagFilterComponent
  readonly blogPost: BlogPostComponent
  readonly relatedPosts: RelatedPostsComponent

  constructor(readonly page: Page) {
    this.header = new PageHeaderComponent(page)
    this.tagFilter = new TagFilterComponent(page)
    this.blogPost = new BlogPostComponent(page)
    this.relatedPosts = new RelatedPostsComponent(page)
  }

  // Navigation
  goto = async () => {
    await this.page.goto('/jelly-time/blog')
  }

  gotoTag = async (tag: string) => {
    await this.page.goto(`/jelly-time/blog/tag/${tag}`)
  }

  // Page header delegations
  pageTitle = () => this.header.title()
  pageDescription = () => this.header.description()
  backLink = () => this.header.backLink()

  // Tag filter delegations
  tagLinks = () => this.tagFilter.tagLinks()
  tagLink = (tag: string) => this.tagFilter.tagLink(tag)

  // Post regions
  postsRegion = () =>
    this.page.getByRole('region', { name: 'Blog Posts' }) || this.page.getByRole('region', { name: 'Tag Posts' })

  // Blog cards
  blogCards = () => {
    // Check if we're on the tag page
    if (this.page.url().includes('/tag/')) {
      return this.page.locator('section[aria-label="Tag Posts"] li article')
    }
    // Default for blog listing page
    return this.postsRegion().getByRole('article', { name: 'Blog Post' })
  }

  getBlogCard = (index: number = 0) => {
    return new BlogCardComponent(this.blogCards().nth(index))
  }

  firstBlogCard = () => this.blogCards().first()
  blogCardTitle = (card: ReturnType<Page['locator']>) => card.getByRole('heading', { level: 2 })
  pagination = () => this.page.getByRole('region', { name: 'Pagination' })

  // Blog post delegations
  blogPostHeader = () => this.blogPost.title()
  blogPostMeta = () => this.blogPost.meta()
  blogPostContent = () => this.blogPost.content()
  readingTime = () => this.blogPost.readingTime()
  blogPostTags = () => this.blogPost.tags()

  // Add a method to get related posts section for backward compatibility
  relatedPostsSection = () => this.relatedPosts.section()

  // Actions
  clickFirstBlogPost = async () => {
    const card = this.getBlogCard()
    await card.click()
    // Wait for navigation to complete
    await this.page.waitForLoadState('networkidle')
  }

  clickTagLink = async (tag: string) => {
    await this.tagFilter.clickTag(tag)
  }

  clickBackLink = async () => {
    await this.header.clickBackLink()
  }
}
