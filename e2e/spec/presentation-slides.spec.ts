import { test, expect, type Page } from '@playwright/test'
import { PresentationsPage } from '../page/presentations.page'

const PRESENTATION_SLUG = 'sample-presentation'
const BASE_PATH_PREFIX = '/jelly-time/presentation'

interface SlideMeta {
  content: string
  prev: string | null
  next: string | null
  child?: string | null // Added for clarity if testing child link directly
}

const SLIDES_INFO: Record<string, SlideMeta> = {
  S1: { content: 'Welcome to Sample Presentation', prev: null, next: 'S2' },
  S2: { content: 'Second Slide', prev: 'S1', next: 'S3' },
  S3: { content: 'Slide with Nested Content', prev: 'S2', next: 'S4', child: 'S3.1' }, // next updated to S4, child is S3.1
  'S3.1': { content: 'Nested Slide 1', prev: 'S3', next: 'S3.2' }, // prev should point to parent S3
  'S3.2': { content: 'Nested Slide 2', prev: 'S3.1', next: null }, // Actual next for S3.2 (as a sibling) is null, true next in sequence is S4 via parent S3
  S4: { content: 'Final Slide', prev: 'S3', next: null },
}

test.describe('Presentation Slide Navigation and Content', () => {
  let presentationsPage: PresentationsPage

  test.beforeEach(async ({ page }) => {
    presentationsPage = new PresentationsPage(page)
  })

  test('root slide of presentation is rendered correctly', async ({ page }) => {
    await presentationsPage.gotoPresentationSlide(PRESENTATION_SLUG) // Navigates to .../sample-presentation/

    await expect(presentationsPage.slideById('S1')).toBeVisible()
    await expect(presentationsPage.currentSlideContent()).toContainText(SLIDES_INFO.S1.content)
    await expect(presentationsPage.prevSlideLink()).not.toBeVisible() // Root has no prev
    const nextLinkS1 = presentationsPage.nextSlideLink()
    await expect(nextLinkS1).toBeVisible()
    await expect(nextLinkS1).toHaveAttribute('href', `${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/${SLIDES_INFO.S1.next}`)
  })

  test('can navigate to a specific slide and see its content and nav links', async ({ page }) => {
    const slideIdToTest = 'S3'
    const slideInfo = SLIDES_INFO[slideIdToTest]
    await presentationsPage.gotoPresentationSlide(PRESENTATION_SLUG, slideIdToTest)

    await expect(presentationsPage.slideById(slideIdToTest)).toBeVisible()
    await expect(presentationsPage.currentSlideContent()).toContainText(slideInfo.content)

    const prevLink = presentationsPage.prevSlideLink()
    await expect(prevLink).toBeVisible()
    let expectedPrevHrefS3: string
    if (slideInfo.prev === 'S1') {
      // S1 is the root slide, links to presentation root
      expectedPrevHrefS3 = `${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/`
    } else {
      expectedPrevHrefS3 = `${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/${slideInfo.prev}`
    }
    await expect(prevLink).toHaveAttribute('href', expectedPrevHrefS3)

    const nextLink = presentationsPage.nextSlideLink()
    await expect(nextLink).toBeVisible()
    await expect(nextLink).toHaveAttribute('href', `${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/${slideInfo.next}`)
  })

  test('navigating to a nested slide directly shows correct content and nav', async ({ page }) => {
    const slideIdToTest = 'S3.1'
    const slideInfo = SLIDES_INFO[slideIdToTest]
    await presentationsPage.gotoPresentationSlide(PRESENTATION_SLUG, slideIdToTest)

    await expect(presentationsPage.slideById(slideIdToTest)).toBeVisible()
    await expect(presentationsPage.currentSlideContent()).toContainText(slideInfo.content)

    const prevLink = presentationsPage.prevSlideLink()
    await expect(prevLink).toBeVisible()
    let expectedPrevHrefS31: string
    if (slideInfo.prev === 'S1') {
      // S1 is the root slide, links to presentation root
      expectedPrevHrefS31 = `${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/`
    } else {
      expectedPrevHrefS31 = `${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/${slideInfo.prev}`
    }
    await expect(prevLink).toHaveAttribute('href', expectedPrevHrefS31)

    const nextLink = presentationsPage.nextSlideLink()
    await expect(nextLink).toBeVisible()
    await expect(nextLink).toHaveAttribute('href', `${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/${slideInfo.next}`)
  })

  test('can navigate through a sequence of slides using prev/next links', async ({ page }) => {
    await presentationsPage.gotoPresentationSlide(PRESENTATION_SLUG) // Start at root (S1)

    // S1 -> S2
    await expect(presentationsPage.slideById('S1')).toBeVisible()
    await presentationsPage.clickNextSlide()
    await expect(page).toHaveURL(`${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/S2`)
    await expect(presentationsPage.slideById('S2')).toBeVisible()
    await expect(presentationsPage.currentSlideContent()).toContainText(SLIDES_INFO.S2.content)

    // S2 -> S3
    await presentationsPage.clickNextSlide()
    await expect(page).toHaveURL(`${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/S3`)
    await expect(presentationsPage.slideById('S3')).toBeVisible()
    await expect(presentationsPage.currentSlideContent()).toContainText(SLIDES_INFO.S3.content)

    // S3 -> S3.1 (using child link)
    await presentationsPage.clickChildSlide() // Changed from clickNextSlide()
    await expect(page).toHaveURL(`${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/S3.1`)
    await expect(presentationsPage.slideById('S3.1')).toBeVisible()
    await expect(presentationsPage.currentSlideContent()).toContainText(SLIDES_INFO['S3.1'].content)

    // S3.1 -> S3.2 (using next link, as S3.1 and S3.2 are siblings)
    await presentationsPage.clickNextSlide()
    await expect(page).toHaveURL(`${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/S3.2`)
    await expect(presentationsPage.slideById('S3.2')).toBeVisible()
    await expect(presentationsPage.currentSlideContent()).toContainText(SLIDES_INFO['S3.2'].content)

    // S3.2 -> S3 (Previous - S3.2's prevId is S3.1, then S3.1's effective prev is S3(parent) )
    // The prevLink logic in [...slide].astro handles this: S3.2 -> S3.1, then S3.1 -> S3.
    await presentationsPage.clickPrevSlide() // Navigates from S3.2 to S3.1
    await expect(page).toHaveURL(`${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/S3.1`)
    await expect(presentationsPage.slideById('S3.1')).toBeVisible()

    await presentationsPage.clickPrevSlide() // Navigates from S3.1 to S3 (parent)
    await expect(page).toHaveURL(`${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/S3`)
    await expect(presentationsPage.slideById('S3')).toBeVisible()

    // S3 -> S2 (Previous)
    await presentationsPage.clickPrevSlide()
    await expect(page).toHaveURL(`${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/S2`)
    await expect(presentationsPage.slideById('S2')).toBeVisible()

    // S2 -> S1 (Previous - root)
    await presentationsPage.clickPrevSlide()
    // Regex to match root path which might or might not have a trailing slash at the end of the URL's path part
    await expect(page).toHaveURL(new RegExp(`${BASE_PATH_PREFIX}/${PRESENTATION_SLUG}/?$`))
    await expect(presentationsPage.slideById('S1')).toBeVisible()
  })

  test('last slide has no next link, first slide has no prev link', async ({ page }) => {
    // Last slide (S4)
    await presentationsPage.gotoPresentationSlide(PRESENTATION_SLUG, 'S4')
    await expect(presentationsPage.slideById('S4')).toBeVisible()
    await expect(presentationsPage.nextSlideLink()).not.toBeVisible()
    await expect(presentationsPage.prevSlideLink()).toBeVisible() // S4 has a prev (S3)

    // First slide (S1 - root)
    await presentationsPage.gotoPresentationSlide(PRESENTATION_SLUG)
    await expect(presentationsPage.slideById('S1')).toBeVisible()
    await expect(presentationsPage.prevSlideLink()).not.toBeVisible()
    await expect(presentationsPage.nextSlideLink()).toBeVisible()
  })
})
