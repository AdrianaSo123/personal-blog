---
title: "Getting Started with Next.js: What I Wish I Knew"
date: "2026-02-18"
excerpt: "Next.js has a lot of opinions. Here's what actually matters when you're starting out, and what you can safely ignore."
tags: ["nextjs", "webdev", "react"]
---

## The Framework That Thinks for You

Next.js occupies a strange position in the React ecosystem: it's opinionated enough to make hard choices for you, but flexible enough that those choices rarely feel like constraints.

That's rare. Most frameworks are either too rigid or too laissez-faire. Next.js usually lands in the right place.

## App Router vs Pages Router

If you're starting a new project today, use the **App Router**. It's the default, it's where all the new features land, and it aligns with how React itself is evolving (Server Components, Suspense, etc.).

The Pages Router still works and is fully supported, but it's the past.

## What Actually Matters on Day One

1. **Understand the file system routing** — your folder structure *is* your routes. This is mostly a superpower.
2. **Know when to use Server vs Client Components** — default to Server Components and add `"use client"` only when you need interactivity or browser APIs.
3. **`next/image` and `next/font`** are worth using from day one. Free performance wins.

## What You Can Ignore (For Now)

- Middleware
- Internationalization
- Advanced caching headers
- Edge runtime

Learn the basics first. The advanced stuff will make sense once you have a mental model.

## The Bottom Line

Just build something. Next.js has great docs and a huge community. The fastest way to learn it is to build something real with it — like, say, a blog.
