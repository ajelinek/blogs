# Blog & Presentation Platform Design

## Project Overview

This project creates a dual-purpose GitHub Pages site using Astro.js:

1. **Blog Platform**: Traditional article-based content with SEO optimization
2. **Hierarchical Presentation Framework**: Reveal.js-like navigation with Marp-inspired markdown authoring

## Technical Architecture

### Core Technologies

- **Astro.js**: Static site generator with minimal JS output
- **MDX**: Enhanced markdown for content authoring
- **GitHub Pages**: Hosting platform
- **GitHub Actions**: CI/CD for automated builds
- **Custom CSS**: Using CSS variables and PostCSS (built into Vite/Astro)
- **Pure CSS Animations**: Custom animation library using CSS transitions/keyframes

### Content Structure

```
/
├── src/
│   ├── pages/
│   │   ├── index.astro        # Landing page
│   │   ├── blog/
│   │   │   ├── index.astro    # Blog listing
│   │   │   └── [slug].astro   # Blog post template
│   │   └── presentations/
│   │       ├── index.astro    # Presentations listing
│   │       └── [slug].astro   # Presentation viewer
│   ├── layouts/
│   │   ├── BaseLayout.astro   # Common layout
│   │   ├── BlogLayout.astro   # Blog-specific layout
│   │   └── PresentationLayout.astro # Presentation layout
│   ├── components/
│   │   ├── Navigation.astro   # Site navigation
│   │   ├── BlogCard.astro     # Blog post card
│   │   └── presentation/
│   │       ├── Slide.astro    # Slide component
│   │       ├── Navigator.astro # Presentation navigation
│   │       └── MermaidRenderer.astro # For Mermaid diagrams
│   ├── styles/
│   │   ├── global.css         # Global styles
│   │   ├── variables.css      # CSS variables
│   │   ├── animations.css     # Animation library
│   │   └── components/        # Component-specific styles
│   └── content/
│       ├── blog/              # Blog content (MDX)
│       └── presentations/     # Presentation content (MDX)
├── public/
│   └── assets/               # Static assets
└── astro.config.mjs         # Astro configuration
```

## Build & Deployment Process

### Development Workflow

1. Content creation in MDX
2. Local development with Astro dev server
3. Preview with production build locally
4. Deploy to GitHub Pages

### Deployment

- **GitHub Actions** workflow handles:
  - Building the site
  - Deploying to GitHub Pages
  - Triggering on push to main branch

## SEO Strategy

- Clean, semantic HTML
- Static pre-rendering of all content
- Proper metadata and structured data
- Sitemap generation
- Fast loading (minimal JS)

## Future Enhancements

- Search functionality
- Tags and categories
- Dark/light theme toggle
- PDF export for presentations
- RSS feed for blog content
