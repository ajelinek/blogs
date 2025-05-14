import { For } from 'solid-js'
import styles from './styles.module.css'

type TagFilterProps = {
  tags: string[]
  selectedTag: string | null
  basePath?: string
  currentPage?: number
}

export function TagFilter(props: TagFilterProps) {
  // Don't destructure props to maintain reactivity

  // Generate URL for a tag
  const getTagUrl = (tag: string | null) => {
    let url = `${props.basePath}/blog`
    const params = []

    if (tag) {
      params.push(`tag=${tag}`)
    }

    if (props.currentPage && props.currentPage > 1) {
      params.push(`page=${props.currentPage}`)
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`
    }

    return url
  }

  return (
    <section aria-label='Tag Filter' class={styles.tagFilter}>
      <ul class={styles.tagList} role='list'>
        <li role='listitem'>
          <a
            href={getTagUrl(null)}
            class={!props.selectedTag ? `${styles.tag} ${styles.active}` : styles.tag}
            aria-current={!props.selectedTag ? 'true' : undefined}
            data-testid='tag-all'>
            All
          </a>
        </li>
        <For each={props.tags}>
          {(tag: string) => (
            <li role='listitem'>
              <a
                href={getTagUrl(tag)}
                class={props.selectedTag === tag ? `${styles.tag} ${styles.active}` : styles.tag}
                aria-current={props.selectedTag === tag ? 'true' : undefined}
                data-testid={`tag-${tag}`}>
                {tag}
              </a>
            </li>
          )}
        </For>
      </ul>
    </section>
  )
}
