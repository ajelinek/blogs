/// <reference types="astro/client" />

declare module 'astro:content' {
  interface Render {
    '.mdx': Promise<{
      Content: import('astro').MarkdownInstance<{}>['Content']
      headings: import('astro').MarkdownHeading[]
      remarkPluginFrontmatter: Record<string, any>
    }>
  }
}

declare module 'astro:content' {
  export interface CollectionEntry<C extends keyof typeof import('./content/config').collections> {
    data: (typeof import('./content/config').collections)[C]['schema'] extends infer T
      ? T extends import('zod').ZodType<any, any, infer Output>
        ? Output
        : never
      : never
    body: string
    slug: string
    render(): Render['.mdx']
  }
}
