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
- Iterative visual verification using Playwright MCP screenshots after each implementation phase

## Project Structure
```
blogsite/
  public/
    favicon.ico
    og-image.png
    haku.svg
    naeesWriteTypographyLogoWithHaku.svg
    typography-logo.svg
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

### Phase 1-4: Setup, Content, Pages, Features — ✅ Completed
- Astro project initialized with TypeScript
- Content collection configured with 6 sample posts
- All pages built (Home, Post, About, Tags, 404, tag archives)
- Search functionality, dark mode toggle, giscus comments, SEO metadata
- RSS feed, sitemap, Open Graph images

### Phase 5: Terminal Aesthetic — ✅ Completed
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

### Phase 6-7: Improvements & Polish — ✅ Completed
- 6 posts across different topics
- RSS feed support
- Reading time indicator on post pages
- Tag index with post counts
- Custom 404 page
- Accessibility improvements (aria labels, semantic HTML, focus styles)

---

### Phase 8: Visual Enhancement (Next)

#### Phase 8.1: Global CSS Updates
**Files:** `src/styles/global.css`
- Update color variables: warm text (`#e6e3d9`, `#7a7568`), new `--accent-glow: #4a9eff`
- Add animation keyframes: `blink`, `pulseGlow`, `lineIn`
- Add `.scanlines` and `.grain` overlay classes (homepage only)
- Add `.nav-hidden` and `.nav-scrolled` classes for scroll-aware nav
- Add `.typing-line` class for sequential animation
- Update button styles with offset shadow (`4px 4px 0 0 var(--bg-hover)`)
- Update link hover with glow effect
- **Review:** `npm run build` + Playwright screenshots of all pages

#### Phase 8.2: Header with Haku Logo
**File:** `src/components/Header.astro`
- Replace `naees@writes:~$` text with `naeesWriteTypographyLogoWithHaku.svg`
- Add scroll-aware behavior (hide/reappear on scroll)
- Add `is-scrolled` class with frosted glass background
- Add blue `drop-shadow` on logo hover
- Ensure logo links to home
- **Review:** `npm run build` + Playwright screenshots of header on all pages

#### Phase 8.3: Homepage Animations
**File:** `src/pages/index.astro`
- Add glowing eye-dot near hero title (signature element)
- Add typing animation to `ls -la posts/` prompt
- Add blinking cursor to active prompt
- Add CRT scanline overlay (homepage only)
- Add film grain overlay (homepage only)
- **Review:** `npm run build` + Playwright screenshots of homepage (dark/light)

#### Phase 8.4: About Page Animations
**File:** `src/pages/about.astro`
- Add typing animation to `whoami` prompt
- Add typing animation to `cat about.txt` prompt
- Add blinking cursor to all prompts
- **Review:** `npm run build` + Playwright screenshots of about page

#### Phase 8.5: Tags Page Animations
**File:** `src/pages/tags.astro`
- Add typing animation to `find` prompt
- Add blinking cursor
- **Review:** `npm run build` + Playwright screenshots of tags page

#### Phase 8.6: Post Page Animations
**File:** `src/pages/posts/[slug].astro`
- Add typing animation to `cat posts/[slug].md` prompt
- Add blinking cursor
- **Review:** `npm run build` + Playwright screenshots of post page

#### Phase 8.7: 404 Page Animations
**File:** `src/pages/404.astro`
- Add typing animation to `cat /dev/null` prompt
- Add blinking cursor
- **Review:** `npm run build` + Playwright screenshots of 404 page

#### Phase 8.8: Footer Polish + Final Review
**Files:** `src/components/Footer.astro`, all pages
- Add offset shadow to buttons
- Verify mobile responsiveness across all pages
- Verify dark/light mode consistency
- Performance check (scanlines/grain overhead, animation performance)
- Update DESIGN.md and PLAN.md with any decisions made during implementation
- **Review:** Full Playwright screenshot suite (all pages, dark/light modes)

---

## Review Process

After each phase of implementation:

1. **Build**: `npm run build` to verify no errors
2. **Screenshot**: Use Playwright MCP to capture visual test screenshots of all pages (dark and light modes)
3. **Review**: Compare screenshots against DESIGN.md specifications
4. **Fix**: Adjust any visual inconsistencies before moving to next phase
5. **Document**: Update DESIGN.md and PLAN.md with any decisions made during implementation

This ensures visual consistency and catches issues early. The **frontend-design skill** should be loaded during implementation for design guidance. Playwright MCP screenshots are used for iterative visual verification.

## Security Considerations
- No server-side code — fully static
- giscus uses GitHub token (stored as GitHub secret)
- No database, no API keys required
- Content managed via git (version controlled)