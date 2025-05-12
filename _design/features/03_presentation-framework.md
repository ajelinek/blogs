# 03 Presentation Framework

_Reference: See `00_execution-approach.md` for delivery and testing process._

## Product Manager: Feature Description

Implement the static presentation system, supporting Marp-style Markdown slides, hierarchical navigation, and pre-rendered diagrams. Users can browse and view presentations with smooth navigation.

## User Stories & Acceptance Criteria

### Story 1: Presentation Content Structure

- As a content author, I want to organize presentations and assets in a nested directory structure so that content and hierarchy are clear.
- **Acceptance Criteria:**
  - Presentations stored in `src/content/presentations/slug/index.mdx`
  - Slides separated by `---` in Markdown
  - Frontmatter includes title, description, author, date
  - Images in subdirectories, referenced in Markdown

### Story 2: Presentation Viewer & Navigation

- As a user, I can view presentations slide-by-slide, with keyboard and touch navigation, and see breadcrumbs/overview.
- **Acceptance Criteria:**
  - `/presentations/[slug]` displays presentation
  - Navigation: next/prev slide, drill-down to child, return to parent
  - Keyboard and touch navigation supported
  - Breadcrumbs and overview grid available

### Story 3: Mermaid Diagram Support

- As a content author, I can include Mermaid diagrams in slides, which are pre-rendered to images at build time.
- **Acceptance Criteria:**
  - Mermaid code blocks detected and rendered to images
  - Images referenced in slide content
  - No client-side Mermaid JS shipped

## Tech Lead: Implementation Tasks

#### Story 1 Tasks

- Define content schema for presentations
- Set up directory structure and example content
- Write Playwright E2E test: content loads, schema enforced

#### Story 2 Tasks

- Implement PresentationViewer, Slide, NavigationControls, OverviewMode components
- Add keyboard/touch navigation logic
- Add breadcrumbs and overview grid
- Write Playwright E2E test: navigation, overview, accessibility

#### Story 3 Tasks

- Integrate Mermaid pre-rendering in build process
- Update Markdown parser to replace code blocks with image refs
- Write Playwright E2E test: diagrams rendered, no client-side Mermaid

## Definition of Done

- All user stories implemented
- All Playwright E2E tests written and passing
- Code reviewed and merged
