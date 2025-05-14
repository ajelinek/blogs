# 03 Presentation Framework

_Reference: See `00_execution-approach.md` for delivery and testing process._

## Product Manager: Feature Description

Implement the static presentation system, supporting nested slide blocks via HTML comments, hierarchical navigation, reusable slides, and pre-rendered diagrams. Users can browse and view presentations with smooth navigation.

## User Stories & Acceptance Criteria

### Story 1: Presentation Content Structure

- As a content author, I want to organize presentations with nested slide blocks and optional metadata for flexible content structure.
  **Acceptance Criteria:**
  - Presentations stored in `src/content/presentations/slug/index.mdx`
  - Slides defined using `<!-- slide-start [metadata] -->` and `<!-- slide-end -->` comments
  - Frontmatter includes title, description, author, date
  - Support for optional slide metadata (title, transition, hidden)
  - Images in subdirectories, referenced in Markdown
    **Implementation Tasks:**
  - Define content schema for presentations
  - Set up directory structure and example content
  - Write Playwright E2E test: content loads, schema enforced

### Story 2: Reusable Slides

- As a content author, I want to reference and reuse slides from other files to create modular, maintainable presentations.
  **Acceptance Criteria:**
  - Single-link slide blocks (e.g., `[](./reusable.md)`) treated as slide includes
  - Referenced slides inlined at the reference point
  - Support for both horizontal and nested references
  - Regular links (with other content) preserved as normal links
    **Implementation Tasks:**
  - Implement slide reference detection and resolution
  - Support nested references with cycle detection
  - Write Playwright E2E test: reusable slides loaded, displayed correctly

### Story 3: Markdown Parser & Build Process

- As a developer, I want a robust parser that processes slide blocks, metadata, and references to generate a navigation tree and optimize content.
  **Acceptance Criteria:**
  - Parse slide blocks and metadata from HTML comments
  - Build navigation tree from nested blocks and references
  - Pre-render Mermaid diagrams to static images
  - Generate unique slide IDs and page numbers
  - Optimize images via Astro
    **Implementation Tasks:**
  - Implement custom Markdown parser with slide block detection
  - Add Mermaid pre-rendering during build
  - Generate navigation tree and slide metadata
  - Write unit tests for parser edge cases
  - Write Playwright E2E test: build process outputs correct structure

### Story 4: Presentation Viewer & Navigation

- As a user, I can view presentations slide-by-slide, with keyboard and touch navigation, and see breadcrumbs/overview.
  **Acceptance Criteria:**
  - `/presentations/[slug]` displays presentation
  - Navigation: next/prev slide, drill-down to child, return to parent
  - Keyboard and touch navigation supported
  - Breadcrumbs and overview grid available
  - Respect slide metadata (transitions, hidden slides)
    **Implementation Tasks:**
  - Implement PresentationViewer, Slide, NavigationControls, OverviewMode components
  - Add keyboard/touch navigation logic
  - Add breadcrumbs and overview grid
  - Write Playwright E2E test: navigation, overview, accessibility

### Story 5: Optimization & Performance

- As a user, I want presentations to load quickly and be responsive on all devices.
  **Acceptance Criteria:**
  - Optimized images and assets
  - Lazy loading for slides not in view
  - Pre-loading of adjacent slides
  - Minimal JavaScript footprint
  - Responsive design for mobile and desktop
    **Implementation Tasks:**
  - Implement lazy loading and preloading strategies
  - Optimize asset delivery
  - Add responsive design for all viewports
  - Write Playwright E2E test: performance metrics meet targets

## Definition of Done

- All user stories implemented
- All Playwright E2E tests written and passing
- Code reviewed and merged
