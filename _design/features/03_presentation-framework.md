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

- [ ] Presentations are listed on `/presentations/index.astro`.
- [ ] Individual presentations are viewable at `/presentations/[slug].astro`.
- [ ] Presentations utilize a dedicated `PresentationLayout.astro`.
- [ ] Slide content is rendered using a `Slide.astro` component.
- [ ] Navigation within presentations is handled by a `Navigator.astro` component.
- [ ] Mermaid diagrams are supported and pre-rendered (as detailed in Story 3).
- [ ] Presentation content is authored in MDX format and stored in `src/content/presentations/`.
- [ ] The system supports nested slide blocks defined via HTML comments.
- [ ] The system provides hierarchical navigation through slides.
- [ ] The system allows for reusable slides sourced from other files.
- [ ] Users can browse and view presentations with smooth, intuitive navigation.
- [ ] SEO best practices, including static pre-rendering and appropriate metadata, are applied to presentation pages.
- [ ] All user stories are implemented and meet their respective acceptance criteria.

## Feature Constraints

- Must be implemented using Astro.js for static site generation.
- Presentation content must be authored in MDX.
- Styling must adhere to project-established CSS patterns (e.g., CSS variables, PostCSS).
- Build and deployment processes will be managed via GitHub Actions as defined in the project overview.
- All components must follow accessibility guidelines (WCAG 2.1 AA).

## Feature Dependencies

- Relies on the core Astro.js framework and its MDX integration.
- Depends on the established project structure for content (`src/content/presentations/`), pages (`src/pages/presentations/`), layouts (`src/layouts/PresentationLayout.astro`), and components (`src/components/presentation/`).
- May depend on `BaseLayout.astro` if `PresentationLayout.astro` extends it.
- Successful implementation of Mermaid diagram pre-rendering (Story 3).

---

## Stories

### Table of Contents

- [ ] [Story 1.1: Define Presentation Frontmatter and Directory Structure](#story-11-define-presentation-frontmatter-and-directory-structure)
- [ ] [Story 1.2: Implement Basic Slide Definition via HTML Comments](#story-12-implement-basic-slide-definition-via-html-comments)
- [ ] [Story 1.3: Add Support for Optional Slide Metadata in Comments](#story-13-add-support-for-optional-slide-metadata-in-comments)
- [ ] [Story 1.4: Establish Image Handling in Presentation Subdirectories](#story-14-establish-image-handling-in-presentation-subdirectories)
- [ ] [Story 2.1: Detect Reusable Slide Links in Markdown](#story-21-detect-reusable-slide-links-in-markdown)
- [ ] [Story 2.2: Inline Content of Reusable Slides](#story-22-inline-content-of-reusable-slides)
- [ ] [Story 2.3: Preserve Regular Markdown Links](#story-23-preserve-regular-markdown-links)
- [ ] [Story 2.4: Handle Nested Reusable Slides and Prevent Cycles](#story-24-handle-nested-reusable-slides-and-prevent-cycles)
- [ ] [Story 3.1: Parse Slide Start/End Comment Tags](#story-31-parse-slide-startend-comment-tags)
- [ ] [Story 3.2: Extract Slide Metadata from HTML Comments](#story-32-extract-slide-metadata-from-html-comments)
- [ ] [Story 3.3: Build Hierarchical Navigation Tree from Slide Structure](#story-33-build-hierarchical-navigation-tree-from-slide-structure)
- [ ] [Story 3.4: Integrate Mermaid Diagram Pre-rendering](#story-34-integrate-mermaid-diagram-pre-rendering)
- [ ] [Story 3.5: Generate Unique Slide IDs and Page Numbers](#story-35-generate-unique-slide-ids-and-page-numbers)
- [ ] [Story 3.6: Configure Astro Image Optimization for Presentations](#story-36-configure-astro-image-optimization-for-presentations)
- [ ] [Story 4.1: Create Presentation Viewer Page Route and Layout](#story-41-create-presentation-viewer-page-route-and-layout)
- [ ] [Story 4.2: Render Individual Slides within the Viewer](#story-42-render-individual-slides-within-the-viewer)
- [ ] [Story 4.3: Implement Core Navigation Controls (Next/Previous Slide)](#story-43-implement-core-navigation-controls-nextprevious-slide)
- [ ] [Story 4.4: Add Keyboard Navigation Support (Next/Previous, Up/Down)](#story-44-add-keyboard-navigation-support-nextprevious-updown)
- [ ] [Story 4.5: Add Touch Navigation Support (Swipe Gestures)](#story-45-add-touch-navigation-support-swipe-gestures)
- [ ] [Story 4.6: Implement Hierarchical Navigation (Drill-Down/Return to Parent)](#story-46-implement-hierarchical-navigation-drill-downreturn-to-parent)
- [ ] [Story 4.7: Display Navigation Breadcrumbs](#story-47-display-navigation-breadcrumbs)
- [ ] [Story 4.8: Implement Presentation Overview/Grid Mode](#story-48-implement-presentation-overviewgrid-mode)
- [ ] [Story 4.9: Apply Slide Metadata (Transitions, Hidden) in Viewer](#story-49-apply-slide-metadata-transitions-hidden-in-viewer)
- [ ] [Story 5.1: Implement Lazy Loading for Off-Screen Slides](#story-51-implement-lazy-loading-for-off-screen-slides)
- [ ] [Story 5.2: Implement Pre-loading for Adjacent Slides](#story-52-implement-pre-loading-for-adjacent-slides)
- [ ] [Story 5.3: Minimize JavaScript Footprint for Presentation Viewer](#story-53-minimize-javascript-footprint-for-presentation-viewer)
- [ ] [Story 5.4: Ensure Responsive Design for Presentation Viewer](#story-54-ensure-responsive-design-for-presentation-viewer)
- [ ] [Story 5.5: Optimize Image and Asset Delivery for Presentations](#story-55-optimize-image-and-asset-delivery-for-presentations)

---

n### Story 1.1: Define Presentation Frontmatter and Directory Structure

#### Story 1.1 Description

As a content author, I need a clear directory structure and defined frontmatter for creating new presentations, ensuring consistency and discoverability.

#### Story 1.1 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 1.1 Acceptance Criteria

- [ ] Presentations are stored within `src/content/presentations/[slug]/index.mdx`.
- [ ] Each presentation's `index.mdx` frontmatter includes `title` (string, required), `description` (string, required), `author` (string, optional), and `date` (YYYY-MM-DD, required).
- [ ] A content schema (e.g., using Astro's content collections with Zod) is defined and enforced for presentation frontmatter.

#### Story 1.1 Test Cases

- [ ] Unit test: Validate frontmatter schema compliance for various valid and invalid inputs.
- [ ] E2E test: A presentation with correct frontmatter and directory structure is correctly listed and accessible.
- [ ] E2E test: Attempting to build with a presentation having invalid/missing frontmatter results in a descriptive error.

#### Story 1.1 Constraints

- Adheres to Astro's content collection patterns and best practices.

#### Story 1.1 Dependencies

- Astro project setup with content collections enabled.

---

### Story 1.2: Implement Basic Slide Definition via HTML Comments

#### Story 1.2 Description

As a content author, I want to define individual slides within a presentation's MDX file using simple HTML comment-based syntax.

#### Story 1.2 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 1.2 Acceptance Criteria

- [ ] Slides within an `index.mdx` file are demarcated by `<!-- slide-start -->` and `<!-- slide-end -->` HTML comments.
- [ ] Content between these comment pairs is treated as a single slide.
- [ ] Nested slide structures are possible by nesting these comment blocks.

#### Story 1.2 Test Cases

- [ ] Unit test: Parser correctly identifies slide blocks from sample MDX content.
- [ ] Unit test: Parser correctly identifies nested slide structures.
- [ ] E2E test: A presentation with multiple slides defined by comments renders each slide's content separately.

#### Story 1.2 Constraints

- Comment syntax must be exact and parsable.

#### Story 1.2 Dependencies

- Story 1.1 (Directory and Frontmatter Structure).
- Markdown/MDX parsing capabilities in Astro.

---

### Story 1.3: Add Support for Optional Slide Metadata in Comments

#### Story 1.3 Description

As a content author, I want to add optional metadata (like title, transition effects, or visibility) to individual slides directly within their defining HTML comments.

#### Story 1.3 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 1.3 Acceptance Criteria

- [ ] The `<!-- slide-start [metadata] -->` comment can accept a JSON-like or key-value string for metadata (e.g., `<!-- slide-start {"title": "My Slide", "transition": "fade", "hidden": false} -->`).
- [ ] Supported metadata fields include at least `title` (string), `transition` (string), `hidden` (boolean).
- [ ] Parser extracts this metadata and associates it with the slide.

#### Story 1.3 Test Cases

- [ ] Unit test: Parser correctly extracts various metadata attributes from `slide-start` comments.
- [ ] Unit test: Parser handles missing or malformed metadata gracefully (e.g., defaults).
- [ ] E2E test: Slide metadata (like a title) is accessible to the presentation viewer components.

#### Story 1.3 Constraints

- Metadata format within comments must be well-defined and consistently parsable.

#### Story 1.3 Dependencies

- Story 1.2 (Basic Slide Definition).

---

### Story 1.4: Establish Image Handling in Presentation Subdirectories

#### Story 1.4 Description

As a content author, I want to easily include images in my presentations by placing them in a subdirectory relative to the presentation file and referencing them using standard Markdown syntax.

#### Story 1.4 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 1.4 Acceptance Criteria

- [ ] Images for a presentation (e.g., `my-presentation`) can be stored in `src/content/presentations/my-presentation/images/`.
- [ ] Images are referenced in `index.mdx` using relative Markdown paths (e.g., `![Alt text](./images/my-image.png)`).
- [ ] These images are correctly processed and displayed in the rendered presentation.

#### Story 1.4 Test Cases

- [ ] E2E test: An image referenced via a relative path within a presentation's subdirectory is displayed correctly.
- [ ] E2E test: Broken image links are handled gracefully (e.g., alt text shown).

#### Story 1.4 Constraints

- Relies on Astro's asset handling for Markdown/MDX.

#### Story 1.4 Dependencies

- Story 1.1 (Directory Structure).
- Astro's image processing capabilities.

---

### Story 2.1: Detect Reusable Slide Links in Markdown

#### Story 2.1 Description

As a content author, I want to signify a reusable slide include by using a specific Markdown link format, allowing for modular presentation design.

#### Story 2.1 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 2.1 Acceptance Criteria

- [ ] A Markdown link that is the sole content of a paragraph, pointing to another `.md` or `.mdx` file (e.g., `[](./reusable-slide.mdx)`), is identified as a reusable slide reference.
- [ ] The parser distinguishes these specific links from regular Markdown links that are part of other text or have link text.

#### Story 2.1 Test Cases

- [ ] Unit test: Parser correctly identifies single-link paragraphs as potential slide includes.
- [ ] Unit test: Parser correctly ignores regular Markdown links.
- [ ] E2E test: Content containing such a link is processed differently than standard link content.

#### Story 2.1 Constraints

- The link format for reusability must be precise (sole content of a block/paragraph).

#### Story 2.1 Dependencies

- Markdown/MDX parsing capabilities.

---

### Story 2.2: Inline Content of Reusable Slides

#### Story 2.2 Description

As a content author, when I reference a reusable slide, I want its entire content (including its own slide structure) to be inlined into the referencing presentation at the point of the link.

#### Story 2.2 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 2.2 Acceptance Criteria

- [ ] The content of the MDX file referenced by a reusable slide link is fetched and processed.
- [ ] All slides defined within the referenced file are inserted into the slide structure of the parent presentation.
- [ ] If the referenced file itself contains nested slides, this structure is preserved during inlining.

#### Story 2.2 Test Cases

- [ ] Unit test: Processing a reference correctly inlines content from another file.
- [ ] E2E test: A presentation referencing another file displays the slides from the referenced file as if they were defined locally.
- [ ] E2E test: Nested slide structures from a referenced file are correctly rendered.

#### Story 2.2 Constraints

- Referenced files must be accessible and valid MDX.

#### Story 2.2 Dependencies

- Story 2.1 (Reusable Slide Link Detection).
- File system access during build process.

---

### Story 2.3: Preserve Regular Markdown Links

#### Story 2.3 Description

As a content author, I want to ensure that standard Markdown links (those with link text or inline with other text) continue to function as normal hyperlinks and are not misinterpreted as reusable slide includes.

#### Story 2.3 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 2.3 Acceptance Criteria

- [ ] Markdown links like `[Click here](./another-page.md)` are rendered as standard HTML anchor tags.
- [ ] Markdown links inline with text, e.g., `This is some text with a [link](./info.mdx) in it.`, are preserved as standard links.
- [ ] Only links matching the specific format for reusable slides (Story 2.1) are treated as includes.

#### Story 2.3 Test Cases

- [ ] Unit test: Parser correctly identifies and preserves standard Markdown links.
- [ ] E2E test: A presentation containing regular Markdown links renders them as clickable hyperlinks, navigating to the correct targets.

#### Story 2.3 Constraints

- Clear differentiation in parsing logic between slide include links and regular links.

#### Story 2.3 Dependencies

- Story 2.1 (Reusable Slide Link Detection).

---

### Story 2.4: Handle Nested Reusable Slides and Prevent Cycles

#### Story 2.4 Description

As a content author, I want the system to support reusable slides that themselves reference other reusable slides (nesting), and to gracefully handle or prevent circular dependencies.

#### Story 2.4 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 2.4 Acceptance Criteria

- [ ] The slide inlining process can handle multiple levels of references (e.g., A includes B, B includes C).
- [ ] A mechanism is in place to detect circular references (e.g., A includes B, B includes A).
- [ ] If a circular reference is detected, the build process either errors out with a clear message or breaks the cycle at a predefined depth.

#### Story 2.4 Test Cases

- [ ] Unit test: Nested slide inclusions (2-3 levels deep) are processed correctly.
- [ ] Unit test: Circular reference detection mechanism correctly identifies a simple cycle.
- [ ] E2E test: A presentation with nested reusable slides renders all content correctly.
- [ ] Build test: A build with a circular slide reference fails with an informative error message.

#### Story 2.4 Constraints

- Cycle detection might impact build performance if not optimized. Maximum depth for nesting might be considered.

#### Story 2.4 Dependencies

- Story 2.2 (Inline Content of Reusable Slides).

---

### Story 3.1: Parse Slide Start/End Comment Tags

#### Story 3.1 Description

As a developer, I need a robust parsing function that can identify `<!-- slide-start -->` and `<!-- slide-end -->` comment tags within MDX content to demarcate slide boundaries.

#### Story 3.1 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 3.1 Acceptance Criteria

- [ ] The parser correctly identifies matching pairs of `<!-- slide-start -->` and `<!-- slide-end -->`.
- [ ] The parser handles nested slide comment blocks correctly, associating content with the appropriate slide level.
- [ ] The parser can iterate through an MDX document and extract all top-level and nested slide blocks.

#### Story 3.1 Test Cases

- [ ] Unit test: Parse simple MDX with one slide block.
- [ ] Unit test: Parse MDX with multiple sibling slide blocks.
- [ ] Unit test: Parse MDX with nested slide blocks (e.g., 2-3 levels).
- [ ] Unit test: Handle malformed or unclosed slide blocks gracefully (e.g., warning or error).

#### Story 3.1 Constraints

- Parsing should be efficient enough not to significantly slow down the build process.

#### Story 3.1 Dependencies

- Access to raw MDX content before full Markdown-to-HTML conversion.

---

### Story 3.2: Extract Slide Metadata from HTML Comments

#### Story 3.2 Description

As a developer, the parser needs to extract metadata (e.g., title, transition, hidden status) from the `<!-- slide-start [metadata] -->` comment tag.

#### Story 3.2 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 3.2 Acceptance Criteria

- [ ] The parser can read the string content within the `slide-start` comment (if present after the tag itself).
- [ ] It can parse a defined metadata format (e.g., JSON-like or key-value pairs) from this string.
- [ ] Extracted metadata is stored in a structured way, associated with its corresponding slide.
- [ ] Defaults are applied for any missing optional metadata fields.

#### Story 3.2 Test Cases

- [ ] Unit test: Extract metadata `{"title": "Intro", "hidden": true}`.
- [ ] Unit test: Handle comments with no metadata: `<!-- slide-start -->`.
- [ ] Unit test: Handle malformed metadata string (e.g., parse error, provide defaults or warning).

#### Story 3.2 Constraints

- A clear specification for the metadata string format is required.

#### Story 3.2 Dependencies

- Story 3.1 (Parse Slide Start/End Comment Tags).

---

### Story 3.3: Build Hierarchical Navigation Tree from Slide Structure

#### Story 3.3 Description

As a developer, I need to process the parsed slide blocks (including those from reusable slides) to construct a hierarchical navigation tree representing the presentation's structure.

#### Story 3.3 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 3.3 Acceptance Criteria

- [ ] The output is a data structure (e.g., a tree of objects) where each node represents a slide.
- [ ] Each node contains its content (or a reference to it), its extracted metadata, its parent, and its children.
- [ ] The tree accurately reflects the nesting of slides as defined in the MDX and via reusable slide inclusions.
- [ ] Each slide in the tree has a unique ID.

#### Story 3.3 Test Cases

- [ ] Unit test: Generate tree for a simple presentation with a few flat slides.
- [ ] Unit test: Generate tree for a presentation with nested slides.
- [ ] Unit test: Generate tree for a presentation using reusable slides (flat and nested).

#### Story 3.3 Constraints

- The tree structure should be serializable or easily usable by frontend components.

#### Story 3.3 Dependencies

- Story 3.1 (Parse Slide Start/End Comment Tags), Story 3.2 (Extract Slide Metadata), Story 2.2 (Inline Content of Reusable Slides).

---

### Story 3.4: Integrate Mermaid Diagram Pre-rendering

#### Story 3.4 Description

As a developer, I want to integrate a build step that finds Mermaid diagram definitions in Markdown/MDX and pre-renders them into static SVG images.

#### Story 3.4 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 3.4 Acceptance Criteria

- [ ] Mermaid code blocks (e.g., `mermaid ... `) are identified during the build process.
- [ ] Each Mermaid diagram is converted into an SVG image.
- [ ] The original Mermaid code block in the MDX is replaced with the generated SVG (or an `<img>` tag pointing to it).
- [ ] This process occurs before the final HTML generation for slides.

#### Story 3.4 Test Cases

- [ ] Unit test: A sample Mermaid diagram is correctly converted to SVG.
- [ ] E2E test: A slide containing a Mermaid diagram displays the rendered SVG, not the raw code.
- [ ] Build test: Ensure Mermaid CLI or library is correctly invoked during the build.

#### Story 3.4 Constraints

- Requires a Mermaid rendering tool (e.g., Mermaid CLI or a library like `mermaid.js` run via Puppeteer/Playwright during build).
- Potentially adds to build time.

#### Story 3.4 Dependencies

- Astro's build customization capabilities (e.g., Remark/Rehype plugins).

---

### Story 3.5: Generate Unique Slide IDs and Page Numbers

#### Story 3.5 Description

As a developer, during the build process, each slide (including nested and reused ones) needs to be assigned a unique ID and a logical page number or hierarchical coordinate.

#### Story 3.5 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 3.5 Acceptance Criteria

- [ ] Every slide processed into the navigation tree (Story 3.3) receives a unique identifier string (e.g., `slide-1-2`, `slide-intro`).
- [ ] Slides are assigned sequential page numbers for linear flow and/or hierarchical coordinates (e.g., `1.1`, `1.2`, `2.1`) for nested structures.
- [ ] This information is stored as part of the slide's data in the navigation tree.

#### Story 3.5 Test Cases

- [ ] Unit test: Verify unique ID generation for flat and nested slide structures.
- [ ] Unit test: Verify page numbering/coordinate assignment.
- [ ] E2E test: Slide elements in the DOM have unique IDs that can be targeted.

#### Story 3.5 Constraints

- ID generation should be deterministic.

#### Story 3.5 Dependencies

- Story 3.3 (Build Hierarchical Navigation Tree).

---

### Story 3.6: Configure Astro Image Optimization for Presentations

#### Story 3.6 Description

As a developer, I want to ensure that images used within presentations are optimized by Astro's built-in image processing capabilities to improve load times and performance.

#### Story 3.6 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 3.6 Acceptance Criteria

- [ ] Astro's image optimization (`<Image>` component or Markdown image processing) is configured and functional for images within `src/content/presentations/`.
- [ ] Images are converted to modern formats (e.g., WebP) and resized appropriately where possible.
- [ ] Placeholders or LQIP (Low Quality Image Placeholders) are considered.

#### Story 3.6 Test Cases

- [ ] E2E test: Images in a presentation are served in an optimized format (e.g., WebP).
- [ ] Performance test: Lighthouse scores related to image optimization are satisfactory for a presentation page.

#### Story 3.6 Constraints

- Relies on Astro's `<Image>` component or its Markdown image integration.
- Configuration might be global or specific to presentation content.

#### Story 3.6 Dependencies

- Astro project setup with image services configured.
- Story 1.4 (Image Handling).

---

### Story 4.1: Create Presentation Viewer Page Route and Layout

#### Story 4.1 Description

As a user, I want to access a presentation via a dedicated URL (e.g., `/presentations/[slug]`) which uses a specific layout designed for presentations.

#### Story 4.1 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 4.1 Acceptance Criteria

- [ ] An Astro page route is defined at `/presentations/[slug].astro`.
- [ ] This page uses a distinct `PresentationLayout.astro` to structure the presentation viewing experience.
- [ ] The page correctly fetches the processed presentation data (navigation tree, slides) for the given slug.

#### Story 4.1 Test Cases

- [ ] E2E test: Navigating to `/presentations/my-sample-presentation` loads the presentation viewer.
- [ ] E2E test: The page uses `PresentationLayout.astro` (verifiable by unique elements or structure).

#### Story 4.1 Constraints

- Adheres to Astro's routing and layout conventions.

#### Story 4.1 Dependencies

- Story 3.3 (Build Hierarchical Navigation Tree) - to provide data to the page.
- Astro project setup.

---

### Story 4.2: Render Individual Slides within the Viewer

#### Story 4.2 Description

As a user, when viewing a presentation, I want to see the content of the current slide clearly displayed.

#### Story 4.2 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 4.2 Acceptance Criteria

- [ ] A `Slide.astro` (or similar) component is responsible for rendering the content of a single slide.
- [ ] This component takes slide data (HTML content, metadata) as props.
- [ ] The presentation viewer displays one slide at a time (or handles the visibility of slides based on current navigation state).
- [ ] Slide content, including Markdown formatting, images, and pre-rendered Mermaid diagrams, is displayed correctly.

#### Story 4.2 Test Cases

- [ ] Component test (`Slide.astro`): Renders various types of slide content correctly.
- [ ] E2E test: The content of the first slide of a presentation is visible on load.
- [ ] E2E test: Images and Mermaid diagrams within a slide are rendered.

#### Story 4.2 Constraints

- Slide rendering should be performant.

#### Story 4.2 Dependencies

- Story 4.1 (Presentation Viewer Page).
- Story 3.3 (Navigation Tree providing slide content).
- Story 3.4 (Mermaid Pre-rendering), Story 1.4 (Image Handling).

---

### Story 4.3: Implement Core Navigation Controls (Next/Previous Slide)

#### Story 4.3 Description

As a user, I want simple "Next" and "Previous" controls to navigate linearly through the top-level slides of a presentation.

#### Story 4.3 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 4.3 Acceptance Criteria

- [ ] Visible "Next" and "Previous" buttons/UI elements are present in the presentation viewer.
- [ ] Clicking "Next" advances to the next slide in the sequence.
- [ ] Clicking "Previous" returns to the previous slide.
- [ ] Controls are disabled or hidden appropriately at the beginning/end of the presentation.
- [ ] Navigation updates the current view to show the correct slide.

#### Story 4.3 Test Cases

- [ ] E2E test: Clicking "Next" shows the next slide's content.
- [ ] E2E test: Clicking "Previous" shows the previous slide's content.
- [ ] E2E test: "Previous" is disabled on the first slide; "Next" is disabled on the last slide.

#### Story 4.3 Constraints

- Navigation state needs to be managed (client-side if interactive, or via URL changes).

#### Story 4.3 Dependencies

- Story 4.1 (Presentation Viewer Page), Story 4.2 (Render Individual Slides).

---

### Story 4.4: Add Keyboard Navigation Support (Next/Previous, Up/Down)

#### Story 4.4 Description

As a user, I want to navigate through slides using keyboard arrow keys (e.g., Right/Left for next/previous, Up/Down for vertical/nested navigation if applicable).

#### Story 4.4 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 4.4 Acceptance Criteria

- [ ] Pressing the Right Arrow key (or Space, PageDown) navigates to the next slide.
- [ ] Pressing the Left Arrow key (or PageUp) navigates to the previous slide.
- [ ] If hierarchical slides exist:
  - Pressing the Down Arrow key navigates into a child/nested slide.
  - Pressing the Up Arrow key navigates out to a parent slide.
- [ ] Keyboard focus is managed appropriately for accessibility.

#### Story 4.4 Test Cases

- [ ] E2E test: Keyboard shortcuts for next/previous slide work.
- [ ] E2E test (if hierarchical): Keyboard shortcuts for up/down navigation into/out of nested slides work.
- [ ] Accessibility test: Keyboard navigation is intuitive and focus indicators are clear.

#### Story 4.4 Constraints

- JavaScript event handling required for keyboard input.

#### Story 4.4 Dependencies

- Story 4.3 (Core Navigation Controls), potentially Story 4.6 (Hierarchical Navigation).

---

### Story 4.5: Add Touch Navigation Support (Swipe Gestures)

#### Story 4.5 Description

As a user on a touch-enabled device, I want to navigate slides using swipe gestures (e.g., swipe left for next, swipe right for previous).

#### Story 4.5 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 4.5 Acceptance Criteria

- [ ] Swiping left on a touch device navigates to the next slide.
- [ ] Swiping right on a touch device navigates to the previous slide.
- [ ] Swipe gestures for vertical/nested navigation (swipe up/down) are considered if applicable.
- [ ] Gestures are responsive and feel natural.

#### Story 4.5 Test Cases

- [ ] E2E test (on touch-emulated device): Swipe gestures for next/previous slide work.
- [ ] E2E test: Accidental swipes (e.g., during scrolling if slide content is long) are minimized.

#### Story 4.5 Constraints

- JavaScript event handling for touch events.
- May require a small library or custom implementation for robust gesture detection.

#### Story 4.5 Dependencies

- Story 4.3 (Core Navigation Controls).

---

### Story 4.6: Implement Hierarchical Navigation (Drill-Down/Return to Parent)

#### Story 4.6 Description

As a user, when a slide has nested (child) slides, I want to be able to navigate into them (drill-down) and then navigate back to the parent slide.

#### Story 4.6 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 4.6 Acceptance Criteria

- [ ] If a current slide has child slides, UI indicators or controls are available to navigate "down" into the first child slide.
- [ ] When viewing a child slide, UI indicators or controls are available to navigate "up" to its parent slide.
- [ ] This navigation integrates with keyboard (Up/Down arrows) and potentially touch (Swipe Up/Down) controls.
- [ ] The presentation state correctly reflects the current position in the hierarchy.

#### Story 4.6 Test Cases

- [ ] E2E test: Navigate into a nested slide stack and back out to the parent.
- [ ] E2E test: Navigation state (e.g., URL fragment, breadcrumbs) updates correctly during hierarchical navigation.

#### Story 4.6 Constraints

- Requires a clear visual representation of hierarchy and navigation options.

#### Story 4.6 Dependencies

- Story 3.3 (Build Hierarchical Navigation Tree).
- Story 4.3 (Core Navigation Controls), Story 4.4 (Keyboard Navigation).

---

### Story 4.7: Display Navigation Breadcrumbs

#### Story 4.7 Description

As a user, I want to see breadcrumb navigation that shows my current position within the presentation's hierarchy, especially for nested slides.

#### Story 4.7 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 4.7 Acceptance Criteria

- [ ] A breadcrumb trail is displayed, indicating the path from the presentation root to the current slide.
- [ ] Each part of the breadcrumb (representing a parent slide) is clickable to navigate directly to that slide.
- [ ] Breadcrumbs update dynamically as the user navigates through the presentation.
- [ ] For top-level slides, breadcrumbs might show only the presentation title or be minimal.

#### Story 4.7 Test Cases

- [ ] E2E test: Breadcrumbs correctly show the path for a deeply nested slide.
- [ ] E2E test: Clicking a breadcrumb link navigates to the correct parent slide.
- [ ] E2E test: Breadcrumbs update when navigating using next/prev, up/down controls.

#### Story 4.7 Constraints

- Relies on the navigation tree having clear parent-child relationships and slide titles/IDs.

#### Story 4.7 Dependencies

- Story 3.3 (Build Hierarchical Navigation Tree).
- Story 4.6 (Hierarchical Navigation).

---

### Story 4.8: Implement Presentation Overview/Grid Mode

#### Story 4.8 Description

As a user, I want an "overview" or "grid" mode that displays thumbnails or titles of all slides (or a section of slides), allowing me to quickly jump to any slide.

#### Story 4.8 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 4.8 Acceptance Criteria

- [ ] A button or control toggles the presentation viewer into an overview mode.
- [ ] In overview mode, slides are displayed as a grid of thumbnails or titles.
- [ ] Clicking on a slide thumbnail/title in the overview navigates directly to that slide in the normal viewing mode.
- [ ] The overview mode should visually represent the hierarchy if applicable.

#### Story 4.8 Test Cases

- [ ] E2E test: Toggle into overview mode and see a grid of slides.
- [ ] E2E test: Click a slide in overview mode and navigate to it.
- [ ] E2E test: Overview mode is visually clear and usable.

#### Story 4.8 Constraints

- Generating thumbnails might require client-side rendering or server-side pre-generation if complex.
- Performance considerations for large presentations.

#### Story 4.8 Dependencies

- Story 3.3 (Build Hierarchical Navigation Tree).
- Story 4.2 (Render Individual Slides - potentially for thumbnails).

---

### Story 4.9: Apply Slide Metadata (Transitions, Hidden) in Viewer

#### Story 4.9 Description

As a user, I want the presentation viewer to respect metadata associated with slides, such as custom transitions between slides or marking certain slides as hidden from the main sequence.

#### Story 4.9 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 4.9 Acceptance Criteria

- [ ] If a slide has a `transition` specified in its metadata, that transition effect is used when navigating to/from it.
- [ ] If a slide is marked as `hidden: true`, it is skipped during normal next/previous navigation but may still be accessible via direct link or overview mode (TBD).
- [ ] Other metadata (e.g., slide `title`) is used appropriately (e.g., in breadcrumbs, overview).

#### Story 4.9 Test Cases

- [ ] E2E test: A specified slide transition (e.g., "fade") is observable.
- [ ] E2E test: A hidden slide is skipped during linear navigation.
- [ ] E2E test (if hidden slides are accessible): Navigate to a hidden slide via a direct link/overview.

#### Story 4.9 Constraints

- Transition effects might require CSS animations/transitions or a small JS library.
- Defining behavior of "hidden" slides (fully inaccessible vs. accessible via other means) is crucial.

#### Story 4.9 Dependencies

- Story 1.3 (Support for Optional Slide Metadata).
- Story 3.2 (Extract Slide Metadata).
- Story 4.3 (Core Navigation Controls).

---

### Story 5.1: Implement Lazy Loading for Off-Screen Slides

#### Story 5.1 Description

As a user, I want presentations to load quickly, with content for slides not currently in view (or imminently next/previous) being loaded on demand to save initial load time and resources.

#### Story 5.1 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 5.1 Acceptance Criteria

- [ ] Only the current slide (and possibly immediately adjacent slides for pre-loading) has its full content (especially images, iframes) loaded initially.
- [ ] Content for other slides is loaded as they are about to be navigated to.
- [ ] This is achieved using browser Intersection Observer API or similar techniques.
- [ ] Placeholders might be shown for not-yet-loaded heavy content.

#### Story 5.1 Test Cases

- [ ] Performance test: Initial load time of a presentation with many images is significantly reduced.
- [ ] Network panel test: Verify that images/assets for far-off slides are not loaded until needed.
- [ ] E2E test: Navigation remains smooth, and content appears correctly as slides are loaded.

#### Story 5.1 Constraints

- Requires client-side JavaScript.
- Complexity in managing loading state.

#### Story 5.1 Dependencies

- Story 4.2 (Render Individual Slides).
- Astro's client-side script capabilities.

---

### Story 5.2: Implement Pre-loading for Adjacent Slides

#### Story 5.2 Description

As a user, I want navigation between slides to feel instantaneous, by pre-loading the content of the immediately next and previous slides.

#### Story 5.2 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 5.2 Acceptance Criteria

- [ ] When a slide is viewed, the content for the slide immediately following and preceding it is proactively loaded in the background.
- [ ] This pre-loading does not interfere with the current slide's interactivity or performance.
- [ ] Pre-loading considers hierarchical structure (e.g., first child, parent).

#### Story 5.2 Test Cases

- [ ] Network panel test: Verify that assets for adjacent slides are loaded after the current slide is stable.
- [ ] E2E test: Navigation to an adjacent slide that has been pre-loaded is very fast.

#### Story 5.2 Constraints

- Balances eagerness of pre-loading with bandwidth conservation.

#### Story 5.2 Dependencies

- Story 5.1 (Lazy Loading - as pre-loading is a specific strategy on top of lazy loading).

---

### Story 5.3: Minimize JavaScript Footprint for Presentation Viewer

#### Story 5.3 Description

As a developer, I want to ensure the presentation viewer uses minimal client-side JavaScript to maintain fast performance and align with Astro's philosophy.

#### Story 5.3 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 5.3 Acceptance Criteria

- [ ] Client-side JavaScript is only used for essential interactivity (navigation, transitions, lazy/pre-loading).
- [ ] Leverage Astro's partial hydration or islands architecture where possible for UI components requiring JS.
- [ ] Analyze JS bundle size and strive to keep it small.
- [ ] Avoid heavy JS libraries if native browser APIs or lightweight alternatives suffice.

#### Story 5.3 Test Cases

- [ ] Performance audit (Lighthouse): JavaScript bundle size and execution time are within acceptable limits.
- [ ] Code review: Ensure efficient use of client-side JS and Astro hydration.

#### Story 5.3 Constraints

- Some features (interactive navigation, transitions) inherently require some JS.

#### Story 5.3 Dependencies

- All stories involving client-side interactivity (4.x, 5.1, 5.2).
- Astro's rendering and hydration mechanisms.

---

### Story 5.4: Ensure Responsive Design for Presentation Viewer

#### Story 5.4 Description

As a user, I want to view presentations effectively on various devices, including desktops, tablets, and mobile phones, with a responsive layout.

#### Story 5.4 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 5.4 Acceptance Criteria

- [ ] Slide content reflows and scales appropriately for different viewport sizes.
- [ ] Navigation controls are accessible and usable on all screen sizes.
- [ ] Font sizes, spacing, and image scaling are responsive.
- [ ] No horizontal scrolling is required on smaller screens for primary content.

#### Story 5.4 Test Cases

- [ ] E2E test: View presentation on emulated mobile, tablet, and desktop sizes; verify layout and usability.
- [ ] Visual regression testing (optional): Catch unintended layout shifts across devices.

#### Story 5.4 Constraints

- Requires careful CSS design using media queries, flexible units, and potentially container queries.

#### Story 5.4 Dependencies

- All UI components (Slide.astro, NavigationControls, etc.).
- Project's global CSS and styling approach.

---

### Story 5.5: Optimize Image and Asset Delivery for Presentations

#### Story 5.5 Description

As a developer, all assets (images, fonts, CSS, JS) related to presentations must be optimized for fast delivery and rendering.

#### Story 5.5 Status

- [ ] Backlog
- [ ] In Progress
- [ ] Done

#### Story 5.5 Acceptance Criteria

- [ ] Images are served in modern, compressed formats (e.g., WebP, AVIF) with appropriate dimensions (covered by Story 3.6 but re-emphasized for delivery).
- [ ] CSS and JavaScript assets are minified and efficiently bundled.
- [ ] Caching strategies (browser caching, ETags) are effectively utilized for static assets.
- [ ] Consider using a CDN for assets if applicable for the hosting platform (GitHub Pages has some CDN capabilities).

#### Story 5.5 Test Cases

- [ ] Performance audit (Lighthouse, WebPageTest): Asset sizes, delivery times, and caching headers are optimal.
- [ ] Network panel analysis: Verify compression and formats of delivered assets.

#### Story 5.5 Constraints

- Depends on Astro's build output and hosting platform capabilities.

#### Story 5.5 Dependencies

- Story 3.6 (Astro Image Optimization).
- Astro build process.
- GitHub Pages hosting specifics.

</rewritten_file>
