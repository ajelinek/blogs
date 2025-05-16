import { defineCollection, z } from 'astro:content'

// Define the blog post schema
const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      author: z.string(),
      tags: z.array(z.string()),
      image: image().optional(),
      // Optional field to mark content as test-only
      testOnly: z.boolean().optional().default(false),
    }),
})

export const collections = {
  blog: blogCollection,
}
