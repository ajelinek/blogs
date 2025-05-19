import type { Page } from '@playwright/test'
import { BlogPage } from './BlogPage'
import { BlogPostComponent } from './components/BlogPostComponent'
import { RelatedPostsComponent } from './components/RelatedPostsComponent'

export class BlogPostPage extends BlogPage {
  readonly post: BlogPostComponent
  readonly related: RelatedPostsComponent

  constructor(page: Page) {
    super(page)
    this.post = new BlogPostComponent(page)
    this.related = new RelatedPostsComponent(page)
  }

  gotoPost = async (slug: string) => {
    await this.page.goto(`/jelly-time/blog/${slug}`)
    await this.page.waitForLoadState('networkidle')
  }

  // Post content locators
  postTitle = () => this.post.title()
  postMeta = () => this.post.meta()
  postContent = () => this.post.content()
  postReadingTime = () => this.post.readingTime()
  postTags = () => this.post.tags()

  // Related posts locators
  relatedPostsSection = () => this.related.section()
  relatedPostsList = () => this.related.posts()

  // Helper methods
  async getPostTitle(): Promise<string> {
    return await this.post.getTitle()
  }

  async getReadingTime(): Promise<string> {
    return await this.post.getReadingTime()
  }

  async getTagsCount(): Promise<number> {
    return await this.post.getTagsCount()
  }

  async hasRelatedPosts(): Promise<boolean> {
    return await this.related.isVisible()
  }

  // Actions
  async clickPostTag(tagName: string) {
    await this.post.clickTag(tagName)
  }

  async clickRelatedPost(index: number = 0) {
    await this.related.clickRelatedPost(index)
  }
}
