# 06 Mermaid Diagrams

_Reference: See `00_execution-approach.md` for delivery and testing process._

## Product Manager: Feature Description

This feature will introduce support for Mermaid diagrams across the platform. All Mermaid diagram processing is deferred until the rest of the system is functional. No Mermaid diagram rendering or processing should block or interfere with other features.

## User Stories & Acceptance Criteria

### Story 1: Mermaid Diagram Support (Deferred)

- As a content author, I want to include Mermaid diagrams in slides and blog posts, which are pre-rendered to images at build time.
  **Acceptance Criteria:**
  - Mermaid code blocks detected and rendered to images
  - Images referenced in content (slides, blog posts)
  - No client-side Mermaid JS shipped
    **Implementation Tasks:**
  - Integrate Mermaid pre-rendering in build process
  - Update Markdown parser to replace Mermaid code blocks with image references
  - Write Playwright E2E test: diagrams rendered, no client-side Mermaid

## Implementation Note

All other features and flows should be fully functional before Mermaid diagram support is implemented. This feature will be revisited and implemented after the rest of the system is complete.

## Definition of Done

- All user stories implemented
- All Playwright E2E tests written and passing
- Code reviewed and merged
