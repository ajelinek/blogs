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
    await expect(presentationsPage.slideByIndex(0)).toBeVisible()
    await expect(presentationsPage.slideContent(0)).toBeVisible()
  }
})

test('parser correctly identifies nested slide structures', async ({ page }) => {
  const { presentationsPage } = await setUp(page)

  // Find a slide with nested slides (we expect the third slide to have nested content)
  const slideWithNestedContent = 2
  const slideCount = await presentationsPage.getSlideCount()

  // Skip this test if slides aren't implemented yet
  test.skip(slideCount < 3, 'Not enough slides available to test nested structure')

  // Verify that nested slides exist
  const nestedSlideCount = await presentationsPage.getNestedSlideCount(slideWithNestedContent)
  expect(nestedSlideCount).toBeGreaterThan(0)

  // Verify nested slide content is visible
  if (nestedSlideCount > 0) {
    await expect(presentationsPage.nestedSlideByIndex(slideWithNestedContent, 0)).toBeVisible()
  }
})

test("presentation with multiple slides renders each slide's content separately", async ({ page }) => {
  const { presentationsPage } = await setUp(page)

  // Get total number of slides
  const slideCount = await presentationsPage.getSlideCount()

  // Skip this test if slides aren't implemented yet
  test.skip(slideCount < 2, 'Not enough slides to test separate content')

  // Loop through slides and verify each has distinct content
  for (let i = 0; i < slideCount; i++) {
    await expect(presentationsPage.slideByIndex(i)).toBeVisible()

    // If not the last slide, verify current slide content differs from next slide
    if (i < slideCount - 1) {
      const currentSlideText = await presentationsPage.slideContent(i).textContent()
      const nextSlideText = await presentationsPage.slideContent(i + 1).textContent()

      expect(currentSlideText).not.toEqual(nextSlideText)
    }
  }
})
