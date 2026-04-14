# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a collection of three independent static website projects by Shoaib Tariq. There is no build system, bundler, or package manager — all projects are plain HTML/CSS/JS served directly from the filesystem or any static file server.

## Projects

### Root (`/`) — Personal Portfolio
Single-page portfolio site with dark glassmorphism theme (Inter font, indigo/pink gradient accents). Scroll-reveal animations via `.reveal`/`.active` CSS class toggling in `script.js`.

### `Dental/` — Empire Smile Dental Clinic
Multi-page dental clinic site (Plus Jakarta Sans font, sky-blue `#0ea5e9` primary). Key features:
- **Lead capture form** on `index.html` hero section — submissions save to `localStorage` under key `dentalLeads`
- **Live agent chatbot widget** — injected via `injectChatWidget()` in `script.js`, uses a state-machine flow (`chatState` 0-5) to collect name/service/phone, then saves to the same `dentalLeads` localStorage
- **Admin dashboard** (`dashboard.html`) — reads `dentalLeads` from localStorage to display a CRM table with stats; has inline `<style>` and `<script>` (no external CSS/JS)
- **Service subpages** (`general-dentistry.html`, `cosmetic-dentistry.html`, `dental-implants.html`, `orthodontics.html`, `emergency-care.html`, `pediatric-care.html`) — share `style.css` but add page-specific styles via inline `<style>` blocks

### `10Pearls-Clone/` — Corporate IT Services Clone
Single-page B2B site clone (Inter font, red `#d32f2f` primary). Uses `IntersectionObserver` for staggered scroll animations instead of the scroll-event approach used by the other projects.

## Development

Open any `index.html` directly in a browser or use any static server:
```
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

There are no tests, linters, or build steps.

## Architecture Notes

- Each project is fully self-contained with its own `index.html`, `style.css`, and `script.js`.
- CSS variables are defined in `:root` within each project's `style.css` — each project uses a different color palette and font stack.
- All three projects use CSS `position: fixed` navbars with scroll-shrink behavior driven by JS.
- The Dental project is the only one with cross-page state (localStorage-based lead data shared between `index.html` chatbot/form and `dashboard.html`).
