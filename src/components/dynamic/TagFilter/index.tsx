import type { JSX } from 'solid-js'
import { For } from 'solid-js'
import styles from './styles.module.css'
import { useQueryParam, useQueryParams, QUERY_PARAM_IDS } from '../../../utilities/queryParam'

type TagFilterProps = {
  tags: string[]
  selectedTag: string | null
  currentPage?: number
}

export function TagFilter(props: TagFilterProps) {
  const tagParams = useQueryParams(QUERY_PARAM_IDS.TAG)
  const pageParam = useQueryParam(QUERY_PARAM_IDS.PAGE)

  // For 'All', remove all tags and reset page if needed
  const allHref = () => {
    let url = tagParams.previewRemoveParams(tagParams.getParams())
    if (props.currentPage && props.currentPage > 1) {
      url = pageParam.previewRemoveParam()
    }
    return url
  }

  // For each tag, set only that tag and reset page if needed
  const tagHref = (tag: string) => {
    let url = tagParams.previewRemoveParams(tagParams.getParams())
    url = tagParams.previewAddParam(tag)
    if (props.currentPage && props.currentPage > 1) {
      url = pageParam.previewRemoveParam()
    }
    return url
  }

  return (
    <section aria-label='Tag Filter' class={styles.tagFilter}>
      <ul class={styles.tagList} role='list'>
        <li role='listitem'>
          <a
            href={allHref()}
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
                href={tagHref(tag)}
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
