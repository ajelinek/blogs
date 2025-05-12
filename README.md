# Blog & Presentation Platform

A modern static site for blogs and interactive presentations built with Astro and deployed to GitHub Pages.

## Overview

This project creates a dual-purpose GitHub Pages site:

1. **Blog Platform**: Traditional article-based content with SEO optimization
2. **Hierarchical Presentation Framework**: Reveal.js-like navigation with Marp-inspired markdown authoring

## Key Features

- **Blog System**: Write articles in MDX with frontmatter metadata
- **Hierarchical Presentations**: Create nested, navigable presentations with drill-down capability
- **Mermaid Diagrams**: Native support for diagrams in both blogs and presentations
- **GitHub-based Workflow**: Use GitHub Issues for content planning and tracking
- **Static Site Generation**: Fast, SEO-friendly static HTML output
- **Responsive Design**: Mobile-friendly layouts for all content

## Technology Stack

- **Astro.js**: Static site generator with islands architecture
- **MDX**: Enhanced markdown for content authoring
- **GitHub Pages**: Hosting platform
- **GitHub Actions**: CI/CD for automated builds
- **Mermaid.js**: Diagram rendering
- **Custom CSS**: Using CSS variables and PostCSS (built into Vite/Astro)
- **Pure CSS Animations**: Custom animation library using CSS transitions/keyframes

## Project Structure

The project follows a structured organization:

- **Pages**: Landing page, blog listing/detail, and presentation viewer
- **Layouts**: Base, blog-specific, and presentation-specific layouts
- **Components**: Navigation, cards, and specialized presentation components
- **Styles**: Global styles, variables, animations, and component-specific styles
- **Content**: Blog posts and hierarchical presentations in MDX format
- **Public**: Static assets and resources
- **Design**: Documentation and specifications

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm/yarn/pnpm
- Git

### Local Development

To get started with local development:

1. Clone the repository
2. Install dependencies
3. Start the development server
4. Build for production when ready
5. Preview the production build locally

## Content Creation

### Blog Posts

Blog posts are created as MDX files with frontmatter metadata including:

- Title and description
- Publication and update dates
- Author information
- Featured image
- Tags for categorization

### Presentations

Presentations are created as hierarchical MDX files with:

- Title and description
- Author information
- Slides array with individual slide content
- Child presentations references for drill-down navigation
- Optional theme and transition settings

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch, using GitHub Actions.

## Design Documentation

Detailed design documentation is available in the `_design/` directory:

- [Overview](./_design/overview.md): High-level project overview
- [Blog Framework](./_design/blog-framework.md): Blog system design and implementation
- [Presentation Framework](./_design/presentation-framework.md): Hierarchical presentation system

## License

MIT
