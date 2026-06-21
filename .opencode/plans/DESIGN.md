# DESIGN — NaeesWrites

> The single source of truth for all design decisions.
> If it's not in this document, it doesn't exist.

---

## 1. VISION

A personal blog that reads like a terminal session. Brutalist, technical, and intentionally raw — the aesthetic of someone who lives in `zsh` and thinks in `cat`, `ls`, `grep`, and `ssh`. Every page should feel like you've SSH'd into a machine that belongs to a person with sharp taste.

**Reference:** [brutecat.com](https://brutecat.com) — same visual language, different subject.

---

## 2. COLOR SYSTEM

### Background

```
--bg:        #0a0a0a    (near-black, Brutecat-level stark)
--bg-hover:  #141414    (interactive hover states)
```

### Text

```
--text:      #e8e8e8    (off-white, not pure #fff — easier on eyes)
--text-dim:  #6b6b6b    (secondary text, dates, metadata)
--text-muted:#3a3a3a    (ghost text, placeholders)
```

### Accent

```
--accent:    #4a9eff    (terminal blue — the one color on the entire site)
--accent-dim:#1a3a5c    (accent used at low opacity)
```

### Rules

- **One accent color only.** The blue is the only color. Everything else is grayscale.
- **No gradients.** Brutecat has none. Neither do we.
- **No borders on interactive elements.** Links underline on hover only. Buttons have no border.
- **No rounded corners.** `border-radius: 0` everywhere. Brutalist aesthetic demands sharp edges.
- **Dark mode is the default.** The entire site is dark. Light mode toggle exists but the design targets dark.

---

## 3. TYPOGRAPHY

### Font families (in order of preference)

```
--font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif
```

### Rules

- **Terminal prompts use monospace exclusively.** Every `$`, `~`, `~~~` must be in `--font-mono`.
- **Body text uses sans-serif.** Blog posts, descriptions, navigation — all sans-serif.
- **Headings use monospace for section titles.** The "h1" of each section reads like a terminal prompt.
- **No serif fonts.** Brutecat doesn't use them. Neither do we.
- **Letter spacing:** Normal for body. Tight (`-0.02em`) for large display text.

### Type scale

```
Hero / display:  3.5rem (56px)   — bold, monospace, the site name
Section h1:      2rem   (32px)   — bold, monospace, terminal prompt style
Section h2:      1.5rem (24px)   — bold, monospace
Body:            1rem   (16px)   — regular, sans-serif
Small:           0.875rem (14px) — regular, sans-serif
Tiny:            0.75rem  (12px) — regular, monospace (metadata, dates)
```

---

## 4. LAYOUT PRINCIPLES

### Brutalist layout rules

1. **No card containers.** No `border-radius`, no `box-shadow`, no `background-color` on content blocks. Content flows directly on the `--bg` background.
2. **Dividers are `~~~` in monospace.** Not `<hr>`, not lines. The three-tilde character is the section separator.
3. **Whitespace is structural.** Sections are separated by generous vertical space, not by visual decorations.
4. **Left-aligned everything.** No centered content except the hero section on the homepage. Brutalist design is aggressively left-aligned.
5. **Content width:** `max-width: 720px` for body text, `max-width: 960px` for wide content (hero, team section).

### Page structure pattern

```
[terminal prompt header]
[~~~ divider]
[content]
[~~~ divider]
[terminal prompt header]
[content]
```

---

## 5. TERMINAL PROMPTS (site-wide pattern)

Every major section on every page starts with a terminal-style prompt. This is the signature element.

### Prompt formats

**Local prompts:**
```
server ~ $
naees@writes:~$
naees@writes:~/blog$
```

**Remote/internal prompts:**
```
target.internal $
siege.brutecat.internal $
dev.internal $
```

**Prompt styling:**
- Monospace font
- `$` in `--accent` blue
- Rest in `--text-dim` gray
- No box, no background, no border — just text

### Prompt content rules

- Use **realistic internal hostnames** (`target.internal`, `dev.internal`, `staging.internal`)
- Use **realistic paths** (`~/blog`, `~/posts`, `~/contact`)
- Never use placeholder text like "Lorem ipsum"
- The prompt should feel like something you'd actually type in a terminal

---

## 6. ARTWORK & ASSETS

### Required art (you must create)

#### A. Terminal header logo

A terminal-style ASCII/text logo for the site header. Brutocat uses a stylized cat face; you need a terminal equivalent.

**Options:**
- `naees@writes:~$` rendered as large terminal text
- A cat sitting in a terminal prompt
- ASCII art of Haku (your dog) rendered in terminal style
- `cat ~/blog/index.md | less` as the logo treatment

**Requirements:**
- Must be an SVG file
- Must work at large size (hero) and small size (favicon area)
- Should feel like a terminal screen, not a logo
- **This replaces `typography-logo.svg` in the header**

**Where to create it:** `public/terminal-logo.svg`

#### B. ASCII art pieces

Brutecat uses cat illustrations on multiple pages. You should create ASCII art of Haku (your dog) for similar placement.

**Pieces needed:**

1. **Hero page decoration** — Large ASCII art of Haku, placed on the homepage near the title. Think: a cat illustration but in ASCII.
   - Size: ~30-50 lines of ASCII art
   - Placement: Right-aligned or floating near the hero text
   - Opacity: Very low (~0.05), like a watermark

2. **About page decoration** — Smaller ASCII art of Haku, placed near the bio text.
   - Size: ~15-25 lines
   - Placement: Left or right of the text column
   - Opacity: Low (~0.1)

3. **404 page decoration** — ASCII art of Haku with a terminal message, like "segmentation fault (core dumped)" but with your dog.
   - Size: ~20-30 lines
   - Placement: Centered above or beside the 404 text
   - Opacity: Medium (~0.15)

**Style guide:**
- Pure ASCII (no Unicode box-drawing characters)
- Black/white only — no color in the art itself
- Should read as "terminal output" not "art"
- Haku should be recognizable — reference your actual dog's appearance

**Where to create them:** `public/ascii/` directory

#### C. Haku SVGs (existing — use as-is)

Your existing `haku.svg` illustrations serve as the "cat illustrations" on the site. Brutecat uses cat illustrations throughout; you use Haku illustrations.

**Current assets:**
- `public/haku.svg` — Haku illustration (use as page decoration/watermark)
- `public/naeesWriteTypographyLogoWithHaku.svg` — Logo with Haku (use sparingly)

**Placement rules:**
- Haku SVGs at ~0.025-0.05 opacity as background watermarks
- Never at full opacity on content pages (too distracting)
- On the about page, Haku can be at higher opacity (0.1-0.2) as a "photo placeholder"
- On the 404 page, Haku can be at medium opacity as the "error" illustration

### Existing assets (do not modify)

- `public/favicon.svg` — existing favicon
- `public/favicon.ico` — existing favicon fallback
- `public/og-image.png` — existing Open Graph image

### Assets you may want to create later

- **Terminal cursor animation** — a blinking `█` or `_` cursor in the header
- **ASCII art blog post headers** — each post could have a small ASCII decoration
- **Terminal-style terminal screenshot** — a fake terminal window showing blog content

---

## 7. PAGE-BY-PAGE DESIGN

### Homepage (`/`)

```
[terminal prompt: server ~ $]
[~~~]

[HERO — centered, large]
NaeesWrites
A collection of thoughts, ideas, and writing.

[terminal prompt: naees@writes:~/blog$ ls -la]
[~~~]

[post list — no cards, no borders, just text]
2026-06-21  design-minimalism
2026-06-20  threat-modeling
2026-06-19  why-static-sites

[terminal prompt: cat ~/blog/README.md | head -20]
[~~~]

[about section — short bio, terminal prompt style]
[~~~]

[footer — minimal, terminal style]
```

**Key decisions:**
- Hero centered, everything else left-aligned
- Post list: **no card containers**, **no borders**, **no tags displayed on homepage**
- Dates in monospace, titles in sans-serif
- Haku SVG watermark at very low opacity on the right side
- Search bar: terminal-style, no rounded corners, border-only on focus

### About page (`/about/`)

```
[terminal prompt: naees@writes:~$ whoami]
[~~~]

[content — bio text]
[terminal prompt: naees@writes:~$ cat about.txt]
[~~~]

[content — more bio, tech stack]
[terminal prompt: naees@writes:~$ ls ~/contact/]
[~~~]

[contact links — terminal style]
```

**Key decisions:**
- Photo placeholder: Haku SVG at ~0.1 opacity in a square container
- `whoami`, `cat`, `ls` blocks preserved as terminal aesthetic
- Links styled as terminal output: `→ github`, `→ linkedin`
- ASCII art of Haku placed alongside the bio text

### Tags page (`/tags/`)

```
[terminal prompt: naees@writes:~/blog$ find . -name "*.md" | sort -u]
[~~~]

[tag list — no badges, no colors, just monospace text]
design      [5]
technology  [12]
security    [8]

[terminal prompt: cat ~/blog/tags-index.txt]
[~~~]

[tagged posts grouped by tag]
```

**Key decisions:**
- Remove colored tag badges — tags should be monospace text only
- Tag counts in parentheses, monospace
- `ls posts/` replaced with more realistic `find` command
- No hover colors beyond accent underline

### 404 page (`/404/`)

```
[terminal prompt: server ~ $ cat /dev/null]
[~~~]

[404 text — centered]
404 — Not Found

[ASCII art of Haku]
[~~~]

[go home link — terminal button style]
```

**Key decisions:**
- Keep `cat /dev/null` terminal aesthetic
- ASCII art of Haku as the "error illustration"
- Go home button: monospace, no rounded corners, accent blue background

### Post page (`/posts/[slug]/`)

```
[terminal prompt: naees@writes:~/blog$ cat posts/[slug].md]
[~~~]

[date + reading time — monospace, small]
[title — large, sans-serif]
[~~~]

[body content — clean, no decorations]
[~~~]

[tags — monospace text, no badges]
[~~~]

[comments section — terminal prompt style header]
```

**Key decisions:**
- Post body: clean, no decorations, no Haku watermarks
- Tags: monospace text links, no colored badges
- Code blocks: preserve existing styling (terminal background)
- Reading time in monospace: `4 min read`

### Tag archive page (`/tags/[tag]/`)

```
[terminal prompt: naees@writes:~/blog$ grep -l "#[tag]" posts/*.md]
[~~~]

[post list — same as homepage but filtered]
```

---

## 8. INTERACTION DESIGN

### Hover states

- **Links:** underline appears on hover, color shifts to `--accent` blue
- **Buttons:** opacity shift to 0.85, no color change
- **Terminal prompts:** no hover effect (they're not interactive)

### Focus states

- **All interactive elements:** `2px solid --accent` outline, `2px offset`
- No `outline: none` ever

### Transitions

- **Color transitions:** `0.15s ease` (fast, terminal feel — no slow animations)
- **No animations on page load.** Brutalist design doesn't animate in.
- **No scroll-triggered animations.** Keep it stark.

### Cursor

- **Default cursor:** `cursor: default` everywhere
- **Terminal text areas:** `cursor: text`
- **Links:** `cursor: pointer`

---

## 9. COMPONENT RULES

### Header

- Terminal logo (ASCII/text) replaces current SVG logo
- Navigation links: monospace, no active state styling (or subtle accent underline)
- No borders, no background, no shadow
- GitHub icon stays (terminal users use GitHub)
- Dark mode toggle stays

### Footer

- Terminal-style navigation: `→ home`, `→ about`, `→ tags`
- Links styled as terminal output
- Copyright line in monospace
- No card containers, no grid backgrounds

### Post cards (homepage listing)

- **No card containers.** Remove all background, borders, shadows.
- Just text: date (monospace) + title (sans-serif) + description (sans-serif, dim)
- Separator: `~~~` between post groups, not between individual posts

### Tags

- **Remove colored tag badges entirely.**
- Tags are monospace text links, styled like terminal output.
- Tag counts in parentheses, monospace.

### Dark mode toggle

- Keep existing functionality
- Style: monospace text `dark` / `light` instead of icon
- Or keep icon but ensure it fits the terminal aesthetic

---

## 10. WHAT TO REMOVE

### Remove from UI chrome (header, footer, nav)

- ~~All `border-radius`~~
- ~~All `box-shadow`~~
- ~~All gradient backgrounds~~
- ~~All colored tag badges~~
- ~~All card containers on post listings~~
- ~~All rounded corners~~
- ~~The current typography logo in the header (replace with terminal logo)~~
- ~~Sans-serif-only aesthetic — inject monospace everywhere~~

### Remove from content pages

- ~~Haku SVGs from post pages (too distracting while reading)~~
- ~~Colored tag pills on posts — use monospace text links~~
- ~~Any decorative elements in post body~~

### Keep in content areas

- ~~Terminal `whoami`/`cat`/`ls` blocks on about page~~
- ~~`cat /dev/null` on 404 page~~
- ~~`$ ls posts/` on tags page~~

---

## 11. CHECKLIST: ART YOU NEED TO CREATE

### Priority 1 (block the redesign)

- [ ] **Terminal header logo** (`public/terminal-logo.svg`)
  - Terminal-style text/ASCII art replacing the current typography logo
  - Must work at both large (hero) and small sizes
  - Ideas: `naees@writes:~$`, `cat ~/blog/index.md`, ASCII cat/dog

### Priority 2 (enhance the design)

- [ ] **Homepage ASCII art of Haku** (`public/ascii/hero.txt` or inline)
  - Large ASCII art, ~30-50 lines
  - Low opacity watermark placement
  
- [ ] **About page ASCII art of Haku** (`public/ascii/about.txt` or inline)
  - Medium ASCII art, ~15-25 lines
  - Placement alongside bio text

- [ ] **404 page ASCII art of Haku** (`public/ascii/404.txt` or inline)
  - Medium ASCII art, ~20-30 lines
  - Paired with terminal error message

### Priority 3 (nice to have)

- [ ] **Blinking cursor animation** — CSS `@keyframes` for `█` or `_`
- [ ] **Terminal-style terminal screenshot** — fake terminal showing blog content
- [ ] **ASCII art for each post** — small decoration in post headers

---

## 12. IMPLEMENTATION ORDER

1. ~~**Create terminal header logo** (you) → then update `Header.astro`~~
2. ~~**Update color system** — navy → near-black (#0a0a0a)~~
3. ~~**Remove rounded corners** — `border-radius: 0` everywhere~~
4. ~~**Remove card containers** — post listings become plain text~~
5. ~~**Replace colored tags** — monospace text only with `#` prefix~~
6. ~~**Add terminal prompts** — `~~~` dividers, `naees@writes:~$` headers~~
7. ~~**Update typography** — monospace for headings/prompts, sans-serif for body~~
8. ~~**Add light mode support** — toggle with text label~~
9. ~~**Update footer** — `→` arrow navigation~~
10. ~~**Test on mobile** — Brutalist doesn't mean unusable on small screens~~
11. ~~**Visually test all pages with Playwright**~~

### Remaining (Priority 2)

- [ ] **Create terminal header logo** (SVG replacing `naees@writes:~$` text)
- [ ] **Create ASCII art of Haku** — hero, about, and 404 page decorations
- [ ] **Add blinking cursor animation** — CSS `@keyframes` for `█` or `_`

---

## 13. DESIGN DECISIONS LOG

| Decision | Rationale | Date | Status |
|----------|-----------|------|--------|
| Full Brutecat style | User preference, aligns with security/terminal identity | 2026-06-21 | implemented |
| Near-black background (#0a0a0a) | Brutecat-level stark, more nuanced than pure black | 2026-06-21 | implemented |
| One accent color (blue #4a9eff) | Brutalist principle: restraint. One color creates impact. | 2026-06-21 | implemented |
| Haku SVGs as cat illustrations | Sentimental value, personal branding | 2026-06-21 | implemented |
| No rounded corners | Brutalist aesthetic, Brutecat precedent | 2026-06-21 | implemented |
| No card containers | Brutalist principle: content flows directly on background | 2026-06-21 | implemented |
| Terminal prompts as section headers | Signature element, Brutecat precedent | 2026-06-21 | implemented |
| `~~~` as dividers | Terminal-native separator, Brutecat precedent | 2026-06-21 | implemented |
| Monospace for prompts/headings | Terminal identity, Brutecat precedent | 2026-06-21 | implemented |
| Sans-serif for body text | Readability for long-form content | 2026-06-21 | implemented |
| Light mode support | Accessibility and user choice | 2026-06-21 | implemented |
| Monospace nav links (lowercase) | Terminal aesthetic consistency | 2026-06-21 | implemented |
| Terminal search placeholder | `grep -r 'search term' posts/` | 2026-06-21 | implemented |
| Post tags as `#tag` inline | Terminal hashtag convention | 2026-06-21 | implemented |
| Footer with `→` arrows | Terminal output convention | 2026-06-21 | implemented |
| Dark mode toggle with text label | `dark` / `light` text indicator | 2026-06-21 | implemented |
| 404 with `cat /dev/null` | Terminal error convention | 2026-06-21 | implemented |

---

## 14. REFERENCE: BRUTECAT.COM DESIGN ELEMENTS

Mapped to NaeesWrites equivalents:

| Brutecat | NaeesWrites |
|----------|-------------|
| Cat illustration | Haku SVG + ASCII art of Haku |
| `target.internal` | `server ~ $` |
| `siege.brutecat.internal / leads` | `naees@writes:~/blog$ ls` |
| `~~~` dividers | `~~~` dividers (same) |
| Black background | Dark gray (#0a0a0a) |
| Monospace prompts | Monospace prompts (same) |
| Bold display text | Bold display text (same) |
| Numbered sections (01, 02) | Terminal prompts instead |
| Cat ASCII art | Dog ASCII art of Haku |
| `root@brutecat.com` | `naees@protonmail.com` |
| PGP key link | PGP key link (keep) |
| Terminal-style CTA | Terminal-style CTA (`→ Send scope`) |

---

*This document is the single source of truth for NaeesWrites design. All design changes should reference it. If something isn't covered here, it's not part of the design.*
