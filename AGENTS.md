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

TanStack Intent ships skills under `node_modules`; with Bun, some packages live under `node_modules/.bun/<pkg>@<version>/...`. After major dependency bumps, re-run `npx @tanstack/intent@latest list` and update the `load` paths below if they move.

<!-- intent-skills:start -->
# Skill mappings - when working in these areas, load the linked skill file into context.
skills:
  - task: "TanStack DB React hooks: useLiveQuery, useLiveSuspenseQuery, useLiveInfiniteQuery, usePacedMutations; imports from @tanstack/react-db"
    load: "node_modules/@tanstack/react-db/skills/react-db/SKILL.md"
  - task: "TanStack Start app shell, Vite plugin, root route document, client/server entrypoints, routeTree.gen.ts"
    load: "node_modules/.bun/@tanstack+start-client-core@1.167.7/node_modules/@tanstack/start-client-core/skills/start-core/SKILL.md"
  - task: "File-based routes, route tree, matching, path and search params, router types and Register"
    load: "node_modules/.bun/@tanstack+router-core@1.168.7/node_modules/@tanstack/router-core/skills/router-core/SKILL.md"
  - task: "Route loaders, loaderDeps, pending/error components, deferred data, router cache and invalidation"
    load: "node_modules/.bun/@tanstack+router-core@1.168.7/node_modules/@tanstack/router-core/skills/router-core/data-loading/SKILL.md"
  - task: "createServerFn, server middleware, request context, validators, calling server functions from React"
    load: "node_modules/.bun/@tanstack+start-client-core@1.167.7/node_modules/@tanstack/start-client-core/skills/start-core/server-functions/SKILL.md"
  - task: "Deploying TanStack Start to Cloudflare Workers, SSR/SPA modes, prerender and caching headers"
    load: "node_modules/.bun/@tanstack+start-client-core@1.167.7/node_modules/@tanstack/start-client-core/skills/start-core/deployment/SKILL.md"
<!-- intent-skills:end -->
