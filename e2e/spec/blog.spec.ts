import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import { BlogPage } from '../page/BlogPage'

async function setUp(page: Page) {
  const blogPage = new BlogPage(page)
  await blogPage.goto()
  return { blogPage }
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

test('Tag page displays filtered posts', async ({ page }) => {
  const blogPage = new BlogPage(page)
  await blogPage.gotoTag('astro')
  await expect(blogPage.pageTitle()).toHaveText('astro')
  await expect(blogPage.pageDescription()).toBeVisible()
  await expect(blogPage.backLink()).toBeVisible()
  const postCount = await blogPage.blogCards().count()
  expect(postCount).toBeGreaterThan(0)
  await blogPage.clickBackLink()
  await expect(page).toHaveURL('/jelly-time/blog')
})

test('Tag selection and unselection works correctly', async ({ page }) => {
  const { blogPage } = await setUp(page)

  // Select 'astro' tag
  await blogPage.clickTagLink('astro', 5)
  await expect(page).toHaveURL((url: URL) => url.search.includes('tag=astro'))
  const astroPostCount = await blogPage.blogCards().count()
  expect(astroPostCount).toBeGreaterThan(0)

  // Unselect 'astro' tag (assuming clicking again unselects, or a clear/all button handles this)
  // For now, let's assume clicking the same tag unselects it and updates the URL by removing the tag.
  // This part of the test might need adjustment based on the actual unselect behavior.
  await blogPage.clickTagLink('astro', 6) // After unselecting, expect initial page count (6)
  await expect(page).not.toHaveURL(/.*tag=astro.*/)
  const allPostCountAfterUnselect = await blogPage.blogCards().count()
  expect(allPostCountAfterUnselect).toBeGreaterThan(astroPostCount) // Or check against initial total if known
})

test('Multi-tag selection filters posts correctly', async ({ page }) => {
  const { blogPage } = await setUp(page)

  // Select 'astro' tag
  await blogPage.clickTagLink('astro', 5)
  await expect(page).toHaveURL((url: URL) => url.search.includes('tag=astro')) // Simpler URL check for single tag
  const astroPostCount = await blogPage.blogCards().count()
  expect(astroPostCount).toBe(5) // Expect 5 posts with 'astro'

  // Select 'web-development' tag (adds to 'astro')
  await blogPage.clickTagLink('web-development', 3)
  await expect(page).toHaveURL(
    (url: URL) => url.search.includes('tag=astro') && url.search.includes('tag=web-development')
  )
  const astroWebDevPostCount = await blogPage.blogCards().count()
  expect(astroWebDevPostCount).toBe(3) // Expect 3 posts with 'astro' AND 'web-development'
  expect(astroWebDevPostCount).toBeLessThan(astroPostCount)

  // Select 'jamstack' tag (adds to 'astro' and 'web-development')
  await blogPage.clickTagLink('jamstack', 1)
  await expect(page).toHaveURL(
    (url: URL) =>
      url.search.includes('tag=astro') &&
      url.search.includes('tag=web-development') &&
      url.search.includes('tag=jamstack')
  )
  const astroWebDevJamstackPostCount = await blogPage.blogCards().count()
  expect(astroWebDevJamstackPostCount).toBe(1) // Expect 1 post with all three tags
  expect(astroWebDevJamstackPostCount).toBeLessThan(astroWebDevPostCount)

  // Unselect 'jamstack'
  await blogPage.clickTagLink('jamstack', 3)
  await expect(page).toHaveURL(
    (url: URL) =>
      url.search.includes('tag=astro') &&
      url.search.includes('tag=web-development') &&
      !url.search.includes('tag=jamstack')
  )
  const afterUnselectJamstackCount = await blogPage.blogCards().count()
  expect(afterUnselectJamstackCount).toBe(astroWebDevPostCount) // Should be 3 again

  // Click 'All' or clear tags
  if (await blogPage.tagFilter.allTagsLink().isVisible()) {
    await blogPage.tagFilter.clickAllTags()
    await expect(page).not.toHaveURL(/.*tag=.*/)
    const allPostCount = await blogPage.blogCards().count()
    const initialPostCount = 6 // Or fetch this dynamically at the start of the test if more robust
    expect(allPostCount).toBe(initialPostCount)
  }
})
