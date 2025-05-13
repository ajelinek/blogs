# 02 Blog Framework

_Reference: See `00_execution-approach.md` for delivery and testing process._

## Product Manager: Feature Description

Implement the static blog system, supporting MDX-based posts, listing, and SEO. Enable users to browse, search, and read blog content.

## User Stories & Acceptance Criteria

- [ ] **Story 1: Blog Content Structure**

  - [ ] As a content author, I want to organize blog posts and assets by date and slug so that content is easy to manage.
  - **Acceptance Criteria:**
    - [ ] Blog posts stored in `src/content/blog/YYYY-MM-DD-slug/index.mdx`
    - [ ] Images in `images/` subdirectory
    - [ ] Frontmatter includes title, description, pubDate, author, tags
  - **Implementation Tasks:**
    - [ ] Define content schema with Zod for blog posts
    - [ ] Set up directory structure and example content
    - [ ] Write Playwright E2E test: content loads, schema enforced

- [ ] **Story 2: Blog Listing Page**

  - [ ] As a user, I can view a paginated list of blog posts, sorted by date, with tag filtering.
  - **Acceptance Criteria:**
    - [ ] `/blog` lists posts, newest first
    - [ ] Pagination and tag filtering available
    - [ ] Each post shows title, description, author, date, tags
  - **Implementation Tasks:**
    - [ ] Implement blog listing page with pagination, tag filter
    - [ ] Build BlogCard component
    - [ ] Write Playwright E2E test: listing, pagination, filtering

- [ ] **Story 3: Blog Post Page**

  - [ ] As a user, I can read a full blog post with author info, date, reading time, and related posts.
  - **Acceptance Criteria:**
    - [ ] `/blog/[slug]` displays full post
    - [ ] Author, date, reading time, tags, related posts shown
    - [ ] SEO meta tags present
  - **Implementation Tasks:**
    - [ ] Implement blog post page with all required info
    - [ ] Add SEO meta tags
    - [ ] Write Playwright E2E test: post loads, meta tags present

- [ ] **Story 4: Tag Pages**
  - [ ] As a user, I can view all posts for a specific tag.
  - **Acceptance Criteria:**
    - [ ] `/blog/tag/[tag]` lists posts for that tag
    - [ ] Tag title and description shown
  - **Implementation Tasks:**
    - [ ] Implement dynamic tag pages
    - [ ] Write Playwright E2E test: tag page loads, correct posts shown

## Definition of Done

- [ ] All user stories implemented
- [ ] All Playwright E2E tests written and passing
- [ ] Code reviewed and merged
