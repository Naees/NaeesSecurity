---
title: "Why I Switched to a Static Site"
description: "The journey from a complex setup to a simple, reliable blog."
date: 2025-05-20
tags: ["technology", "philosophy"]
---

For years I ran a WordPress site. It worked, but it came with baggage.

## The WordPress Experience

WordPress is powerful. But power comes with complexity:

- Plugin updates that break things
- Database maintenance
- Security patches you can't ignore
- Hosting costs
- Performance tuning

For a personal blog, I was spending more time maintaining the platform than writing content.

## The Turning Point

I realized: my blog is content. Just text and images. Nothing dynamic. Nothing that needs a server.

Why was I running a full CMS for static content?

## The Stack I Chose

- **Astro** — Builds static sites, zero JS by default
- **GitHub Pages** — Free hosting, git-based workflow
- **Markdown** — Write in plain text files
- **giscus** — Comments via GitHub Discussions

Total cost: $0. Total maintenance: commit your files and push.

## What Changed

### Good
- **Reliability** — If it works locally, it works everywhere
- **Speed** — Static HTML loads instantly
- **Security** — No database to hack, no CMS to exploit
- **Focus** — Writing is the only thing I do

### Trade-offs
- No server-side features (but I didn't need them)
- Every change requires a deploy (but it's just a git push)
- No real-time comments (but giscus works fine)

## The Result

My blog is now a collection of markdown files in a git repo. I can write anywhere, commit anywhere, and the site updates automatically.

Sometimes the best technology is no technology at all.
