---
title: 'feature-plain'
description: 'Feature and story template.'
---

# Explanation

- Name each feature as `Feature: <Title>` and each story as `Story N: <Title>`.
- Prefix all feature-related sections with `Feature` and all story-related sections with `Story N`.
- Use checkboxes `[ ]` for acceptance criteria and test cases to track progress.
- Update story numbers and titles for each new story.
- Use this structure for LLMs and humans to easily reference and track work.

---

# Feature: Blog Framework

_Reference: See `00_execution-approach.md` for delivery and testing process._

Implement the static blog system, supporting MDX-based posts, listing, and SEO. Enable users to browse, search, and read blog content.

**Definition of Done:**

- All user stories implemented
- All Playwright E2E tests written and passing
- Code reviewed and merged

---

## Stories

### Story 1: Blog Content Structure

#### Story 1 Description

As a content author, I want to organize blog posts and assets by date and slug so that content is easy to manage.

#### Story 1 Status

- [ ] Backlog
- [ ] In Progress
- [x] Done

#### Story 1 Acceptance Criteria

- [x] Blog posts stored in `src/content/blog/YYYY-MM-DD-slug/index.mdx`
- [x] Images in `images/` subdirectory
- [x] Frontmatter includes title, description, pubDate, author, tags

#### Story 1 Test Cases

- [x] Playwright E2E test: content loads, schema enforced

#### Story 1 Constraints

- [Story 1 constraint: Implementation Tasks to be moved or tracked separately if needed]
  - Define content schema with Zod for blog posts
  - Set up directory structure and example content

#### Story 1 Dependencies

- [Story 1 dependency 1]

---

### Story 2: Blog Listing Page

#### Story 2 Description

As a user, I can view a paginated list of blog posts, sorted by date, with tag filtering.

#### Story 2 Status

- [ ] Backlog
- [ ] In Progress
- [x] Done

#### Story 2 Acceptance Criteria

- [x] `/blog` lists posts, newest first
- [x] Pagination and tag filtering available
- [x] Each post shows title, description, author, date, tags

#### Story 2 Test Cases

- [x] Playwright E2E test: listing, pagination, filtering

#### Story 2 Constraints

- [Story 2 constraint: Implementation Tasks to be moved or tracked separately if needed]
  - Implement blog listing page with pagination, tag filter
  - Build BlogCard component

#### Story 2 Dependencies

- [Story 2 dependency 1]

---

### Story 3: Blog Post Page

#### Story 3 Description

As a user, I can read a full blog post with author info, date, reading time, and related posts.

#### Story 3 Status

- [ ] Backlog
- [ ] In Progress
- [x] Done

#### Story 3 Acceptance Criteria

- [x] `/blog/[slug]` displays full post
- [x] Author, date, reading time, tags, related posts shown
- [x] SEO meta tags present

#### Story 3 Test Cases

- [x] Playwright E2E test: post loads, meta tags present

#### Story 3 Constraints

- [Story 3 constraint: Implementation Tasks to be moved or tracked separately if needed]
  - Implement blog post page with all required info
  - Add SEO meta tags

#### Story 3 Dependencies

- [Story 3 dependency 1]

---

### Story 4: Tag Pages

#### Story 4 Description

As a user, I can view all posts for a specific tag.

#### Story 4 Status

- [ ] Backlog
- [ ] In Progress
- [x] Done

#### Story 4 Acceptance Criteria

- [x] `/blog/tag/[tag]` lists posts for that tag
- [x] Tag title and description shown

#### Story 4 Test Cases

- [x] Playwright E2E test: tag page loads, correct posts shown

#### Story 4 Constraints

- [Story 4 constraint: Implementation Tasks to be moved or tracked separately if needed]
  - Implement dynamic tag pages

#### Story 4 Dependencies

- [Story 4 dependency 1]

---
