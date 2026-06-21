# Blogsite Project Plan

## Overview
A clean, minimalist single-author blogsite built with Astro, deployed to GitHub Pages. Content is managed via markdown files committed to the repository.

## Tech Stack
- **Framework**: Astro (static site generator)
- **Hosting**: GitHub Pages
- **Comments**: giscus (GitHub Discussions-based)
- **Markdown**: Local `.md` files in a `content/` directory
- **Deployment**: GitHub Actions CI/CD to GitHub Pages

## Features
- Blog listing page with all posts
- Individual post pages
- Search functionality (client-side)
- Tags/categories system
- Dark mode support
- SEO optimization (meta tags, sitemap, Open Graph)
- Comments via giscus on each post
- Detailed about page
- Responsive design

## Content Structure
```
content/
  posts/
    post-1.md
    post-2.md
    ...
```

Each post includes frontmatter:
- `title`
- `date`
- `description`
- `tags`
- `coverImage` (optional)

## Pages
1. **Home** — Blog listing with featured posts, search bar, tag filters
2. **Post** — Individual post page with content, comments, related posts
3. **About** — Detailed bio page
4. **Tags** — Tag index page showing all posts grouped by tag

## Design Direction
- Refer to DESIGN.md for all things related to the frontend design
- Must use the frontend-design skill

## Project Structure
```
blogsite/
  public/
    favicon.ico
    og-image.png
  src/
    content/
      config.ts
    configs/
      astro.config.ts
    lib/
      utils.ts
    styles/
      global.css
    pages/
      index.astro
      posts/
        [slug].astro
      about.astro
      tags.astro
      tags/[tag].astro
    components/
      Layout.astro
      Header.astro
      Footer.astro
      PostCard.astro
      SearchBar.astro
      Tag.astro
      GiscusComments.astro
      DarkModeToggle.astro
      SeoHead.astro
  package.json
  tsconfig.json
  .github/
    workflows/
      deploy.yml
  PLAN.md
```

## Development Phases

### Phase 1: Setup & Core
- Initialize Astro project
- Configure TypeScript
- Set up directory structure
- Configure GitHub Actions for deployment

### Phase 2: Content Layer
- Create content collection configuration
- Build markdown parsing utilities
- Create sample posts with frontmatter
- Implement tag system

### Phase 3: Pages & Components
- Build Layout component (Header, Footer, content slot)
- Build Home page with post listing
- Build Post page with rendering
- Build About page
- Build Tags page + tag index page

### Phase 4: Features
- Implement search functionality
- Add dark mode toggle
- Integrate giscus comments
- Add SEO metadata (meta tags, sitemap, Open Graph)

### Phase 5: Styling & Polish
  - Apply brutalist terminal design system (DESIGN.md)
  - Near-black background (#0a0a0a) with terminal blue accent (#4a9eff)
  - Monospace headings/prompts, sans-serif body text
  - Terminal prompts (`naees@writes:~$`) as section headers
  - `~~~` dividers instead of `<hr>`
  - No card containers, no rounded corners, no gradients
  - Dark/light mode toggle with text labels
  - Terminal-style footer navigation (`→ home`, `→ about`, etc.)
  - Monospace tag links with `#` prefix
  - Light mode support
  - Responsive design (mobile tested)
  - Cross-browser testing (Playwright visual testing complete)

### Phase 6: Testing & Deployment
  - Test all pages and features ~~✅~~
  - Verify GitHub Pages deployment
  - Final polish and bug fixes ~~✅~~

### Phase 7: Improvements & Polish
  - Add more sample posts (3+ posts across different topics) ~~✅ 6 posts exist~~
  - Fix giscus integration (replace placeholder repo ID/category ID with real values)
  - Add RSS feed support ~~✅~~
  - Improve the about page content (add more bio detail, photo placeholder)
  - Add reading time indicator on post pages ~~✅~~
  - Improve the tags page layout (group by tag, show post counts) ~~✅~~
  - Add a custom 404 page ~~✅~~
  - Accessibility improvements (aria labels, semantic HTML, focus styles) ~~✅~~

## Subagents

### Subagent 1: Setup & Configuration
- Initialize Astro project
- Configure TypeScript, linting
- Set up GitHub Actions workflow for GitHub Pages
- Configure content collections

### Subagent 2: Content Layer & Data Layer
- Create content collection schema
- Build markdown processing utilities
- Create sample content
- Implement tag/category system
- Build search index generation

### Subagent 3: Pages & Components
- Build Layout, Header, Footer components
- Build Home page with post listing
- Build individual Post page
- Build About page
- Build Tags page and tag index pages
- Build PostCard component

### Subagent 4: Features & Styling
- Implement search functionality
- Add dark mode toggle
- Integrate giscus comments
- Add SEO optimization
- Apply design system and styling
- Responsive design implementation

## Security Considerations
- No server-side code — fully static
- giscus uses GitHub token (stored as GitHub secret)
- No database, no API keys required
- Content managed via git (version controlled)

## Open Questions
- (To be addressed during development)
