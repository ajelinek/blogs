import { For } from 'solid-js'
import { QUERY_PARAM_IDS, useQueryParams } from '../../../utilities/queryParam'
import styles from './styles.module.css'

type TagFilterProps = {
  tags: string[]
}

export function TagFilter(props: TagFilterProps) {
  const tagParams = useQueryParams(QUERY_PARAM_IDS.TAG)

  return (
    <section aria-label='Tag Filter' class={styles.tagFilter}>
      <ul class={styles.tagList} role='list'>
        <li role='listitem'>
          <a
            href={tagParams.previewRemoveParams(tagParams.getParams())}
            class={tagParams.getParams().length === 0 ? `${styles.tag} ${styles.active}` : styles.tag}
            aria-current={tagParams.getParams().length === 0 ? 'true' : undefined}
            data-testid='tag-all'>
            All
          </a>
        </li>
        <For each={props.tags}>
          {(tag: string) => (
            <li role='listitem'>
              <a
                href={tagParams.previewToggleParam(tag)}
                class={tagParams.getParams().includes(tag) ? `${styles.tag} ${styles.active}` : styles.tag}
                aria-current={tagParams.getParams().includes(tag) ? 'true' : undefined}
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
