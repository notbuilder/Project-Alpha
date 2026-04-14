# CLAUDE.md — Project Alpha

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Project Identity

**Project Alpha** is Shoaib Tariq's AI Learning Lab — a personal training ground for mastering AI implementation, Claude Code, Context Engineering, MCP, and related tools. The goal is to become an AI Implementation Expert / Context Engineer within 2-3 months.

## User Context

Shoaib's background is in SEO. When explaining concepts, use SEO analogies to bridge understanding:

| AI Concept | SEO Analogy |
|-----------|-------------|
| CLAUDE.md | robots.txt — tells the AI how to behave in your project |
| Context window | Crawl budget — finite resource, use it efficiently |
| Prompts | Search queries — specificity matters, like long-tail keywords |
| Plan mode | SEO audit — analyze before making changes |
| Git commits | Indexing — makes changes permanent and discoverable |
| MCP servers | API integrations — like connecting Ahrefs or Search Console |
| Memory system | Link juice — context that flows between sessions |
| Project structure | Site architecture — good structure helps AI navigate |

## Behavioral Directives

- **Teach, don't just do.** Explain the "why" behind every action, not just the "how."
- **Use SEO analogies** when introducing new concepts (see table above).
- **Progressive complexity.** Start simple, layer in advanced concepts as understanding grows.
- **Encourage experimentation.** This is a learning lab — mistakes are learning artifacts.

## Folder Structure

```
Project Alpha/
├── CLAUDE.md              ← You are here. The AI's guide to this project.
├── experiments/           ← AI-generated test outputs (learning artifacts)
│   ├── 01-portfolio/      ← Dark glassmorphism portfolio site
│   ├── 02-dental-clinic/  ← Multi-page dental site with chatbot + CRM
│   └── 03-10pearls-clone/ ← B2B corporate site clone
└── learning/              ← Structured learning modules
    ├── roadmap.html       ← 12-week master roadmap (5 phases)
    ├── claude-code/       ← Claude Code mastery
    │   └── claude-code-guide.html  ← 2-day intensive course
    ├── context-engineering/
    ├── mcp/
    └── prompting/
```

## SEO Standards

Every HTML file created in this project must meet these requirements. These were derived from auditing the portfolio (scored 52/100) and dental clinic (scored 82/100) — the issues below are what caused those failures.

### Head — Required Meta Tags
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Under 155 chars. Include primary keyword + location if local.">
<meta name="theme-color" content="#hex">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Same as or similar to meta description">
<meta property="og:type" content="website">
<link rel="canonical" href="page-url.html">
<title>Brand | Primary Keyword (under 60 chars)</title>
```

### Heading Hierarchy
- **Exactly one `<h1>` per page** — must be the first heading in DOM order
- Never put an `<h2>` before the `<h1>` (use `<p>` or `<span>` for visual subtitles above the H1)
- Follow strict nesting: H1 → H2 → H3. No skipping levels.
- *Why this matters: the portfolio lost 12 points because `<h2>Hello, I'm</h2>` appeared before the H1*

### Semantic HTML Structure
Every page must use this skeleton:
```html
<header>
    <nav>...</nav>
</header>
<main>
    <section aria-label="Section purpose">...</section>
</main>
<footer aria-label="Contact information">...</footer>
```
- Wrap repeated content blocks (cards, posts) in `<article>`
- Every `<section>` should have an `aria-label`
- *Why: the portfolio had no `<main>` wrapper — screen readers and crawlers couldn't identify the primary content*

### Mobile Navigation
- **Never hide nav links on mobile without providing an alternative**
- Every page must have a hamburger menu (CSS animated bars, not text characters)
- Hamburger must toggle to an X on open
- Menu links must close the menu when clicked
- *Why: both sites originally used `display: none` on mobile with no alternative — 60%+ of users lost all navigation*

### Images
- Every `<img>` must have a descriptive `alt` attribute (not "image1" or "photo")
- Alt text should describe the image content in context of the page
- Add CSS `background-color` fallback matching the image's dominant tone (for when external URLs fail)
- Prefer local images over external URLs when possible
- *Why: the dental site's Unsplash images returned 404s with no fallback — pages showed broken images*

### Forms
- Every input must have a `<label>` with a matching `for` attribute
- Add `required` on mandatory fields
- `<select>` options must have human-readable `value` attributes (not `routine_checkup`, use `Routine Checkup`)
- *Why: the dental subpage forms saved "Morning (8AM - 12PM)" as the service name in the CRM because the select options didn't have proper values*

### Internal Linking
- Every page must be reachable from the homepage (no orphan pages)
- Navigation must be consistent across all pages in a multi-page site
- Service/category cards should be `<a>` links, not static `<div>`s
- *Why: the dental site had 6 service pages with zero inbound links from index.html — they were invisible to crawlers*

### Structured Data (JSON-LD)
- Business sites: add `LocalBusiness` or relevant schema (Dentist, Restaurant, etc.)
- Portfolio sites: add `Person` schema
- Include: name, address, phone, hours, services, ratings where applicable
- Place the `<script type="application/ld+json">` before the closing `</body>`
- *Why: structured data enables Google rich results — star ratings, map pins, hours in search results*

### Admin/Private Pages
- Add `<meta name="robots" content="noindex, nofollow">` to any page that shouldn't appear in search
- *Why: the dental dashboard had no robots tag — lead data could have been indexed by search engines*

## Development

No build system, bundler, or package manager. All experiments are plain HTML/CSS/JS.

```bash
# Open any HTML file directly in a browser, or use a static server:
python -m http.server 8000
npx serve .
```

## Experiments Archive

The `experiments/` folder contains AI-generated websites from early learning sessions:

- **01-portfolio**: Dark glassmorphism theme (Inter, indigo/pink), scroll-reveal animations
- **02-dental-clinic**: Multi-page site with localStorage CRM, chatbot state machine, admin dashboard
- **03-10pearls-clone**: B2B layout with IntersectionObserver animations

These are reference artifacts — useful for reviewing patterns but not active development targets.
