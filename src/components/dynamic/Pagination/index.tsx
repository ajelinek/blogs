import { For, createMemo } from 'solid-js'
import { QUERY_PARAM_IDS, useQueryParam } from '../../../utilities/queryParam'
import styles from './styles.module.css'

type PaginationProps = {
  totalPages: number
}

export function Pagination(props: PaginationProps) {
  const pageParam = useQueryParam(QUERY_PARAM_IDS.PAGE)

  const currentPage = createMemo(() => {
    const page = pageParam.getParam()
    return page ? parseInt(page) : 1
  })

  const previousPage = createMemo(() => {
    return Math.max(1, currentPage() - 1)
  })

  const nextPage = createMemo(() => {
    return Math.min(props.totalPages, currentPage() + 1)
  })

  const isPreviousPageDisabled = createMemo(() => {
    return currentPage() <= 1
  })

  const isNextPageDisabled = createMemo(() => {
    return currentPage() >= props.totalPages
  })

  // Create an array of page numbers to display
  const pageNumbers = createMemo(() => {
    const pages = []
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
    return pages
  })

  if (props.totalPages <= 1) {
    return null
  }

  return (
    <section aria-label='Pagination' class={styles.pagination}>
      <div class={styles.paginationControls}>
        {/* Previous button */}
        {!isPreviousPageDisabled() ? (
          <a href={pageParam.previewSetParam(String(previousPage()))} class={styles.paginationButton}>
            Previous
          </a>
        ) : (
          <span class={`${styles.paginationButton} ${styles.disabled}`}>Previous</span>
        )}

        {/* Page numbers */}
        <div class={styles.pageNumbers}>
          <For each={pageNumbers()}>
            {(page: number) => (
              <a
                href={pageParam.previewSetParam(String(page))}
                class={`${styles.pageNumber} ${currentPage() === page ? styles.active : ''}`}
                aria-current={currentPage() === page ? 'page' : undefined}>
                {page}
              </a>
            )}
          </For>
        </div>

        {/* Next button */}
        {!isNextPageDisabled() ? (
          <a href={pageParam.previewSetParam(String(nextPage()))} class={styles.paginationButton}>
            Next
          </a>
        ) : (
          <span class={`${styles.paginationButton} ${styles.disabled}`}>Next</span>
        )}
      </div>
    </section>
  )
}
