# 01 Foundation

_Reference: See `00_execution-approach.md` for delivery and testing process._

## Product Manager: Feature Description

Establish the foundational structure for the blog and presentation platform, enabling static content delivery, navigation, and basic theming. This is the minimum required to support future features.

## User Stories & Acceptance Criteria

- [ ] **Story 1: Project Scaffolding**

  - [ ] As a developer, I want a project structure that matches the design so that future features can be added cleanly.
  - **Acceptance Criteria:**
    - [ ] Astro project initialized
    - [ ] Directory structure matches design docs
    - [ ] pnpm, TypeScript, and linting configured
    - [ ] GitHub Actions workflow for build/deploy to GitHub Pages
  - **Implementation Tasks:**
    - [ ] Scaffold Astro project with pnpm, TypeScript
    - [ ] Create directory structure per design
    - [ ] Add linting, formatting, and CI config
    - [ ] Set up GitHub Actions for build/deploy
    - [ ] Write Playwright E2E test: project builds, deploys, and loads home page

- [ ] **Story 2: Basic Routing & Navigation**

  - [ ] As a user, I can navigate between the landing page, blog listing, and presentations listing.
  - **Acceptance Criteria:**
    - [ ] Static routes for `/`, `/blog`, `/presentations` exist
    - [ ] Navigation component present on all pages
    - [ ] Navigation is keyboard accessible
  - **Implementation Tasks:**
    - [ ] Implement static routes and placeholder pages
    - [ ] Build Navigation component (Astro, accessible)
    - [ ] Add navigation to all layouts
    - [ ] Write Playwright E2E test: navigation between pages, keyboard accessibility

- [ ] **Story 3: Theming & Layout**
  - [ ] As a user, I see a unique, non-blue, non-flashy theme applied site-wide.
  - **Acceptance Criteria:**
    - [ ] Base layout and global styles implemented
    - [ ] Theme colors avoid standard blues, are not too bright/flashy
    - [ ] Responsive design for mobile/desktop
  - **Implementation Tasks:**
    - [ ] Implement BaseLayout and global styles
    - [ ] Define and apply unique theme (no blue, not flashy)
    - [ ] Ensure responsive breakpoints
    - [ ] Write Playwright E2E test: theme applied, layout responsive

## Definition of Done

- [ ] All user stories implemented
- [ ] All Playwright E2E tests written and passing
- [ ] Code reviewed and merged
