# Presentation Framework & Content Management

## Core Concepts

- Each Markdown file (`.md` or `.mdx`) is a single presentation, with top-level frontmatter for metadata (title, description, author, etc.).
- Slides are separated by `---` (Marp-style); no per-slide frontmatter or titles are required.
- Slide content is pure Markdown, supporting text, images, code, and custom child presentation references (e.g., `[[child:filename.md|Title]]`).
- Images are referenced using standard Markdown and placed in a subdirectory relative to the Markdown file; Astro optimizes these images.
- Mermaid diagrams are included as code blocks and pre-rendered to images at build time; no client-side Mermaid JS is used.
- The folder structure is for organization; navigation and hierarchy are defined by content and references in the Markdown.

## Authoring & Content Structure

- Write presentations as Markdown files, using `---` to separate slides.
- Use standard Markdown for images and fenced code blocks for Mermaid diagrams.
- Reference child presentations with a custom syntax inside slides.
- Only one frontmatter block is needed per file for presentation-level metadata.

## Build & Parsing Process

- A custom parser processes each Markdown file at build time:
  - Extracts frontmatter for metadata.
  - Splits content into slides using `---`.
  - Detects and pre-renders Mermaid code blocks to images, saving them to a build directory (e.g., `public/generated-mermaid/`), which is gitignored.
  - Updates slide content to reference generated images.
  - Resolves image paths and optimizes images via Astro.
  - Detects custom child references and builds a navigation tree.
- Outputs a structured data format (e.g., JSON or JS object) with:
  - Slide content (with images and diagrams)
  - Navigation tree (parent/child relationships)
  - Presentation metadata

## Astro Integration & Page Generation

- Astro uses the parsed data to generate static pages for each presentation and slide.
- The presentation viewer receives:
  - Current slide content (Markdown, images, pre-rendered diagrams)
  - Navigation context (previous/next slide, parent, children)
  - Presentation metadata for display and SEO
- Dynamic routes are generated for deep linking and navigation.
- Breadcrumbs, overview, and drill-down navigation are built from the navigation tree.

## Repository Hygiene

- All generated Mermaid images are output to a dedicated build directory and excluded from version control via `.gitignore`.
- Only source Markdown, images, and code are committed; all build artifacts are excluded.

## Summary

- Authoring is simple: one Markdown file per presentation, slides separated by `---`, standard Markdown for images, and code blocks for diagrams.
- The build process parses, pre-renders diagrams, optimizes images, and generates navigation and static pages.
- The result is a fast, scalable, and maintainable presentation system with minimal client-side dependencies.

## Slide Content and Metadata

- The only required frontmatter is at the top of the presentation file, providing metadata for the entire presentation (title, description, author, date, etc.).
- Individual slides do not need titles or frontmatter; they are defined by their content between `---` separators.
- This keeps authoring simple and focused on content, not metadata.

## Images in Slides

- Images can be referenced directly in Markdown using standard syntax: `![alt text](./images/example.png)`.
- Images should be placed in a subdirectory (e.g., `images/`) relative to the Markdown file for organization and portability.
- Astro's image optimization features will be leveraged to handle images, ensuring responsive, optimized output.

## Mermaid Diagrams in Slides (Pre-rendered)

- Mermaid diagrams are included as fenced code blocks within slide content:

  ````
  ```mermaid
  graph TD;
    A-->B;
    B-->C;
  ```
  ````

- During the build process, the parser detects `mermaid` code blocks in slides.
- Each Mermaid diagram is rendered to an image (SVG or PNG) at build time using a headless renderer (e.g., mermaid-cli or a Node.js library).
- The generated image is saved to a build output directory (e.g., `public/generated-mermaid/` or `.astro-mermaid/`).
- The Markdown content is updated to reference the generated image instead of the original code block.
- No Mermaid JavaScript library is shipped to the client; all diagrams are static images for minimal bundle size and maximum performance.
- The output directory for generated images should be added to `.gitignore` to avoid committing build artifacts to the repository.

## Build Artifacts and Repository Hygiene

- All generated Mermaid images are output to a dedicated build directory (e.g., `public/generated-mermaid/` or `.astro-mermaid/`).
- This directory must be added to `.gitignore` to prevent committing generated images to the repository.
- Only source Markdown, images, and code are committed; all build artifacts are excluded.

## Summary of Implementation Flow

1. Author writes a Markdown file with `---` slide separators and optional child references.
2. Build process parses all Markdown files, builds navigation tree, and extracts slides/metadata.
3. Astro uses helper functions to generate static routes and props for each presentation/slide.
4. Presentation viewer component renders slides, navigation, and handles drill-downs.
5. Navigation, breadcrumbs, and overview are dynamically generated from the parsed structure.

This approach provides a flexible, author-friendly, and scalable way to manage complex, nested presentations in Astro.

## Content Structure

### Directory Organization

Presentations are organized in a nested directory structure:

- Each presentation has its own directory with a descriptive slug
- Main presentation content is in `index.mdx`
- Child presentations are in subdirectories
- Nested presentations can go as deep as needed
- This structure creates a natural hierarchy for navigation

### Content Schema

Each presentation is an MDX file with specialized frontmatter containing:

- Title and description for SEO
- Publication date
- Author information
- Slides array with individual slide content
- Child presentations references
- Optional theme and transition effect settings

### Content Collections

Astro's Content Collections API provides type-safe access to presentation content:

- Defines schemas for slides and presentations
- Enforces required fields and data types
- Handles parent-child relationships
- Allows for filtering and sorting of presentations

## Navigation System

### Navigation Model

The navigation system is based on a 2D grid with an additional dimension for drill-downs:

1. **X-axis**: Horizontal navigation between slides in the same presentation
2. **Y-axis**: Vertical navigation to drill down into child presentations
3. **Z-axis**: Return navigation to parent presentations

### Navigation Controls

- **Keyboard**:

  - Right Arrow: Next slide
  - Left Arrow: Previous slide
  - Down Arrow: Drill down into child presentation (if available)
  - Up Arrow: Return to parent presentation
  - Escape: Toggle overview mode
  - Space: Next slide
  - Home: First slide
  - End: Last slide

- **Touch/Mouse**:

  - Swipe Left/Right: Navigate between slides
  - Swipe Up/Down: Navigate between parent/child presentations
  - Click Navigation Controls: Visual navigation buttons
  - Click Overview Grid: Select specific slide

- **URL Navigation**:
  - Direct linking to specific slides via URL parameters
  - Hierarchical paths for child presentations
  - Preserving parent context for return navigation

## Component Architecture

### Key Components

1. **PresentationViewer**

   - Main container for the presentation
   - Handles keyboard/touch events
   - Manages state (current slide, navigation history)

2. **Slide**

   - Renders individual slides
   - Handles slide transitions
   - Supports scrollable content for overflow

3. **NavigationControls**

   - UI controls for navigation
   - Displays progress indicator
   - Shows available drill-down options

4. **OverviewMode**

   - Grid view of all slides
   - Visual navigation interface
   - Shows hierarchical structure

5. **MermaidRenderer**
   - Renders Mermaid diagrams
   - Handles pre-rendering during build
   - Provides client-side interactivity

## CSS Architecture

### Presentation-Specific CSS Variables

The presentation framework uses CSS variables for consistent styling:

- Background and text colors
- Heading styles
- Slide border radius and padding
- Transition speed and easing
- Dark mode support through media queries

### Slide Typography

Slide typography is designed for presentation clarity:

- Larger font sizes for better visibility
- Clear heading hierarchy
- Proper spacing for lists and paragraphs
- Code block formatting with syntax highlighting
- Responsive image handling

## Accessibility Considerations

- Keyboard navigation for all features
- ARIA attributes for screen readers
- High contrast mode support
- Configurable animation speeds
- Text scaling support
- Focus management during navigation

## Performance Optimizations

- Lazy loading of slides not in view
- Preloading of adjacent slides
- Minimal JavaScript footprint
- Static pre-rendering where possible
- Image optimization for media
- Code splitting for large presentations
