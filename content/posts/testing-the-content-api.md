---
title: "Testing the Content API"
date: "2026-02-20"
excerpt: "A quick test post to verify the GitHub Content API auto-deploy pipeline works end to end."
tags: ["api", "test"]
---

## Does This Work?

Let's find out. This post was published directly from the admin panel using the **GitHub Content API** — no manual file editing, no git commands.

If you can read this on the live site, the pipeline is working.

### How It Happens

1. Write in the admin panel
2. Hit publish — the content is committed to the repo via the API
3. GitHub Actions picks up the commit and rebuilds the site
4. The new post appears automatically

Pretty neat.