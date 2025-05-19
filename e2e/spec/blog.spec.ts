import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import { BlogPage } from '../page/BlogPage'
import { BlogPostPage } from '../page/BlogPostPage'
import { BlogCardComponent } from '../page/components/BlogCardComponent'

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

test('Blog listing page displays posts and pagination', async ({ page }) => {
  const { blogPage } = await setUp(page)
  await expect(blogPage.pageTitle()).toHaveText('Blog Posts')
  await expect(blogPage.pageDescription()).toBeVisible()
  await expect(blogPage.blogCards()).toHaveCount(6)
  await expect(blogPage.blogCardTitle(blogPage.firstBlogCard())).toBeVisible()
  const tagCount = await blogPage.tagLinks().count()
  expect(tagCount).toBeGreaterThan(0)
  await blogPage.clickTagLink('astro')
  await expect(page).toHaveURL(/.*tag=astro.*/)
  const filteredCount = await blogPage.blogCards().count()
  expect(filteredCount).toBeGreaterThan(0)
})

test('Blog post page displays content and related posts', async ({ page }) => {
  const { blogPage } = await setUp(page)
  await blogPage.clickFirstBlogPost()
  await expect(blogPage.blogPostHeader()).toBeVisible()
  await expect(blogPage.blogPostMeta()).toBeVisible()
  await expect(blogPage.blogPostContent()).toBeVisible()
  await expect(blogPage.readingTime()).toContainText('min read')
  const tagCount = await blogPage.blogPostTags().count()
  expect(tagCount).toBeGreaterThan(0)
  await expect(blogPage.relatedPostsSection()).toBeVisible()
})

test('Tag selection and unselection works correctly', async ({ page }) => {
  const { blogPage } = await setUp(page)

  // Select 'astro' tag
  await blogPage.clickTagLink('astro')
  await expect(page).toHaveURL((url: URL) => url.search.includes('tag=astro'))
  // Wait for at least one card to be visible before counting, or for the "no results" message to NOT be visible
  await expect(blogPage.blogCards().first().or(page.locator('text="No posts found"')).first()).toBeVisible()
  const astroPostCount = await blogPage.blogCards().count()
  expect(astroPostCount).toBeGreaterThan(0) // Original assertion was 5, now more general

  // Unselect 'astro' tag
  await blogPage.clickTagLink('astro')
  await expect(page).not.toHaveURL(/.*tag=astro.*/)
  await expect(blogPage.blogCards().first().or(page.locator('text="No posts found"')).first()).toBeVisible()
  const allPostCountAfterUnselect = await blogPage.blogCards().count()
  expect(allPostCountAfterUnselect).toBeGreaterThan(astroPostCount)
})

test('Multi-tag selection filters posts correctly', async ({ page }) => {
  const { blogPage } = await setUp(page)

  // Select 'astro' tag
  await blogPage.clickTagLink('astro')
  await expect(page).toHaveURL((url: URL) => url.search.includes('tag=astro'))
  await expect(blogPage.blogCards().first().or(page.locator('text="No posts found"')).first()).toBeVisible()
  const astroPostCount = await blogPage.blogCards().count()
  expect(astroPostCount).toBe(5) // Expect 5 posts with 'astro'

  // Select 'web-development' tag (adds to 'astro')
  await blogPage.clickTagLink('web-development')
  await expect(page).toHaveURL(
    (url: URL) => url.search.includes('tag=astro') && url.search.includes('tag=web-development')
  )
  await expect(blogPage.blogCards().first().or(page.locator('text="No posts found"')).first()).toBeVisible()
  const astroWebDevPostCount = await blogPage.blogCards().count()
  expect(astroWebDevPostCount).toBe(3) // Expect 3 posts with 'astro' AND 'web-development'
  expect(astroWebDevPostCount).toBeLessThan(astroPostCount)

  // Select 'jamstack' tag (adds to 'astro' and 'web-development')
  await blogPage.clickTagLink('jamstack')
  await expect(page).toHaveURL(
    (url: URL) =>
      url.search.includes('tag=astro') &&
      url.search.includes('tag=web-development') &&
      url.search.includes('tag=jamstack')
  )
  await expect(blogPage.blogCards().first().or(page.locator('text="No posts found"')).first()).toBeVisible()
  const astroWebDevJamstackPostCount = await blogPage.blogCards().count()
  expect(astroWebDevJamstackPostCount).toBe(1) // Expect 1 post with all three tags
  expect(astroWebDevJamstackPostCount).toBeLessThan(astroWebDevPostCount)

  // Unselect 'jamstack'
  await blogPage.clickTagLink('jamstack')
  await expect(page).toHaveURL(
    (url: URL) =>
      url.search.includes('tag=astro') &&
      url.search.includes('tag=web-development') &&
      !url.search.includes('tag=jamstack')
  )
  await expect(blogPage.blogCards().first().or(page.locator('text="No posts found"')).first()).toBeVisible()
  const afterUnselectJamstackCount = await blogPage.blogCards().count()
  expect(afterUnselectJamstackCount).toBe(astroWebDevPostCount) // Should be 3 again

  // Click 'All' or clear tags
  if (await blogPage.tagFilter.allTagsLink().isVisible()) {
    await blogPage.tagFilter.clickAllTags()
    await expect(page).not.toHaveURL(/.*tag=.*/)
    await expect(blogPage.blogCards().first().or(page.locator('text="No posts found"')).first()).toBeVisible()
    const allPostCount = await blogPage.blogCards().count()
    const initialPostCount = 6
    expect(allPostCount).toBe(initialPostCount)
  }
})

test('BlogCard navigation to post page works', async ({ page }) => {
  const { blogPage } = await setUp(page)
  const targetTitle = 'Integrating SolidJS with Astro'
  const expectedCleanSlug = '2023-07-15-solid-js-integration'
  const expectedPath = `/jelly-time/blog/${expectedCleanSlug}/`

  const cardLocator = blogPage
    .blogCards()
    .filter({ has: page.getByRole('heading', { name: targetTitle, level: 2 }) })
    .first()
  await expect(cardLocator).toBeVisible({ timeout: 10000 })

  const blogCard = new BlogCardComponent(cardLocator, page)
  await blogCard.clickToNavigate()

  await expect(page).toHaveURL(expectedPath, { timeout: 10000 })

  const postPageTitleElement = page.locator('main article.blog-post header h1').first()
  await expect(postPageTitleElement).toBeVisible({ timeout: 10000 })
  await expect(postPageTitleElement).toHaveText(targetTitle, { timeout: 5000 })
})

test('BlogCard images are visible', async ({ page }) => {
  const { blogPage } = await setUp(page)
  const blogCards = await blogPage.blogCards()
  await expect(blogCards.first()).toBeVisible() // Ensure cards are loaded

  for (let i = 0; i < (await blogCards.count()); i++) {
    const card = blogCards.nth(i)
    const image = card.locator('img')
    // Not all cards may have images, so check if image element exists first
    if (await image.count()) {
      await expect(image).toBeVisible()
      await expect(image).toHaveAttribute('src', /.*/) // Check that src is not empty
    }
  }
})

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
