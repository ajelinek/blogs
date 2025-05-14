import { For } from 'solid-js'
import styles from './styles.module.css'

type PaginationProps = {
  currentPage: number
  totalPages: number
  basePath?: string
  selectedTag?: string | null
}

export function Pagination(props: PaginationProps) {
  // Don't destructure props to maintain reactivity

  // Generate URL for a specific page
  const getPageUrl = (page: number) => {
    let url = `${props.basePath || ''}/blog`
    const params = []

    if (page > 1) {
      params.push(`page=${page}`)
    }

    if (props.selectedTag) {
      params.push(`tag=${props.selectedTag}`)
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`
    }

    return url
  }

  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (props.totalPages <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= props.totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate range around current page
      let startPage = Math.max(2, props.currentPage - 1)
      let endPage = Math.min(props.totalPages - 1, props.currentPage + 1)

      // Adjust if at the beginning
      if (props.currentPage <= 3) {
        endPage = Math.min(props.totalPages - 1, 4)
      }

      // Adjust if at the end
      if (props.currentPage >= props.totalPages - 2) {
        startPage = Math.max(2, props.totalPages - 3)
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push(-1) // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < props.totalPages - 1) {
        pages.push(-2) // -2 represents ellipsis
      }

      // Always show last page
      pages.push(props.totalPages)
    }

    return pages
  }

  if (props.totalPages <= 1) {
    return null
  }

  return (
    <nav aria-label='Pagination' class={styles.pagination}>
      <div class={styles.paginationControls}>
        {/* Previous button */}
        {props.currentPage > 1 ? (
          <a href={getPageUrl(props.currentPage - 1)} class={styles.paginationButton}>
            Previous
          </a>
        ) : (
          <span class={`${styles.paginationButton} ${styles.disabled}`}>Previous</span>
        )}

        {/* Page numbers */}
        <div class={styles.pageNumbers}>
          <For each={getPageNumbers()}>
            {(page: number) => (
              <>
                {page < 0 ? (
                  <span class={styles.ellipsis}>…</span>
                ) : (
                  <a
                    href={getPageUrl(page)}
                    class={`${styles.pageNumber} ${props.currentPage === page ? styles.active : ''}`}
                    aria-current={props.currentPage === page ? 'page' : undefined}>
                    {page}
                  </a>
                )}
              </>
            )}
          </For>
        </div>

        {/* Next button */}
        {props.currentPage < props.totalPages ? (
          <a href={getPageUrl(props.currentPage + 1)} class={styles.paginationButton}>
            Next
          </a>
        ) : (
          <span class={`${styles.paginationButton} ${styles.disabled}`}>Next</span>
        )}
      </div>
    </nav>
  )
}
