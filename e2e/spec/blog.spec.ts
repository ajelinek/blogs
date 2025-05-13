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
  await expect(blogPage.blogCards()).toHaveCount(2)
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
