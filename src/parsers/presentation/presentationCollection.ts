import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
import { parseSlides, type SlideNode } from './presentationParser'

// Type for a presentation entry with its metadata and slides
export interface PresentationWithSlides {
  slug: string
  title: string
  description: string
  author?: string
  date: Date
  slideMap: Map<string, SlideNode>
  url: string
}

/**
 * Gets all presentations with their metadata and first slide URL
 * @returns Array of presentation objects with metadata and URLs
 */
export async function getPresentations(): Promise<PresentationWithSlides[]> {
  const presentations = await getCollection('presentations')
  const result: PresentationWithSlides[] = []

  for (const presentation of presentations) {
    const { data, body, slug } = presentation
    const { slides } = parseSlides(body)

    // The first slide is assumed to be 'S1'
    const firstSlideId = 'S1'
    const slideUrl = `/jelly-time/presentations/${slug}/${firstSlideId}`

    result.push({
      slug,
      title: data.title,
      description: data.description,
      author: data.author,
      date: data.date,
      slideMap: slides,
      url: slideUrl,
    })
  }

  return result
}

// The return type for getStaticPaths
export interface PresentationPathItem {
  params: { slide: string }
  props: {
    presentationData: PresentationWithSlides
    slideNode: SlideNode
  }
}

/**
 * Gets all presentation slides for generating static paths
 * @returns Array of path items for all slides in all presentations
 */
export async function getPresentationSlides(): Promise<PresentationPathItem[]> {
  const presentations = await getCollection('presentations')
  const pathItems: PresentationPathItem[] = []

  for (const presentation of presentations) {
    const { data, body, slug } = presentation
    const { slides } = parseSlides(body)

    if (slides.size === 0) {
      continue
    }

    // Create the presentation data object once for all slides
    const presentationData: PresentationWithSlides = {
      slug,
      title: data.title,
      description: data.description,
      author: data.author,
      date: data.date,
      slideMap: slides,
      url: `/jelly-time/presentations/${slug}/S1`, // First slide is always S1
    }

    // Create a path item for each slide in this presentation
    for (const slideNode of slides.values()) {
      pathItems.push({
        params: {
          slide: `${slug}/${slideNode.id}`,
        },
        props: {
          presentationData,
          slideNode,
        },
      })
    }
  }

  return pathItems
}
