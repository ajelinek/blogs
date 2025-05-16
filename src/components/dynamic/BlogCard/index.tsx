import type { CollectionEntry } from 'astro:content'
import { formatDate } from '../../../utilities/dateUtils'
import { QUERY_PARAM_IDS, useQueryParams } from '../../../utilities/queryParam'
import styles from './styles.module.css'

const BASE_URL = import.meta.env.BASE_URL.replace(/\/?$/, '') // Remove trailing slash if any, ensure it is not just '/' for root

export type BlogPost = CollectionEntry<'blog'> & {
  slug: string
}

type BlogCardProps = {
  post: BlogPost
}

export function BlogCard(props: BlogCardProps) {
  const tagParams = useQueryParams(QUERY_PARAM_IDS.TAG)
  const postUrl = `${BASE_URL}/blog/${props.post.slug}`
  const imageUrl = props.post.data.image
    ? `${BASE_URL}/blog/${props.post.slug}/${props.post.data.image.replace(/^\.\//, '')}`
    : undefined

  return (
    <article role='article' aria-label='Blog Post' class={styles.blogCard}>
      <a href={postUrl} class={styles.imageContainer}>
        {imageUrl && <img src={imageUrl} alt={props.post.data.title} />}
      </a>
      <div class={styles.content}>
        <div class={styles.meta}>
          <span class={styles.date}>{formatDate(props.post.data.pubDate)}</span>
          <span class={styles.author}>By {props.post.data.author}</span>
        </div>
        <h2>
          <a href={postUrl}>{props.post.data.title}</a>
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
