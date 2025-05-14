import { createSignal, createMemo, For, Show, onMount } from 'solid-js'
import type { JSX } from 'solid-js'
import { BlogCard } from '../BlogCard'
import type { BlogPost } from '../BlogCard'
import { Pagination } from '../Pagination'
import { TagFilter } from '../TagFilter'
import styles from './styles.module.css'

// Define props directly in component file
export type BlogListingProps = {
  posts: BlogPost[]
  postsPerPage?: number
  basePath?: string
}

export function BlogListing(props: BlogListingProps): JSX.Element {
  const { posts, postsPerPage = 3, basePath = '' } = props

  // Extract all unique tags from posts
  const allTags = createMemo(() => {
    const tags = new Set<string>()
    posts.forEach(post => {
      post.data.tags.forEach((tag: string) => tags.add(tag))
    })
    return Array.from(tags).sort()
  })

  // Use signals for state that needs to be reactive
  const [currentPage, setCurrentPage] = createSignal(1)
  const [selectedTag, setSelectedTag] = createSignal<string | null>(null)

  // Read URL parameters on mount and when URL changes
  onMount(() => {
    updateFromUrl()
    window.addEventListener('popstate', updateFromUrl)
    return () => window.removeEventListener('popstate', updateFromUrl)
  })

  // Update state from URL parameters
  const updateFromUrl = () => {
    const url = new URL(window.location.href)
    const pageParam = url.searchParams.get('page')
    const tagParam = url.searchParams.get('tag')

    setCurrentPage(pageParam ? parseInt(pageParam) : 1)
    setSelectedTag(tagParam)
  }

  // Filter posts based on selected tag
  const filteredPosts = createMemo(() => {
    const tag = selectedTag()
    if (!tag) return posts
    return posts.filter(post => post.data.tags.includes(tag))
  })

  // Calculate total pages
  const totalPages = createMemo(() => Math.ceil(filteredPosts().length / postsPerPage))

  // Get posts for current page
  const visiblePosts = createMemo(() => {
    const startIndex = (currentPage() - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return filteredPosts().slice(startIndex, endIndex)
  })

  return (
    <div>
      {/* Tag Filter Component */}
      <TagFilter tags={allTags()} selectedTag={selectedTag()} basePath={basePath} currentPage={currentPage()} />

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
            <For each={visiblePosts()}>{(post: BlogPost) => <BlogCard post={post} basePath={basePath} />}</For>
          </div>
        </Show>
      </section>

      {/* Pagination Component */}
      <Show when={totalPages() > 1}>
        <Pagination
          currentPage={currentPage()}
          totalPages={totalPages()}
          basePath={basePath}
          selectedTag={selectedTag()}
        />
      </Show>
    </div>
  )
}
