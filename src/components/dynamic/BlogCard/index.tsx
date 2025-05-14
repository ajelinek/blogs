import { formatDate } from '../../../utilities/dateUtils'
import type { CollectionEntry } from 'astro:content'
import styles from './styles.module.css'

export type BlogPost = CollectionEntry<'blog'> & {
  slug: string
}

type BlogCardProps = {
  post: BlogPost
  basePath?: string
}

export function BlogCard(props: BlogCardProps) {
  // Don't destructure props to maintain reactivity
  return (
    <article role='article' aria-label='Blog Post' class={styles.blogCard}>
      <a href={`${props.basePath}/blog/${props.post.slug}`} class={styles.imageContainer}>
        {props.post.data.image && <img src={props.post.data.image} alt={props.post.data.title} />}
      </a>
      <div class={styles.content}>
        <div class={styles.meta}>
          <span class={styles.date}>{formatDate(props.post.data.pubDate)}</span>
          <span class={styles.author}>By {props.post.data.author}</span>
        </div>
        <h2>
          <a href={`${props.basePath}/blog/${props.post.slug}`}>{props.post.data.title}</a>
        </h2>
        <p class={styles.description}>{props.post.data.description}</p>
        <div class={styles.tags}>
          {props.post.data.tags.map((tag: string) => (
            <a href={`${props.basePath}/blog?tag=${tag}`} class={styles.tag} data-testid={`tag-${tag}`}>
              {tag}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
