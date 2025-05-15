import { createSignal, createMemo, For, Show, onMount, createEffect } from 'solid-js'
import { BlogCard } from '../BlogCard'
import type { BlogPost } from '../BlogCard'
import { Pagination } from '../Pagination'
import { TagFilter } from '../TagFilter'
import styles from './styles.module.css'
import { useQueryParam, useQueryParams, QUERY_PARAM_IDS } from '../../../utilities/queryParam'

// Define props directly in component file
export type BlogListingProps = {
  posts: BlogPost[]
  postsPerPage?: number
}

export function BlogListing(props: BlogListingProps) {
  const posts = () => props.posts
  const postsPerPage = () => props.postsPerPage ?? 5

  // Extract all unique tags from posts
  const allTags = createMemo(() => {
    const tags = new Set<string>()
    posts().forEach(post => {
      post.data.tags.forEach((tag: string) => tags.add(tag))
    })
    return Array.from(tags).sort()
  })

  const pageParam = useQueryParam(QUERY_PARAM_IDS.PAGE)
  const tagParam = useQueryParams(QUERY_PARAM_IDS.TAG)

  // Get current page from URL parameters
  const currentPage = () => {
    const page = pageParam.getParam()
    return page ? parseInt(page) : 1
  }

  // Get selected tag from URL parameters
  const selectedTag = () => {
    const tags = tagParam.getParams()
    return tags.length > 0 ? tags[0] : null
  }

  // Filter posts based on selected tag
  const filteredPosts = createMemo(() => {
    const tag = selectedTag()
    if (!tag) return posts()
    return posts().filter(post => post.data.tags.includes(tag))
  })

  // Calculate total pages
  const totalPages = createMemo(() => Math.ceil(filteredPosts().length / postsPerPage()))

  // Get posts for current page
  const visiblePosts = createMemo(() => {
    const startIndex = (currentPage() - 1) * postsPerPage()
    const endIndex = startIndex + postsPerPage()
    return filteredPosts().slice(startIndex, endIndex)
  })

  return (
    <div>
      {/* Tag Filter Component */}
      <TagFilter tags={allTags()} selectedTag={selectedTag()} currentPage={currentPage()} />

      {/* Blog Posts */}
      <section aria-label='Blog Posts' class='posts'>
        <Show
          when={visiblePosts().length > 0}
          fallback={
            <div class={styles.noResults}>
              <p>No posts found{selectedTag() ? ` with tag "${selectedTag()}"` : ''}.</p>
            </div>
          }>
          <div class={styles.blogGrid}>
            <For each={visiblePosts()}>{(post: BlogPost) => <BlogCard post={post} />}</For>
          </div>
        </Show>
      </section>

      {/* Pagination Component */}
      <Show when={totalPages() > 1}>
        <Pagination totalPages={totalPages()} />
      </Show>
    </div>
  )
}
