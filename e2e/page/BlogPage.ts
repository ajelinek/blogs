import type { Page } from '@playwright/test'
import { BlogCardComponent } from './components/BlogCardComponent'
import { PageHeaderComponent } from './components/PageHeaderComponent'
import { TagFilterComponent } from './components/TagFilterComponent'
import { BlogPostComponent } from './components/BlogPostComponent'
import { RelatedPostsComponent } from './components/RelatedPostsComponent'
import { BasePage } from './BasePage'

export class BlogPage extends BasePage {
  readonly header: PageHeaderComponent
  readonly tagFilter: TagFilterComponent
  readonly blogPost: BlogPostComponent
  readonly relatedPosts: RelatedPostsComponent

  constructor(readonly page: Page) {
    super(page)
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

  gotoPost = async (slug: string) => {
    await this.page.goto(`/jelly-time/blog/${slug}`)
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
    return new BlogCardComponent(this.blogCards().nth(index), this.page)
  }

  getBlogCardByTitle = (title: string) => {
    return new BlogCardComponent(
      this.blogCards()
        .filter({ has: this.page.getByRole('heading', { name: title, level: 2 }) })
        .first(),
      this.page
    )
  }

  firstBlogCard = () => this.blogCards().first()
  blogCardTitle = (card: ReturnType<Page['locator']>) => card.getByRole('heading', { level: 2 })
  pagination = () => this.page.getByRole('region', { name: 'Pagination' })

  paginationControls = () => this.pagination()
  paginationPrevButton = () => this.paginationControls().getByRole('link', { name: 'Previous' })
  paginationNextButton = () => this.paginationControls().getByRole('link', { name: 'Next' })
  paginationInfo = () =>
    this.paginationControls()
      .getByRole('paragraph')
      .filter({ hasText: /Current Page:/ })

  async clickNextPage(): Promise<void> {
    const nextButton = this.paginationNextButton()
    const isDisabled = await nextButton.evaluate(el => el.classList.contains('disabled')).catch(() => false)
    if (!isDisabled) {
      await nextButton.click()
      await this.page.waitForLoadState('networkidle')

      // Wait for URL to update
      await this.page.waitForURL(/.*page=\d+.*/)
      await this.postsRegion().getByRole('article').first().waitFor({ state: 'visible', timeout: 5000 })
    }
  }

  async clickPrevPage(): Promise<void> {
    const prevButton = this.paginationPrevButton()
    const isDisabled = await prevButton.evaluate(el => el.classList.contains('disabled')).catch(() => false)
    if (!isDisabled) {
      await prevButton.click()
      await this.page.waitForLoadState('networkidle')

      // Wait for URL to update
      const currentUrl = this.page.url()
      if (currentUrl.toString().includes('page=')) {
        await this.page.waitForURL(/.*page=\d+.*/)
      } else {
        await this.page.waitForURL(url => !url.toString().includes('page='))
      }
      await this.postsRegion().getByRole('article').first().waitFor({ state: 'visible', timeout: 5000 })
      // Wait a moment for the page to fully render
      await this.page.waitForTimeout(200)
    }
  }

  async clickPageNumber(pageNumber: number): Promise<void> {
    const pageLink = this.paginationControls().getByRole('link', { name: `${pageNumber}` })
    await pageLink.click()
    await this.page.waitForLoadState('networkidle')
    // Wait for URL to update, or to not contain 'page=' if it's page 1
    if (pageNumber === 1) {
      await this.page.waitForURL(url => !url.toString().includes('page=') || url.toString().includes('page=1'))
    } else {
      await this.page.waitForURL(new RegExp(`.*page=${pageNumber}.*`))
    }
    await this.postsRegion().getByRole('article').first().waitFor({ state: 'visible', timeout: 5000 })
    await this.page.waitForTimeout(200) // Wait for content to settle
  }

  async isPaginationVisible(): Promise<boolean> {
    try {
      // Wait for either button to be potentially visible before checking, timeout is short as one should appear quickly if pagination exists.
      await this.page.waitForFunction(
        () => {
          const nextButton = document.evaluate(
            "//a[normalize-space(.)='Next']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue
          const prevButton = document.evaluate(
            "//a[normalize-space(.)='Previous']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue
          return (
            (nextButton && (nextButton as HTMLElement).offsetParent !== null) ||
            (prevButton && (prevButton as HTMLElement).offsetParent !== null)
          )
        },
        { timeout: 3000 }
      )
    } catch (e) {
      // If timeout occurs, it means neither button became visible, so pagination is not visible.
      return false
    }
    const nextVisible = await this.paginationNextButton()
      .isVisible()
      .catch(() => false)
    const prevVisible = await this.paginationPrevButton()
      .isVisible()
      .catch(() => false)
    return nextVisible || prevVisible
  }

  // Blog post delegations
  blogPostHeader = () => this.blogPost.title()
  blogPostMeta = () => this.blogPost.meta()
  blogPostContent = () => this.blogPost.content()
  readingTime = () => this.blogPost.readingTime()
  blogPostTags = () => this.blogPost.tags()

  // Mermaid diagram delegations
  mermaidDiagrams = () => this.blogPost.mermaidDiagrams()
  mermaidSvgs = () => this.blogPost.mermaidSvgs()
  getMermaidDiagramsCount = async () => await this.blogPost.getMermaidDiagramsCount()
  getMermaidSvgsCount = async () => await this.blogPost.getMermaidSvgsCount()

  // Add a method to get related posts section for backward compatibility
  relatedPostsSection = () => this.relatedPosts.section()

  // Actions
  clickFirstBlogPost = async () => {
    // Navigate directly to a known blog post
    await this.gotoPost('2023-07-15-solid-js-integration')
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
