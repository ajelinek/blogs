# Blog Framework & Content Management

## Overview

This document outlines the blog framework and content management approach for the platform. The blog system uses MDX for content authoring with a clean, performance-focused design.

## Content Structure

### File Organization

Blog posts are organized using a date-based directory structure:

- Each blog post has its own directory with format `YYYY-MM-DD-slug`
- Main content is in `index.mdx` file
- Blog-specific images are stored in an `images` subdirectory
- This structure keeps content and related assets together

### Content Schema

Each blog post is an MDX file with frontmatter metadata containing:

- Title and description for SEO
- Publication and update dates
- Author information
- Optional featured image
- Tags for categorization
- Draft status flag

### Metadata Schema

Blog posts use the following metadata fields:

- `title`: Post title (required)
- `description`: SEO description (required)
- `pubDate`: Publication date (required)
- `updatedDate`: Last update date (optional)
- `author`: Content author (required)
- `image`: Header image path (optional)
- `tags`: Array of related topics (optional)
- `draft`: Boolean to indicate draft status (optional, defaults to false)

## Content Collections

Astro's Content Collections API provides type-safe access to blog content:

- Defines a schema for blog posts using Zod validation
- Enforces required fields and data types
- Provides type safety for accessing blog content
- Allows filtering and sorting of blog posts

## Blog Features

### Blog Listing Page

The blog listing page (`/blog/index.astro`) provides:

- Paginated list of blog posts
- Filtering by tags
- Sorting by date (newest first)
- Featured/pinned posts
- Reading time estimation

### Blog Post Page

Individual blog posts (`/blog/[slug].astro`) provide:

- Full article content
- Author information
- Publication date
- Reading time
- Related posts
- Tag links
- Social sharing

## Component Design

### BlogCard Component

The `BlogCard` component displays blog post previews with:

- Featured image (if available)
- Post title with link to full article
- Author and publication date
- Brief description
- Tags with links to tag pages
- Hover effects for better user interaction

### BlogLayout Component

The `BlogLayout` component provides consistent layout for blog pages:

- Two-column layout with main content and sidebar
- Sidebar contains categories, tags, and related posts
- Responsive design that collapses to single column on mobile
- Consistent typography and spacing

## CSS Architecture

### Blog-Specific CSS Variables

The blog uses CSS variables for consistent styling:

- Card radius and shadow
- Header and content spacing
- Maximum content width
- Color scheme for headings, text, and links
- Dark mode support through media queries

### Typography

Blog typography is designed for readability:

- Comfortable line height (1.7)
- Appropriate font sizes for different heading levels
- Proper spacing between paragraphs
- Readable link styling with underlines
- Code block formatting
- Responsive image handling

## Advanced Features

### Tag Pages

Dynamic tag pages allow filtering blog posts by tag:

- Automatically generated for each unique tag
- Shows all posts with a specific tag
- Uses the same card layout as the main blog listing
- Includes tag-specific title and description

### Reading Time Estimation

Reading time is calculated based on:

- Word count in the article
- Average reading speed (200 words per minute)
- Displayed on both blog cards and article pages

### RSS Feed

An RSS feed is provided for blog posts with:

- Post title, description, and publication date
- Link to the full article
- Automatic updates when new content is published

## Mermaid Diagram Support

Blog posts can include Mermaid diagrams:

- Syntax highlighting for Mermaid code blocks
- Client-side rendering of diagrams
- Fallback for non-JavaScript environments
- Consistent styling with the rest of the blog

## SEO Optimization

### Blog-Specific SEO

Each blog post includes:

- Proper title and meta description
- Open Graph tags for social sharing
- Canonical URLs
- Structured data for articles (JSON-LD)
- Appropriate heading hierarchy

## Content Creation Workflow

The workflow for creating new blog posts is:

1. Create a new directory in `src/content/blog/` with the format `YYYY-MM-DD-slug`
2. Add an `index.mdx` file with proper frontmatter
3. Write content using Markdown
4. Add images to the `images/` subdirectory
5. Preview locally with the development server
6. Build and deploy via GitHub Actions
