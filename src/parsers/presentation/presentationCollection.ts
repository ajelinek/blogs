import { getCollection } from 'astro:content'
import { parseSlides, type SlideNode } from './presentationParser'

// Type for basic presentation metadata
export interface Presentation {
  slug: string
  title: string
  description: string
  author?: string
  date: Date
  url: string // URL to the first slide of the presentation
}

// Type for a presentation entry with its metadata and all parsed slides
export interface PresentationWithSlides extends Presentation {
  slideMap: Map<string, SlideNode>
}

/**
 * Gets all presentations with their basic metadata and URL to the first slide.
 * Does not parse the full slide content.
 * @returns Array of presentation objects
 */
export async function getPresentations(): Promise<Presentation[]> {
  const presentationEntries = await getCollection('presentations')
  const result: Presentation[] = []

  for (const presentationEntry of presentationEntries) {
    const { data, slug } = presentationEntry
    // The first slide is assumed to be 'S1' for URL generation
    const firstSlideUrl = `/jelly-time/presentation/${slug}/S1`

    result.push({
      slug,
      title: data.title,
      description: data.description,
      author: data.author,
      date: data.date,
      url: firstSlideUrl,
    })
  }

  return result
}

/**
 * Gets all presentations, parses their slides, and returns them with full slide data.
 * @returns Array of presentation objects with their slides
 */
export async function getPresentationsWithSlides(): Promise<PresentationWithSlides[]> {
  const presentationEntries = await getCollection('presentations')
  const result: PresentationWithSlides[] = []

  for (const presentationEntry of presentationEntries) {
    const { data, body, slug } = presentationEntry
    const { slides } = parseSlides(body)

    if (slides.size === 0) {
      // Potentially skip presentations with no slides, or handle as needed
      console.warn(`Presentation ${slug} has no slides.`)
      continue
    }

    // URL to the first slide of the presentation
    const firstSlideUrl = `/jelly-time/presentation/${slug}/S1`

    result.push({
      slug,
      title: data.title,
      description: data.description,
      author: data.author,
      date: data.date,
      slideMap: slides,
      url: firstSlideUrl,
    })
  }

  return result
}

// Removed PresentationPathItem interface and getPresentationSlides function that returned PresentationPathItem[]
// The logic for getStaticPaths props/params will be handled in the Astro page component.
// The function getPresentationSlides has been renamed to getPresentationsWithSlides to better reflect its purpose.
