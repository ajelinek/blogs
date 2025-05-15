import type { JSX } from 'solid-js'
import { formatDate } from '../../../utilities/dateUtils'
import type { CollectionEntry } from 'astro:content'
import styles from './styles.module.css'
import { useQueryParams, QUERY_PARAM_IDS } from '../../../utilities/queryParam'

export type BlogPost = CollectionEntry<'blog'> & {
  slug: string
}

type BlogCardProps = {
  post: BlogPost
}

export function BlogCard(props: BlogCardProps) {
  const tagParams = useQueryParams(QUERY_PARAM_IDS.TAG)

  // Don't destructure props to maintain reactivity
  return (
    <article role='article' aria-label='Blog Post' class={styles.blogCard}>
      <a href={`/blog/${props.post.slug}`} class={styles.imageContainer}>
        {props.post.data.image && <img src={props.post.data.image} alt={props.post.data.title} />}
      </a>
      <div class={styles.content}>
        <div class={styles.meta}>
          <span class={styles.date}>{formatDate(props.post.data.pubDate)}</span>
          <span class={styles.author}>By {props.post.data.author}</span>
        </div>
        <h2>
          <a href={`/blog/${props.post.slug}`}>{props.post.data.title}</a>
        </h2>
        <p class={styles.description}>{props.post.data.description}</p>
        <div class={styles.tags}>
          {props.post.data.tags.map((tag: string) => (
            <a href={tagParams.previewToggleParam(tag)} class={styles.tag} data-testid={`tag-${tag}`}>
              {tag}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
