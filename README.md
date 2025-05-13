# Blog & Presentations Platform

A modern static site for hosting blog posts and presentation content, built with Astro and SolidJS.

## Tech Stack

- **Astro** - Static site framework for content-focused websites
- **SolidJS** - Reactive UI library for client-side interactivity
- **TypeScript** - Type safety across the codebase
- **CSS Modules** - Scoped styling for components
- **Playwright** - End-to-end testing with browser automation

## Project Structure

```
blogs/
├── src/ - Frontend source code
│   ├── components/ - UI components
│   │   ├── static/ - Astro components for server rendering
│   │   ├── dynamic/ - SolidJS components for client interactivity
│   │   └── foundation/ - Base UI building blocks
│   ├── layouts/ - Page layouts and templates
│   ├── pages/ - Route definitions and page components
│   └── store/ - State management and data access
│       ├── repository/ - External system interfaces
│       ├── service/ - Business logic and store integration
│       └── utilities/ - Shared helper functions
├── public/ - Static assets
├── tests/ - Playwright end-to-end tests
```

## Development

### Setup

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

The site will be available at [http://localhost:4321](http://localhost:4321).

### Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint code checks
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run Playwright tests
- `pnpm test:ui` - Run Playwright tests with UI

## Deployment

The site is configured for GitHub Pages deployment using GitHub Actions. To deploy:

1. Push changes to the `main` branch
2. GitHub Action workflow will build and deploy automatically
3. The site will be available at your configured GitHub Pages URL

## Testing

End-to-end tests are written with Playwright. Run the tests with:

```bash
pnpm test
```

Tests validate navigation, accessibility, and responsive design.

```sh
pnpm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
