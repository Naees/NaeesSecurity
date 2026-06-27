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

### Phase 8: Visual Enhancement — ✅ Completed

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

### Phase 9: Tags Page Revamp (Option C — Hybrid) — ✅ Completed

#### Phase 9.1: Tags Index Page — Filterable Tag Pills + Post List
**Files:** `src/pages/tags.astro`, `src/components/Tag.astro`, `src/styles/global.css`

**Goal:** Replace the current redundant tag list + grouped posts layout with a clean hybrid layout.

**Tag pills section:**
- Display all 7 tags as colored pill badges at the top (reusing `Tag.astro` component)
- Add a "Show All" pill (default active state)
- Each pill shows tag name + post count
- Active tag gets blue glow via `pulseGlow` animation
- Clicking a pill triggers client-side filtering (no page reload)

**Post list section:**
- Single chronological post list below (no grouping by tag)
- Each post shows date, title, description, and inline tags
- Clicking a tag pill filters posts via client-side JS
- Smooth opacity transition on filtered posts
- "Show All" resets to unfiltered view

**Client-side filtering:**
- Each post card gets `data-tags` attribute with slugified tag list
- Each tag pill gets `data-tag` attribute
- JS toggles `display` on `.post-item` elements based on tag match
- Active pill gets `.tag-pill--active` class with blue glow

**Terminal aesthetic:**
- Keep `find` prompt above tag pills
- Keep `grep` prompt above post list
- Keep `~~~` dividers between sections

**Review:** `npm run build` + Playwright screenshots (dark/light)

#### Phase 9.2: Tag Archive Page — Back Link + Polish
**File:** `src/pages/tags/[tag].astro`

**Goal:** Minor UX improvements to the individual tag archive page.

- Add "← Back to all tags" link at the top
- Keep existing `grep` terminal prompt + post list
- Ensure active state styling matches tags index
- Keep existing empty state ("No posts found.")

**Review:** `npm run build` + Playwright screenshots

#### Phase 9.3: CSS — Tag Pill Styles
**File:** `src/styles/global.css`

**New styles:**
```css
.tag-pill {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  font-size: 0.8rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  text-decoration: none;
  color: var(--text-dim);
  transition: all 0.15s ease;
  cursor: pointer;
}
.tag-pill:hover {
  color: var(--accent);
  border-color: var(--accent);
}
.tag-pill--active {
  color: var(--accent);
  border-color: var(--accent);
  animation: pulseGlow 2s ease-in-out infinite;
}
.tag-filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.post-item--filtered {
  transition: opacity 0.2s ease;
}
.post-item--hidden {
  opacity: 0.15;
  pointer-events: none;
}
```

**Review:** Manual visual check

---

### Phase 10: Heuristic Auto-Tagging — ✅ Completed

#### Phase 10.1: Keyword-to-Tag Map
**File:** `src/lib/utils.ts` (new function `TAG_KEYWORD_MAP`)

**Map structure:**
```typescript
export const TAG_KEYWORD_MAP: Record<string, string[]> = {
  'design': ['design', 'ui', 'ux', 'layout', 'typography', 'color', 'minimal', 'visual', 'aesthetic', 'interface'],
  'philosophy': ['philosophy', 'thought', 'meaning', 'value', 'principle', 'mindset', 'perspective', 'reflection'],
  'technology': ['technology', 'tech', 'tool', 'software', 'stack', 'system', 'architecture', 'build', 'code'],
  'webdev': ['web', 'html', 'css', 'javascript', 'frontend', 'backend', 'server', 'deploy', 'hosting', 'static'],
  'security': ['security', 'threat', 'attack', 'vulnerability', 'risk', 'defense', 'privacy', 'encryption', 'auth'],
  'writing': ['write', 'writing', 'word', 'narrative', 'story', 'prose', 'voice', 'craft'],
  'meta': ['meta', 'blog', 'update', 'note', 'introduction', 'welcome'],
}
```

**Review:** Manual review

#### Phase 10.2: Auto-Tag Suggestion Script
**File:** `scripts/auto-tag.ts`

**Function: `suggestTags(title, description, body, existingTags)`**
- Scans title (2x weight), description (1.5x), body (1x) for keyword matches
- Counts matches per tag
- Returns top 3-4 tags with highest scores
- Excludes tags already in `existingTags`
- Score threshold to avoid noisy suggestions

**Script behavior:**
- Reads all posts from `src/content/posts/`
- Calls `suggestTags()` for each post
- Outputs `.auto-tags.json` to `dist/.auto-tags.json`
- Prints suggestions to console with `[ACCEPT] / [SKIP]` prompts
- **Non-destructive by default** — does NOT modify source files
- If user confirms, updates post frontmatter directly with `front-matter` npm package

**Review:** Run script, verify suggestions against existing tags

#### Phase 10.3: Build Integration
**File:** `package.json`

```json
"scripts": {
  "prebuild": "node --import tsx scripts/auto-tag.ts",
  "auto-tag": "node --import tsx scripts/auto-tag.ts",
  ...
}
```

**Review:** `npm run build` verifies no errors

---

### Phase 11: Frontend Fixes (DESIGN.md Compliance) — ✅ Completed

#### Phase 11.1: Remove Colored Tag Pills — Use Monospace Text
**Files:** `src/components/Tag.astro`, `src/components/PostCard.astro`

**DESIGN.md §11 §225-228 violation:** Tags should be monospace text links, not colored pills.

**Changes:**
- `Tag.astro`: Remove color hash logic, render as plain monospace `<a>` with `#` prefix
- `PostCard.astro`: Remove color hash logic, render tags as plain monospace `<a>` with `#` prefix
- Update CSS to remove `.tag-{color}` classes
- Keep `data-tag` attribute for client-side filtering (Phase 9)

**Review:** Compare against DESIGN.md §225-228

#### Phase 11.2: Remove Tags from Homepage
**File:** `src/pages/index.astro`

**DESIGN.md §187 violation:** "no tags displayed on homepage"

**Changes:**
- Remove tag rendering block (lines 53-58) from homepage post items
- Keep tags on post detail pages and tag archive pages

**Review:** `npm run build` + Playwright screenshot of homepage

#### Phase 11.3: Fix Giscus Dark Mode Sync
**File:** `src/components/GiscusComments.astro`

**Bug:** `#dark-mode-toggle` (ID selector) doesn't match `.dark-mode-toggle` (class selector) used in `Header.astro`

**Changes:**
- Use `document.querySelector('.dark-mode-toggle')` instead of `getElementById`
- Add `MutationObserver` to detect theme changes via `[data-theme]` attribute
- Re-load Giscus on any theme change (not just toggle click)

**Review:** Test dark mode toggle on post pages with comments

#### Phase 11.4: Fix Undefined `--border` CSS Variable
**Files:** `src/components/PostCard.astro`, `src/styles/global.css`

**Bug:** `PostCard.astro:39` references `var(--border)` which is not defined in `:root`

**Changes:**
- Add `--border: #1a1a1a` to `:root` dark variables
- Add `--border: #d0d0d0` to `[data-theme='light']` variables
- Verify `PostCard.astro`, `Tag.astro`, and any other files using `var(--border)`

**Review:** Manual visual check

#### Phase 11.5: Clean Up Duplicate `.btn` Class
**File:** `src/styles/global.css`

**Issue:** `.btn` defined twice (lines 405-421 and 583-601). Second definition overrides the first.

**Changes:**
- Merge both `.btn` definitions into a single rule
- Keep offset shadow behavior from the second definition
- Remove the duplicate

**Review:** `npm run build` + visual check on 404 page button

#### Phase 11.6: Style Post Page Tags
**File:** `src/pages/posts/[slug].astro`

**Issue:** Tags rendered as plain `#{tag}` links with no visual distinction from body text.

**Changes:**
- Wrap tags in a styled container with monospace font
- Add `#` prefix styling (accent color)
- Separate from body text with `~~~` divider
- Follow terminal aesthetic pattern

**Review:** `npm run build` + Playwright screenshot of post page

---

### Phase 12: Minor Enhancements — ✅ Completed

#### Phase 12.1: Add RSS Feed Icon to Navigation
**File:** `src/components/Header.astro`

**Changes:**
- Add RSS icon link to nav (between `tags` and GitHub)
- Link to `/rss.xml`
- Use RSS icon SVG (inline or from public assets)
- Tooltip or aria-label: "RSS feed"

**Review:** Visual check on all pages

#### Phase 12.2: Add Site-Wide Post Count + Last Updated
**Files:** `src/components/Footer.astro` or `src/components/Header.astro`

**Changes:**
- Display total post count (e.g., "6 posts")
- Display last updated date
- Terminal-style format: `6 posts · last updated Jun 10, 2025`
- Monospace font, dim color

**Review:** Visual check

#### Phase 12.3: Update DESIGN.md Decisions Log
**File:** `DESIGN.md` section 14

**Changes:**
- Update all "planned" entries in section 14 to "done" for Phase 8 items
- Add new entries for Phase 9-12 decisions

---

### Phase 13: Giscus Discussion Sync — ✅ Completed

#### Phase 13.1: Giscus Config Update
**File:** `src/components/GiscusComments.astro`

**Changes:**
- Updated `repo-id` to `R_kgDOTAHAGQ`
- Updated `category` to `Announcements`
- Updated `category-id` to `DIC_kwDOTAHAGc4C_itP`
- Updated `data-input-position` to `top`

**Review:** Giscus comments render on post pages with correct repo/category.

#### Phase 13.2: Auto-Create Giscus Discussions for New Posts
**Files:** `scripts/sync-discussions.ts`, `.github/workflows/sync-discussions.yml`, `package.json`

**Goal:** Automatically create a GitHub Discussion in the Announcements category for each new blog post, so giscus can link comments to the correct discussion.

**`scripts/sync-discussions.ts`:**
- Reads all posts from `src/content/posts/`
- Fetches existing discussions from GitHub Discussions API
- Compares post slugs against discussion titles (format: `https://naees.github.io/NaeesWrites/posts/{slug}/`)
- Creates a new discussion if one doesn't exist for a post
- Skips posts that already have a matching discussion
- Requires `GITHUB_TOKEN` environment variable

**`.github/workflows/sync-discussions.yml`:**
- Triggers on `push` to `main` when `src/content/posts/` changes
- Runs `npm run sync-discussions`
- Uses built-in `GITHUB_TOKEN` with `discussions: write` permission

**`package.json`:**
- Added `"sync-discussions": "node --import tsx scripts/sync-discussions.ts"` script

**Review:** Push a new post, verify discussion is auto-created in GitHub Discussions.

---

### Phase 14: New Light/Dark Logos & Background Images — ✅ Completed

#### Phase 14.1: Replace Background Images with Logo Versions
**Files:** `public/kittenwiz_background_lightmode.svg`, `public/kittenwiz_background_darkmode.svg`, `public/kittenwiz_logo_lightmode.svg`, `public/kittenwiz_logo_darkmode.svg`, `public/typography_and_logo_lightmode.svg`, `public/typography_and_logo_darkmode.svg`, `src/components/Header.astro`, `src/components/Layout.astro`

**Changes:**
- Added new light/dark logo SVGs (`kittenwiz_logo_lightmode.svg`, `kittenwiz_logo_darkmode.svg`)
- Added new light/dark background SVGs (`kittenwiz_background_lightmode.svg`, `kittenwiz_background_darkmode.svg`)
- Added new light/dark typography logos (`typography_and_logo_lightmode.svg`, `typography_and_logo_darkmode.svg`)
- Updated `Header.astro` to reference new typography logo filenames
- Updated `Layout.astro` to reference new background image filenames

**Review:** Visual check on all pages in dark/light modes.

### Phase 15: Mobile Hamburger Menu & Logo — ✅ Completed

#### Phase 15.1: Mobile Navigation
**Files:** `src/components/Header.astro`, `src/components/Layout.astro`, `src/styles/global.css`

**Changes:**
- Added mobile hamburger button (`<button class="hamburger">`) with 3-line icon
- Added mobile nav overlay (`<div class="mobile-nav">`) with slide-in animation from right
- Added mobile-specific logo images (`site-logo--mobile-light`, `site-logo--mobile-dark`)
- Added CSS for mobile nav: `position: fixed`, `top: 0`, `right: 0`, `width: 100%`, `height: 100vh`
- Added `translateX(100%)` → `translateX(0)` animation for slide-in
- Added JS: hamburger click toggle, link click close, click-outside close
- Added `@media (max-width: 768px)` rules: show hamburger, show mobile nav, hide desktop nav

**Review:** Manual mobile testing + Playwright screenshots.

### Phase 16: Watermark Sizing & Mobile Nav Opacity — ✅ Completed

#### Phase 16.1: Watermark Resize
**File:** `src/styles/global.css`

**Changes:**
- `.haku-watermark`: width `600px` → `85vmin`, height `auto`, right `-5%`
- `.haku-watermark--glow`: width `120vmin`, height `120vmin` (was `800px`/`800px`)
- Watermark opacity: `0.035` (light), `0.025` (dark)

#### Phase 16.2: Mobile Nav Background Opacity
**File:** `src/styles/global.css`

**Changes:**
- `.mobile-nav` background: `rgba(10, 10, 10, 0.98)` (dark), `rgba(244, 244, 244, 0.98)` (light)

**Review:** Visual check on watermark size and mobile nav opacity.

### Phase 17: TypeScript Assertion Cleanup — ✅ Completed

#### Phase 17.1: Remove `as HTMLElement` / `as HTMLImageElement` from Inline Scripts
**Files:** `src/components/Header.astro`, `src/components/Layout.astro`

**Changes:**
- Removed all `as HTMLElement` and `as HTMLImageElement` type assertions from `is:inline` scripts
- Astro inline scripts run in browser context — TypeScript types are stripped at build time, causing `ReferenceError` in browser
- All DOM queries now use plain `document.querySelector()` returning `HTMLElement | null`

**Review:** `npm run build` + verify no console errors.

### Phase 18: Mobile Logo Visibility Bug Fixes — ✅ Completed

#### Phase 18.1: Fix Simultaneous Desktop + Mobile Logo Display
**Files:** `src/components/Header.astro`, `src/styles/global.css`

**Bug:** Both desktop and mobile logos were visible on desktop (mobile logos had inline `display: none` but CSS `!important` overrode it). Also, mobile logos didn't hide when resizing from mobile to desktop.

**Changes:**
- `Header.astro`: Mobile logos inline `display: none` (default hidden)
- `Header.astro`: `updateLogo()` checks `window.matchMedia('(max-width: 768px)').matches` to only toggle mobile logos on mobile
- `Header.astro`: Always explicitly set mobile logo display on every call (reset on theme change)
- `Header.astro`: Added `mql.addListener()` for resize detection
- `global.css`: Removed `.site-logo--mobile-light/dark` CSS rules (JS handles all visibility)

**Review:** Test resize from desktop → mobile → desktop. Verify only one logo set visible at a time.

---

## Review Process

After each phase of implementation:

1. **Build**: `npm run build` to verify no errors
2. **Screenshot**: Use Playwright MCP to capture visual test screenshots of all pages (dark and light modes)
3. **Review**: Compare screenshots against DESIGN.md specifications
4. **Fix**: Adjust any visual inconsistencies before moving to next phase
5. **Document**: Update DESIGN.md and PLAN.md with any decisions made during implementation

This ensures visual consistency and catches issues early. The **frontend-design skill** should be loaded during implementation for design guidance. Playwright MCP screenshots are used for iterative visual verification.

### Phase 19: Tag Integration + Post Page Redesign + Cross-Page Standardization

#### Phase 19.1: Posts Page — Add Tag Pill Filter Bar
**File:** `src/pages/posts.astro`

**Add imports (top of file, after existing imports):**
```typescript
import { getAllTags, getTagCount, slugify } from '../lib/utils'
```

**Add tag data computation (after posts array):**
```typescript
const allTags = getAllTags(posts)
const tagCounts = getTagCount(posts)
```

**Add tag pill bar (after search input, before `#posts-list`):**
```html
<section id="tag-filter">
  <div class="tag-filter-bar" id="tag-filter-bar">
    <a href={`${base}posts/`} class="tag-pill tag-pill--active" data-tag="all">
      show all
    </a>
    {allTags.map(tag => (
      <a href={`${base}posts/?tag=${encodeURIComponent(tag)}`} class="tag-pill" data-tag={slugify(tag)}>
        {tag}<span class="tag-count">[{tagCounts.get(tag)}]</span>
      </a>
    ))}
  </div>
</section>
```

**Add `data-tags` attribute to post items:**
```html
<div class="post-item" role="listitem"
     data-title={post.data.title.toLowerCase()}
     data-desc={post.data.description.toLowerCase()}
     data-tags={post.data.tags?.map(t => slugify(t)).join(' ')}>
```

**Replace `<script>` block with combined tag + search filtering:**
```html
<script>
  const searchInput = document.getElementById('search-input')
  const tagFilterBar = document.getElementById('tag-filter-bar')
  const postsList = document.getElementById('posts-list')
  const items = postsList?.querySelectorAll('.post-item')
  const pills = tagFilterBar?.querySelectorAll('.tag-pill')

  let activeTag = 'all'

  function filterPosts() {
    const query = (searchInput?.value || '').toLowerCase()
    items?.forEach(item => {
      const title = (item as HTMLElement).dataset.title || ''
      const desc = (item as HTMLElement).dataset.desc || ''
      const tags = (item as HTMLElement).dataset.tags || ''

      const tagMatch = activeTag === 'all' || tags.includes(activeTag)
      const searchMatch = !query || title.includes(query) || desc.includes(query)
      const visible = tagMatch && searchMatch

      ;(item as HTMLElement).style.display = visible ? '' : 'none'
    })
  }

  tagFilterBar?.addEventListener('click', (e) => {
    const pill = (e.target as HTMLElement).closest('.tag-pill')
    if (!pill) return

    e.preventDefault()
    const tag = pill.dataset.tag || 'all'
    activeTag = tag

    const url = tag === 'all'
      ? base + 'posts/'
      : base + 'posts/?tag=' + encodeURIComponent(tag)
    history.pushState({ tag }, '', url)

    pills?.forEach(p => p.classList.remove('tag-pill--active'))
    pill.classList.add('tag-pill--active')

    filterPosts()
  })

  searchInput?.addEventListener('input', () => filterPosts())

  window.addEventListener('popstate', (e) => {
    const state = e.state || null
    activeTag = state?.tag || 'all'

    pills?.forEach(pill => {
      const pillTag = pill.dataset.tag || ''
      pill.classList.toggle('tag-pill--active', pillTag === activeTag)
    })

    filterPosts()
  })

  const urlParams = new URLSearchParams(window.location.search)
  const tagParam = urlParams.get('tag')
  if (tagParam) {
    activeTag = tagParam
    pills?.forEach(pill => {
      const pillTag = pill.dataset.tag || ''
      pill.classList.toggle('tag-pill--active', pillTag === tagParam)
    })
  }
</script>
```

**Behavior:** Tag pills and search work together — clicking a tag narrows the set, then search filters within that set. Active pill gets `.tag-pill--active` class. URL syncs via `history.pushState` / `popstate`.

**Review:** `npm run build` + Playwright screenshots of posts page (dark/light, all tag states).

---

#### Phase 19.2: Header — Remove Tags Nav Link
**File:** `src/components/Header.astro`

**Remove from desktop nav (around line 60):**
```html
<!-- DELETE: -->
<a href={`${base}tags/`} class="nav-link ${currentPage === '/tags/' ? 'nav-link--active' : ''}">
  tags
</a>
```

**Remove from mobile nav (around line 133):**
```html
<!-- DELETE: -->
<a href={`${base}tags/`} class="nav-link">
  tags
</a>
```

**Review:** Visual check on desktop and mobile nav.

---

#### Phase 19.3: Home Page — Update Tags Link
**File:** `src/pages/index.astro`

**Change card link (line ~81):**
```html
<!-- BEFORE: -->
<a href={`${base}tags/`} class="page-card">

<!-- AFTER: -->
<a href={`${base}posts/`} class="page-card">
```

**Update card body text (line ~87):**
```html
<!-- BEFORE: -->
<p class="page-card-body">
  Explore posts organized by topic — filter by tags and categories.
</p>

<!-- AFTER: -->
<p class="page-card-body">
  Browse all posts — filter by tag or search by keyword.
</p>
```

**Review:** Visual check of home page.

---

#### Phase 19.4: Redirects for Old Tags URLs
**File:** `astro.config.mjs`

**Add redirects to Astro config:**
```javascript
redirects: {
  '/tags/': '/posts/',
  '/tags/introduction/': '/posts/?tag=introduction',
  '/tags/meta/': '/posts/?tag=meta',
  '/tags/design/': '/posts/?tag=design',
  '/tags/philosophy/': '/posts/?tag=philosophy',
  '/tags/security/': '/posts/?tag=security',
  '/tags/technology/': '/posts/?tag=technology',
  '/tags/webdev/': '/posts/?tag=webdev',
  '/tags/writing/': '/posts/?tag=writing',
}
```

**Review:** `npm run build` + verify redirects work via Playwright.

---

#### Phase 19.5: Delete Tags Pages
**Delete these files:**
- `src/pages/tags.astro`
- `src/pages/tags/[tag].astro`
- `src/pages/tags/` directory

**Review:** `npm run build` completes without errors.

---

#### Phase 19.6: Individual Post Page — Medium-Inspired Styling
**File:** `src/pages/posts/[slug].astro`

**Add reading progress bar (after `<Layout>` open tag, before `<div class="container">`):**
```html
<div class="reading-progress" aria-hidden="true">
  <div class="reading-progress-bar" id="reading-progress-bar"></div>
</div>
```

**Replace post meta + title block:**
```html
<!-- Meta -->
<div class="post-meta">
  {post.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
  &nbsp;&nbsp;·&nbsp;&nbsp;{getReadingTime(postEntry!.body)} min read
</div>

<h1>{post.title}</h1>

<div class="divider" aria-hidden="true">~~~</div>
```

**Replace post body container:**
```html
<div class="post-body">
  {body}
</div>
```

**Replace tags block:**
```html
{post.tags && post.tags.length > 0 && (
  <div class="post-tags-pill">
    {post.tags.map(tag => (
      <a href={`${base}posts/?tag=${encodeURIComponent(tag)}`} class="tag-pill">
        {tag}
      </a>
    ))}
  </div>
)}
```

**Add reading progress JS at bottom of file (before closing `</Layout>`):**
```html
<script>
  const progressBar = document.getElementById('reading-progress-bar')
  if (progressBar) {
    function updateProgress() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      progressBar.style.width = progress + '%'
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
  }
</script>
```

**Review:** `npm run build` + Playwright screenshots of post page (dark/light).

---

#### Phase 19.7: Global CSS — Article Typography + Reading Styles
**File:** `src/styles/global.css`

**Add CSS variables for article styling (in dark section, after existing variables):**
```css
--article-max-width: 680px;
--article-font-size: 18px;
--article-line-height: 1.7;
--heading-serif: Georgia, 'Times New Roman', Times, serif;
```

**Add CSS variables for article styling (in light section, after existing variables):**
```css
--article-max-width: 680px;
--article-font-size: 18px;
--article-line-height: 1.7;
--heading-serif: Georgia, 'Times New Roman', Times, serif;
```

**Update `h1` styling (around line 115):**
```css
/* Keep monospace for terminal-style headings */
h1 { font-size: 3.5rem; letter-spacing: -0.03em; font-family: var(--font-mono); }

/* Article titles use Georgia serif */
.post-body h1,
.post-body h2,
.post-body h3 {
  font-family: var(--heading-serif);
  font-weight: 700;
  line-height: 1.2;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.post-body h1 { font-size: 2.5rem; letter-spacing: -0.02em; }
.post-body h2 { font-size: 1.75rem; letter-spacing: -0.01em; }
.post-body h3 { font-size: 1.35rem; }
```

**Add post body container styles (after `.post-tags-inline` rules):**
```css
.post-body {
  font-size: var(--article-font-size);
  line-height: var(--article-line-height);
  max-width: var(--article-max-width);
  margin: 0 auto;
}

.post-body p {
  margin-bottom: 1.5rem;
}

.post-body h1,
.post-body h2,
.post-body h3,
.post-body h4,
.post-body h5,
.post-body h6 {
  font-family: var(--heading-serif);
  font-weight: 700;
  line-height: 1.2;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.post-body h1 { font-size: 2.5rem; letter-spacing: -0.02em; }
.post-body h2 { font-size: 1.75rem; letter-spacing: -0.01em; }
.post-body h3 { font-size: 1.35rem; }

.post-body blockquote {
  border-left: 3px solid var(--accent);
  padding-left: 1.25rem;
  margin: 2rem 0;
  color: var(--text-dim);
  font-style: italic;
  font-size: 1.05rem;
}

.post-body pre {
  background-color: var(--bg-hover);
  padding: 1.5rem;
  overflow-x: auto;
  margin: 2rem 0;
  border: 1px solid var(--text-muted);
  border-radius: 0;
}

.post-body pre code {
  background-color: transparent;
  padding: 0;
  font-size: 0.85rem;
  line-height: 1.8;
}

.post-body hr {
  border: none;
  border-top: 1px solid var(--text-muted);
  margin: 3rem 0;
}

.post-body img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 2rem auto;
}

.post-body ul,
.post-body ol {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.post-body li {
  margin-bottom: 0.5rem;
}

.post-body a {
  color: var(--accent);
  text-decoration-color: var(--accent-dim);
}

.post-body a:hover {
  text-decoration-color: var(--accent);
}
```

**Add reading progress bar styles (after `.nav-scrolled` rules):**
```css
/* === Reading Progress Bar === */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: transparent;
  z-index: 10000;
}

.reading-progress-bar {
  height: 100%;
  width: 0;
  background: var(--accent);
  transition: width 0.1s linear;
}
```

**Add pill tag styles for post tags (after existing tag pill styles):**
```css
.post-tags-pill {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}
```

**Review:** Visual check of all post pages (dark/light).

---

#### Phase 19.8: Global CSS — Define `--bg-card` Variable
**File:** `src/styles/global.css`

**Add to dark section (around line 18):**
```css
--bg-card: #111111;
```

**Add to light section (around line 32):**
```css
--bg-card: #eaeaea;
```

**Review:** Home page `.open-source-box` and `.page-card` backgrounds render correctly.

---

#### Phase 19.9: Home Page — Move Inline Styles to Global CSS
**File:** `src/pages/index.astro`

**Remove the entire `<style>` block (lines 108-153).**

**Add styles to `src/styles/global.css`:**
```css
/* === Home Page Cards === */
.open-source-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
}

.terminal-link {
  color: var(--accent);
  text-decoration: none;
  font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  transition: color 0.2s;
  display: inline-block;
}

.terminal-link:hover {
  color: var(--accent-hover, var(--accent));
  text-decoration: underline;
}

.page-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.25rem;
  transition: border-color 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
}

.page-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.page-card-header .prompt {
  margin-bottom: 0.75rem;
}

.page-card-body {
  color: var(--text-dim);
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
}

.page-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

@media (max-width: 640px) {
  .page-grid {
    grid-template-columns: 1fr;
  }
}
```

**Review:** Home page visual check (dark/light).

---

#### Phase 19.10: About Page — Typography Alignment
**File:** `src/pages/about.astro`

**No structural changes.** The about page already follows the terminal aesthetic. Just ensure:
- `h1` size matches global `h1` scale (already done via CSS)
- Section spacing consistent with home page rhythm (already using `~~~` dividers)
- `output-block` styling consistent with code blocks on post pages (already using `var(--text-dim)` border)

**Review:** Visual comparison with home page and post pages.

---

#### Phase 19.11: 404 Page — Heading Alignment
**File:** `src/pages/404.astro`

**No structural changes.** The `h1` already uses the global `.error-404 h1` class with responsive sizing. Spacing already uses `~~~` dividers consistent with other pages.

**Review:** Visual check on 404 page.

---

#### Phase 19.12: Global CSS — Standardize Heading Scale
**File:** `src/styles/global.css`

**Ensure consistent heading hierarchy across all pages:**
```css
/* Ensure heading scale is consistent */
h1 { font-size: 3.5rem; letter-spacing: -0.03em; font-family: var(--font-mono); }
h2 { font-size: 1.5rem; letter-spacing: -0.01em; font-family: var(--font-mono); }
h3 { font-size: 1.25rem; font-family: var(--font-mono); }

/* Article body headings override with serif */
.post-body h1,
.post-body h2,
.post-body h3 {
  font-family: var(--heading-serif);
}
```

**Review:** Visual comparison of headings across all pages.

---

### Phase 19 Summary

| # | File | Change |
|---|------|--------|
| 19.1 | `src/pages/posts.astro` | Add tag pill bar, combined tag+search filtering, `data-tags` attributes |
| 19.2 | `src/components/Header.astro` | Remove "tags" nav link (desktop + mobile) |
| 19.3 | `src/pages/index.astro` | Update tags card link → `/posts/`, update card description |
| 19.4 | `astro.config.mjs` | Add 301 redirects for all `/tags/*` URLs |
| 19.5 | Delete | `src/pages/tags.astro`, `src/pages/tags/[tag].astro`, `src/pages/tags/` |
| 19.6 | `src/pages/posts/[slug].astro` | Reading progress bar, Georgia serif title, post-body wrapper, pill tags |
| 19.7 | `src/styles/global.css` | Article typography (Georgia h1-h3, 18px body, 1.7 line-height), blockquote/code/hr/img styles, progress bar CSS, pill tag CSS |
| 19.8 | `src/styles/global.css` | Define `--bg-card` in dark + light sections |
| 19.9 | `src/pages/index.astro` + `src/styles/global.css` | Move inline `<style>` to global CSS, add page card styles |
| 19.10 | `src/pages/about.astro` | No changes needed (already aligned) |
| 19.11 | `src/pages/404.astro` | No changes needed (already aligned) |
| 19.12 | `src/styles/global.css` | Standardize heading scale, ensure serif override for post body |

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
