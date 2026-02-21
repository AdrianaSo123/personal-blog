---
title: "The 10x Bug"
date: "2026-02-12"
excerpt: "Sometimes you fix one thing and break ten others. A field guide to those moments."
tags: ["engineering", "bugs", "humor"]
---

You know the feeling. A ticket comes in: small bug, clearly localized, maybe an hour of work. You find it, fix it, feel briefly like a competent engineer.

Then the tests run. Or the reviewer comes back. Or the Slack message arrives on a Saturday.

You have fixed one thing and broken ten others. Congratulations: you have encountered the 10x bug.

## The Anatomy of It

The 10x bug has a specific structure. There's a root cause that seems innocent — a type mismatch, an off-by-one, a silent fallback that was secretly load-bearing. Your fix removes the symptom. But the symptom was doing five other jobs that nobody documented.

It's always undocumented. That's load-bearing behavior for you.

## The Blast Radius Problem

Software has dependencies you can't fully see. Your change in the auth module affects the retry logic affects the caching layer affects the rendering affects the analytics. You expected a local fix. You got a distributed system problem.

This isn't unique to big codebases. I've done it in side projects with 400 lines of code.

## The Hallmarks

You know you're in 10x bug territory when:

- Your fix passes all existing tests, and then you write new tests and they all fail
- Someone messages you saying "hey did you touch X?" and X is three files from anything you touched
- The error message is from a library you've never imported
- Your PR has a 4-line diff but a 200-line comment thread

## What to Do

The only real move is to slow down before you think you're done. Write down what you understand about the system. Write down what your change is actually doing. Ask: what else uses this? What was relying on the behavior I just changed?

It's slower. It's the right speed.

The fastest fix is the one you don't have to fix again on Saturday.
