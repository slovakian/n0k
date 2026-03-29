# Agent instructions — n0k

## What this app is

**n0k** is a real-time chat product. Users create **chat rooms** that have **thermodynamic qualities** and a **guaranteed end** (the room “dies” at some point). Do **not** invent or document the thermodynamic mechanics here unless product docs say otherwise; treat that as domain context only.

## Stack (non-negotiable)

- **Frontend:** [TanStack Start](https://tanstack.com/start) (React).
- **API:** TanStack **server functions** / Start patterns for server routes—not a separate ad-hoc REST style unless the codebase already does.
- **Hosting:** **Cloudflare Workers** (the app runs on Workers).
- **Database:** **Cloudflare D1** (SQLite at the edge).

## UI: WebTUI only — no Tailwind

This is a **web app** styled as a **terminal / TUI** using **WebTUI** (`@webtui/css`).

**You must not use Tailwind CSS** in this repository: no `tailwind.config`, no `@tailwind` directives, no Tailwind class strings, no Tailwind plugins, and no “just this once” utility classes from Tailwind. If something looks like a utility framework, it is the wrong tool; use WebTUI’s CSS layers, components, and utilities instead.

### Before any UI or design work

**Read the WebTUI skill** at `.agents/skills/webtui/SKILL.md` and follow it (and its linked topic files under that folder when you need depth). **Any** visual change—layout, typography, color, components, new screens—counts as design work.

### WebTUI basics (from the skill — follow the skill for full detail)

- WebTUI is a **CSS** library for terminal-like UIs: **`@layer` ordering** (`base`, `utils`, `components`) and **minimal markup**.
- **Always** declare layer order **before** any `@webtui` import, then import base:

  ```css
  @layer base, utils, components;

  @import '@webtui/css/base.css';
  ```

- Import **only** the utils/components you need in production; avoid pulling the full bundle unless you are prototyping.
- Utility and component **attributes use a `-` suffix** (e.g. `is-="badge"`, `box-="square"`). **Do not** use unsuffixed `box="..."`—it will not work.
- Dark theme is commonly set with **`data-webtui-theme="dark"`** on `<html>` or a subtree (see theming docs in the skill folder).
- Prefer **per-file ESM imports** where appropriate (e.g. `import '@webtui/css/components/button.css'`) after globals define layers.

When in doubt, re-read `.agents/skills/webtui/SKILL.md` rather than guessing class names or HTML patterns from other design systems.
