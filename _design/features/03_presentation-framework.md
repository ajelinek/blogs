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

# Feature: Presentation Framework

_Reference: See `00_execution-approach.md` for delivery and testing process._

Implement the static presentation system, supporting nested slide blocks via HTML comments, hierarchical navigation, reusable slides, and pre-rendered diagrams. Users can browse and view presentations with smooth navigation.

**Definition of Done:**

- All user stories implemented
- All Playwright E2E tests written and passing
- Code reviewed and merged

## Feature Acceptance Criteria

- [ ] [Feature acceptance criterion 1]
- [ ] [Feature acceptance criterion 2]

## Feature Constraints

- [Feature constraint 1]

## Feature Dependencies

- [Feature dependency 1]

---

## Stories

### Story 1: Presentation Content Structure

#### Story 1 Description

As a content author, I want to organize presentations with nested slide blocks and optional metadata for flexible content structure.

#### Story 1 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 1 Acceptance Criteria

- [ ] Presentations stored in `src/content/presentations/slug/index.mdx`
- [ ] Slides defined using `<!-- slide-start [metadata] -->` and `<!-- slide-end -->` comments
- [ ] Frontmatter includes title, description, author, date
- [ ] Support for optional slide metadata (title, transition, hidden)
- [ ] Images in subdirectories, referenced in Markdown

#### Story 1 Test Cases

- [ ] Playwright E2E test: content loads, schema enforced

#### Story 1 Constraints

- [Story 1 constraint: Implementation Tasks to be moved or tracked separately if needed]
  - Define content schema for presentations
  - Set up directory structure and example content

#### Story 1 Dependencies

- [Story 1 dependency 1]

---

### Story 2: Reusable Slides

#### Story 2 Description

As a content author, I want to reference and reuse slides from other files to create modular, maintainable presentations.

#### Story 2 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 2 Acceptance Criteria

- [ ] Single-link slide blocks (e.g., `[](./reusable.md)`) treated as slide includes
- [ ] Referenced slides inlined at the reference point
- [ ] Support for both horizontal and nested references
- [ ] Regular links (with other content) preserved as normal links

#### Story 2 Test Cases

- [ ] Playwright E2E test: reusable slides loaded, displayed correctly

#### Story 2 Constraints

- [Story 2 constraint: Implementation Tasks to be moved or tracked separately if needed]
  - Implement slide reference detection and resolution
  - Support nested references with cycle detection

#### Story 2 Dependencies

- [Story 2 dependency 1]

---

### Story 3: Markdown Parser & Build Process

#### Story 3 Description

As a developer, I want a robust parser that processes slide blocks, metadata, and references to generate a navigation tree and optimize content.

#### Story 3 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 3 Acceptance Criteria

- [ ] Parse slide blocks and metadata from HTML comments
- [ ] Build navigation tree from nested blocks and references
- [ ] Pre-render Mermaid diagrams to static images
- [ ] Generate unique slide IDs and page numbers
- [ ] Optimize images via Astro

#### Story 3 Test Cases

- [ ] Write unit tests for parser edge cases
- [ ] Write Playwright E2E test: build process outputs correct structure

#### Story 3 Constraints

- [Story 3 constraint: Implementation Tasks to be moved or tracked separately if needed]
  - Implement custom Markdown parser with slide block detection
  - Add Mermaid pre-rendering during build
  - Generate navigation tree and slide metadata

#### Story 3 Dependencies

- [Story 3 dependency 1]

---

### Story 4: Presentation Viewer & Navigation

#### Story 4 Description

As a user, I can view presentations slide-by-slide, with keyboard and touch navigation, and see breadcrumbs/overview.

#### Story 4 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 4 Acceptance Criteria

- [ ] `/presentations/[slug]` displays presentation
- [ ] Navigation: next/prev slide, drill-down to child, return to parent
- [ ] Keyboard and touch navigation supported
- [ ] Breadcrumbs and overview grid available
- [ ] Respect slide metadata (transitions, hidden slides)

#### Story 4 Test Cases

- [ ] Playwright E2E test: navigation, overview, accessibility

#### Story 4 Constraints

- [Story 4 constraint: Implementation Tasks to be moved or tracked separately if needed]
  - Implement PresentationViewer, Slide, NavigationControls, OverviewMode components
  - Add keyboard/touch navigation logic
  - Add breadcrumbs and overview grid

#### Story 4 Dependencies

- [Story 4 dependency 1]

---

### Story 5: Optimization & Performance

#### Story 5 Description

As a user, I want presentations to load quickly and be responsive on all devices.

#### Story 5 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 5 Acceptance Criteria

- [ ] Optimized images and assets
- [ ] Lazy loading for slides not in view
- [ ] Pre-loading of adjacent slides
- [ ] Minimal JavaScript footprint
- [ ] Responsive design for mobile and desktop

#### Story 5 Test Cases

- [ ] Playwright E2E test: performance metrics meet targets

#### Story 5 Constraints

- [Story 5 constraint: Implementation Tasks to be moved or tracked separately if needed]
  - Implement lazy loading and preloading strategies
  - Optimize asset delivery
  - Add responsive design for all viewports

#### Story 5 Dependencies

- [Story 5 dependency 1]

---
