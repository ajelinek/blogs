import { test, expect, type Page } from '@playwright/test'
import { PresentationsPage } from '../page/presentations.page'

async function setUp(page: Page, slug = 'sample-presentation') {
  const presentationsPage = new PresentationsPage(page)
  await presentationsPage.gotoPresentation(slug)
  return { presentationsPage }
}

test('parser correctly identifies slide blocks from sample MDX content', async ({ page }) => {
  const { presentationsPage } = await setUp(page)

  // Verify there are multiple slides identified from the MDX content
  const slideCount = await presentationsPage.getSlideCount()
  expect(slideCount).toBeGreaterThan(0)

  // Once a slide is found, verify its content is visible
  if (slideCount > 0) {
    const firstSlide = presentationsPage.slideById('S1') // Assuming S1 is a known top-level slide ID
    await expect(firstSlide).toBeVisible()
    const firstSlideContent = presentationsPage.slideContentById('S1')
    await expect(firstSlideContent).toBeVisible()
    expect(await firstSlideContent.textContent()).not.toBeNull()
  }
})

test('parser correctly identifies nested slide structures', async ({ page }) => {
  const presentationsPage = new PresentationsPage(page)
  await presentationsPage.gotoPresentation('sample-presentation') // sample-presentation has nested slides like S1.1

  // Define the ID of a known parent slide from sample-presentation.mdx
  // S3 is "## Slide with Nested Content" and has children S3.1 and S3.2
  const parentSlideId = 'S3'

  // Verify the parent slide itself is visible
  const parentSlide = presentationsPage.slideById(parentSlideId)
  await expect(parentSlide).toBeVisible()
  expect(await presentationsPage.slideContentById(parentSlideId).textContent()).toContain('Slide with Nested Content')

  // Verify that there are child slides for this parent
  const childSlideCount = await presentationsPage.countChildSlidesOf(parentSlideId)
  expect(childSlideCount).toBeGreaterThan(0)
  expect(childSlideCount).toEqual(2) // S3 should have S3.1 and S3.2

  // Verify a specific known child slide content is visible (e.g., S3.1)
  if (childSlideCount > 0) {
    const firstChildId = `${parentSlideId}.1` // Construct ID like "S3.1"
    const firstChildSlide = presentationsPage.slideById(firstChildId)
    await expect(firstChildSlide).toBeVisible()
    const firstChildContent = presentationsPage.slideContentById(firstChildId)
    await expect(firstChildContent).toBeVisible()
    expect(await firstChildContent.textContent()).toContain('Nested Slide 1') // Check for specific content
  }
})

test("presentation with multiple slides renders each slide's content separately", async ({ page }) => {
  const presentationsPage = new PresentationsPage(page)
  await presentationsPage.gotoPresentation('sample-presentation')

  const slideCount = await presentationsPage.getSlideCount()
  expect(slideCount).toBeGreaterThan(1) // Make sure there are at least two slides to compare

  const allSlideIds = []
  for (let i = 0; i < slideCount; i++) {
    const slideLocator = presentationsPage.slides().nth(i) // Keep using generic .slides().nth(i) for iteration
    const slideId = await slideLocator.getAttribute('data-slide-id')
    if (slideId) allSlideIds.push(slideId)
  }
  // Sort IDs to ensure consistent comparison order, S1, S1.1, S1.2, S2 etc.
  allSlideIds.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

  // Compare content of adjacent slides in the sorted list
  for (let i = 0; i < allSlideIds.length - 1; i++) {
    const currentSlideId = allSlideIds[i]
    const nextSlideId = allSlideIds[i + 1]

    const currentSlideText = await presentationsPage.slideContentById(currentSlideId).textContent()
    const nextSlideText = await presentationsPage.slideContentById(nextSlideId).textContent()

    // Allow for empty content, but if both have content, it should differ
    if (currentSlideText?.trim() && nextSlideText?.trim()) {
      expect(currentSlideText).not.toEqual(nextSlideText)
    }
  }
})
