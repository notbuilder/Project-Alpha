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
