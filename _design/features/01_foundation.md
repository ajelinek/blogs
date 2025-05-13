# 01 Foundation

_Reference: See `00_execution-approach.md` for delivery and testing process._

## Product Manager: Feature Description

Establish the foundational structure for the blog and presentation platform, enabling static content delivery, navigation, and basic theming. This is the minimum required to support future features.

## User Stories & Acceptance Criteria

- [x] **Story 1: Project Scaffolding**

  - [x] As a developer, I want a project structure that matches the design so that future features can be added cleanly.
  - **Acceptance Criteria:**
    - [x] Astro project initialized
    - [x] Directory structure matches design docs
    - [x] pnpm, TypeScript, and linting configured
    - [x] GitHub Actions workflow for build/deploy to GitHub Pages
  - **Implementation Tasks:**
    - [x] Scaffold Astro project with pnpm, TypeScript
    - [x] Create directory structure per design
    - [x] Add linting, formatting, and CI config
    - [x] Set up GitHub Actions for build/deploy
    - [x] Write Playwright E2E test: project builds, deploys, and loads home page

- [x] **Story 2: Basic Routing & Navigation**

  - [x] As a user, I can navigate between the landing page, blog listing, and presentations listing.
  - **Acceptance Criteria:**
    - [x] Static routes for `/`, `/blog`, `/presentations` exist
    - [x] Navigation component present on all pages
    - [x] Navigation is keyboard accessible
  - **Implementation Tasks:**
    - [x] Implement static routes and placeholder pages
    - [x] Build Navigation component (Astro, accessible)
    - [x] Add navigation to all layouts
    - [x] Write Playwright E2E test: navigation between pages, keyboard accessibility

- [x] **Story 3: Theming & Layout**
  - [x] As a user, I see a unique, non-blue, non-flashy theme applied site-wide.
  - **Acceptance Criteria:**
    - [x] Base layout and global styles implemented
    - [x] Theme colors avoid standard blues, are not too bright/flashy
    - [x] Responsive design for mobile/desktop
  - **Implementation Tasks:**
    - [x] Implement BaseLayout and global styles
    - [x] Define and apply unique theme (no blue, not flashy)
    - [x] Ensure responsive breakpoints
    - [x] Write Playwright E2E test: theme applied, layout responsive

## Definition of Done

- [x] All user stories implemented
- [x] All Playwright E2E tests written and passing
- [x] Code reviewed and merged
