import { defineCollection, z } from 'astro:content'

// Define the blog post schema
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string().transform(str => new Date(str)),
    author: z.string(),
    tags: z.array(z.string()),
    // Optional field to mark content as test-only
    testOnly: z.boolean().optional().default(false),
  }),
})

// Filter test content in production but include it in development
const collections = {
  blog: blogCollection,
}

// Export a function that filters out test content in production
export const getFilteredCollections = () => {
  // In production, filter out test content
  if (import.meta.env.PROD) {
    return {
      blog: {
        ...collections.blog,
        filter: (entry: any) => !entry.data.testOnly,
      },
    }
  }

  // In development, include all content
  return collections
}

// Export collections for Astro
export const { blog } = getFilteredCollections()
