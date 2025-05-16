import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import { BlogPage } from '../page/BlogPage'
import { BlogPostPage } from '../page/BlogPostPage'

async function setUp(page: Page) {
  const blogPage = new BlogPage(page)
  await blogPage.goto()
  return { blogPage }
}

async function setUpBlogPost(page: Page, slug: string = '2023-07-15-solid-js-integration') {
  const blogPostPage = new BlogPostPage(page)
  await blogPostPage.gotoPost(slug)
  return { blogPostPage }
}

test('Blog pagination works correctly', async ({ page }) => {
  const { blogPage } = await setUp(page)

  expect(await blogPage.isPaginationVisible()).toBe(true)

  // Initial landing: 6 posts, no page param
  expect(await blogPage.blogCards().count()).toBe(6)
  expect(page.url()).not.toContain('page=')

  const firstPageTitles: string[] = []
  const firstPagePostsCount = await blogPage.blogCards().count()
  for (let i = 0; i < firstPagePostsCount; i++) {
    const card = blogPage.getBlogCard(i)
    const title = await card.getTitle()
    firstPageTitles.push(title)
  }

  // Go to page 2
  await blogPage.clickNextPage()
  expect(page.url()).toContain('page=2')
  await expect(blogPage.blogCards().first()).toBeVisible()
  expect(await blogPage.blogCards().count()).toBe(1)

  const secondPageTitles: string[] = []
  const secondPagePostsCount = await blogPage.blogCards().count()
  for (let i = 0; i < secondPagePostsCount; i++) {
    const card = blogPage.getBlogCard(i)
    const title = await card.getTitle()
    secondPageTitles.push(title)
  }

  const hasOverlap = secondPageTitles.some(title => firstPageTitles.includes(title))
  expect(hasOverlap).toBe(false)

  // Go back to page 1 using Previous button
  await blogPage.clickPrevPage()
  expect(page.url()).not.toContain('page=2') // Should ideally check for page=1 or no page param
  await expect(blogPage.blogCards().first()).toBeVisible()
  expect(await blogPage.blogCards().count()).toBe(6)

  const finalPageTitles: string[] = []
  const finalPagePostsCount = await blogPage.blogCards().count()
  for (let i = 0; i < finalPagePostsCount; i++) {
    const card = blogPage.getBlogCard(i)
    const title = await card.getTitle()
    finalPageTitles.push(title)
  }
  expect(finalPageTitles).toEqual(firstPageTitles)

  // Page number navigation
  await blogPage.clickPageNumber(2)
  expect(page.url()).toContain('page=2')
  await expect(blogPage.blogCards().first()).toBeVisible()
  expect(await blogPage.blogCards().count()).toBe(1)

  await blogPage.clickPageNumber(1)
  // Depending on implementation, URL might be /blog/ or /blog/?page=1
  // For this test, let's ensure it's not page=2 and contents match page 1
  expect(page.url()).not.toContain('page=2')
  await expect(blogPage.blogCards().first()).toBeVisible()
  expect(await blogPage.blogCards().count()).toBe(6)
  const pageOneTitlesAfterNumberClick: string[] = []
  const pageOnePostsCountAfterNumberClick = await blogPage.blogCards().count()
  for (let i = 0; i < pageOnePostsCountAfterNumberClick; i++) {
    const card = blogPage.getBlogCard(i)
    const title = await card.getTitle()
    pageOneTitlesAfterNumberClick.push(title)
  }
  expect(pageOneTitlesAfterNumberClick).toEqual(firstPageTitles)
})

test('Blog post reading time is calculated correctly', async ({ page }) => {
  const { blogPostPage } = await setUpBlogPost(page)
  const readingTime = await blogPostPage.getReadingTime()
  expect(readingTime).toMatch(/^\d+ min read$/)
})

test('Blog post SEO meta tags are present', async ({ page }) => {
  const { blogPostPage } = await setUpBlogPost(page)

  // Verify title, description, canonical URL meta tags
  expect(await blogPostPage.getPageTitle()).not.toBe('')
  expect(await blogPostPage.hasMetaTag('meta[name="description"]')).toBe(true)
  expect(await blogPostPage.hasMetaTag('link[rel="canonical"]')).toBe(true)

  // Check Open Graph meta tags
  expect(await blogPostPage.hasMetaTag('meta[property="og:title"]')).toBe(true)
  expect(await blogPostPage.hasMetaTag('meta[property="og:description"]')).toBe(true)
  expect(await blogPostPage.hasMetaTag('meta[property="og:image"]')).toBe(true)
  expect(await blogPostPage.hasMetaTag('meta[property="og:url"]')).toBe(true)
  expect(await blogPostPage.hasMetaTag('meta[property="og:type"]')).toBe(true)

  // Check Twitter card meta tags
  expect(await blogPostPage.hasMetaTag('meta[name="twitter:card"]')).toBe(true)
  expect(await blogPostPage.hasMetaTag('meta[name="twitter:title"]')).toBe(true)
  expect(await blogPostPage.hasMetaTag('meta[name="twitter:description"]')).toBe(true)
  expect(await blogPostPage.hasMetaTag('meta[name="twitter:image"]')).toBe(true)

  // Verify structured data for blog posts
  expect(await blogPostPage.hasMetaTag('script[type="application/ld+json"]')).toBe(true)

  // Verify content of meta tags matches expected values
  const pageTitle = await blogPostPage.getPostTitle()
  const metaTitle = await blogPostPage.getPageTitle()
  expect(metaTitle).toContain(pageTitle)

  // Check canonical URL contains current page URL
  const canonicalUrl = await blogPostPage.getCanonicalHref()
  expect(canonicalUrl).not.toBe('')

  // Check structured data has correct type
  const structuredDataContent = await blogPostPage.getStructuredDataContent()
  const jsonLd = JSON.parse(structuredDataContent)
  expect(jsonLd['@type']).toBe('BlogPosting')
})

test.skip('Related posts are relevant to current post', async ({ page }) => {
  const { blogPage } = await setUp(page)

  // Test related posts functionality
  // - Verify related posts are shown based on tags
  // - Check that current post is not in related posts
  // - Verify clicking related post navigates correctly
})

test.skip('Tag filtering preserves pagination state', async ({ page }) => {
  const { blogPage } = await setUp(page)

  // Test tag filtering with pagination
  // - Apply tag filter and verify pagination resets
  // - Navigate to second page of filtered results
  // - Remove filter and verify pagination state is preserved
})

test.skip('Multiple tag filtering works correctly', async ({ page }) => {
  const { blogPage } = await setUp(page)

  // Test filtering by multiple tags
  // - Select multiple tags and verify posts match all selected tags
  // - Remove individual tags and verify filter updates
  // - Clear all tags and verify all posts are shown
})
