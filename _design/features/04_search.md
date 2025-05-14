# 04 Search

_Reference: See `00_execution-approach.md` for delivery and testing process._

## Product Manager: Feature Description

Enable users to search blog posts and presentations using a static, client-side full-text search index for fast, privacy-respecting results.

## User Stories & Acceptance Criteria

### Story 1: Search Index Generation

- As a user, I want to search all blog posts and presentations so I can quickly find relevant content.
  **Acceptance Criteria:**
  - Static search index generated at build time (e.g., with views.js)
  - Index includes titles, descriptions, and content snippets
  - Index stored as static JSON, loaded client-side
    **Implementation Tasks:**
  - Integrate views.js or similar to build static search index
  - Include blog and presentation content in index
  - Write Playwright E2E test: index generated, loads client-side

### Story 2: Search UI

- As a user, I can enter a query and see relevant results from blog posts and presentations.
  **Acceptance Criteria:**
  - Search input available on all pages
  - Results update as user types
  - Results show title, snippet, and link to content
  - Keyboard accessible
    **Implementation Tasks:**
  - Implement Search UI component (accessible, responsive)
  - Connect UI to static index for instant search
  - Write Playwright E2E test: search input, results update, accessibility

### Story 3: Search Result Navigation

- As a user, I can navigate to the selected result and return to my search easily.
  **Acceptance Criteria:**
  - Clicking a result navigates to the correct page/slide/post
  - Browser back returns to search results
    **Implementation Tasks:**
  - Implement navigation from results to content
  - Ensure browser back returns to search
  - Write Playwright E2E test: navigation, back behavior

## Definition of Done

- All user stories implemented
- All Playwright E2E tests written and passing
- Code reviewed and merged
