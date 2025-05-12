# Building This Site: An LLM-Driven Process

## Introduction

This document tracks the process of building a dual-purpose blog and presentation platform using Astro.js, as observed through the lens of iterative, LLM-assisted development. It is intended for observers interested in how to leverage a large language model (LLM) to drive a modern, static site project from inception through delivery.

---

## Phase 1: Project Inception & Planning

### 1. Defining the Vision

- The project began with a clear goal: create a static site for both blogs and interactive presentations, using Astro.js and deploying to GitHub Pages.
- The initial requirements emphasized static content, no authentication, and a unique, accessible design.

### 2. LLM as Product Manager & Tech Lead

- The LLM was used to alternate between product management (feature/user story definition) and technical leadership (implementation planning, architecture).
- Early questions focused on:
  - How to structure a dual-purpose site (blog + presentations)
  - How to ensure accessibility and SEO
  - How to organize content and code for maintainability

### 3. Feature Planning & Execution Approach

- Features were broken down into user stories with clear acceptance criteria.
- An execution approach was established: BDD/TDD, with E2E tests written before implementation, and iterative delivery (see `_design/features/00_execution-approach.md`).
- The LLM generated initial feature files for foundational build, blog framework, presentation framework, and search.

---

## Phase 2: Rule Definition & Technology Alignment

### 1. Cursor Rules

- The LLM helped define a set of Cursor Rules to enforce architecture, technology choices, and coding standards (Astro.js, Solid.js, TypeScript, pnpm).
- Rules covered general architecture, component patterns, state management, store/repository/service separation, and more.
- Early iterations included Firebase references, which were later removed to align with the static-only approach.

### 2. Technology Stack & Folder Structure

- The stack was locked to Astro.js (static), Solid.js (dynamic UI), TypeScript, and pnpm.
- The LLM enforced a strict folder structure for `src/`, with clear separation of pages, layouts, components, and store logic.

---

## Phase 3: Content & Design Documentation

### 1. Blog & Presentation Frameworks

- The LLM generated detailed design docs for both the blog and presentation systems, specifying:
  - Content schemas (frontmatter, MDX structure)
  - Directory organization for posts and presentations
  - Use of Astro Content Collections for type safety
  - Static rendering of diagrams (Mermaid) and images
  - Navigation and accessibility requirements

### 2. Living Documentation

- All design and process docs are kept in `_design/` and `_ideas/` for transparency and future reference.
- This file (`_ideas/Building This Site.md`) is updated as the project progresses, providing a real-time log of the LLM-driven process.

---

## Key Takeaways So Far

- **LLM as Collaborator:** The LLM can drive both product and technical planning, enforce standards, and generate code and documentation iteratively.
- **Iterative, Test-Driven Delivery:** Each feature is planned, tested, and implemented in small increments, with the LLM guiding each step.
- **Strict Standards:** Cursor Rules and design docs ensure consistency, maintainability, and alignment with the project's vision.

---

## Next Steps

- Continue iterative feature delivery, updating this document at each major phase.
- Use the LLM to generate, review, and refine both code and documentation as the project evolves.
