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

// Define the presentation schema
const presentationCollection = defineCollection({
  type: 'content', // MDX files
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    date: z.coerce.date(), // Astro expects a Date object; YYYY-MM-DD will be coerced
  }),
})

export const collections = {
  blog: blogCollection,
  presentations: presentationCollection,
}
