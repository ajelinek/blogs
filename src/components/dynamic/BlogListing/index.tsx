import { createMemo, For, Show } from 'solid-js'
import { QUERY_PARAM_IDS, useQueryParam, useQueryParams } from '../../../utilities/queryParam'
import type { BlogPost } from '../BlogCard'
import { BlogCard } from '../BlogCard'
import { Pagination } from '../Pagination'
import { TagFilter } from '../TagFilter'
import styles from './styles.module.css'

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
  const tagParams = useQueryParams(QUERY_PARAM_IDS.TAG)

  // Get current page from URL parameters
  const currentPage = () => {
    const page = pageParam.getParam()
    return page ? parseInt(page) : 1
  }

  // Filter posts based on selected tags (must include ALL selected tags)
  const filteredPosts = createMemo(() => {
    const tagsToFilter = tagParams.getParams()
    if (tagsToFilter.length === 0) return posts() // If no tags selected, return all posts

    return posts().filter(post => {
      // Ensure the post's tags array contains every tag in tagsToFilter
      return tagsToFilter.every((tag: string) => post.data.tags.includes(tag))
    })
  })

  const totalPages = createMemo(() => Math.ceil(filteredPosts().length / postsPerPage()))

  const visiblePosts = createMemo(() => {
    const startIndex = (currentPage() - 1) * postsPerPage()
    const endIndex = startIndex + postsPerPage()
    return filteredPosts().slice(startIndex, endIndex)
  })

  return (
    <div>
      {/* Tag Filter Component */}
      <TagFilter tags={allTags()} />

      {/* Blog Posts */}
      <section aria-label='Blog Posts' class='posts'>
        <Show
          when={visiblePosts().length > 0}
          fallback={
            <div class={styles.noResults}>
              <p>
                No posts found
                {tagParams.getParams().length > 0
                  ? ` with tag${tagParams.getParams().length > 1 ? 's' : ''} "${tagParams.getParams().join(' & ')}"`
                  : ''}
                .
              </p>
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
