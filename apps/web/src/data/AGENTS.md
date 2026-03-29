# `src/data` — exports, folder tree, and server functions for models

This folder is where we **design the public surface for data access**: **exports**, **folder structure**, and a **tree of modules** that hold every **data function** we need per **database model** (or domain). Consumers are mostly **TanStack DB collections**; they import **TanStack Start server functions** defined here.

## Relationship to TanStack Start

With TanStack Start, **most** data loading does not need its own server function—loaders, server routes, and co-located server code cover that. We intentionally keep the **RPC-style surface small**: only add server functions where the client must call the worker with a stable entry point.

Still required here:

- **Retrieving every record** (or another well-defined full set / large slice) for **certain models**, when a collection or sync story needs that dataset from D1.
- **Anything else TanStack DB expects on the server**—mutations, targeted refetches, sync helpers, or other collection callbacks that must run on the worker.

## Organization

1. **By domain or by model** — directories match how we think about D1 tables and product language (rooms, messages, users, …).
2. **`fns/` for every server function** — all modules that define or export **`createServerFn`** live under a **`fns/`** directory (e.g. `src/data/rooms/fns/list-all.ts`). Do not place server functions next to types, schemas, or other non-RPC modules outside `fns/`.
3. **By file within `fns/`** — each file groups related server functions for one slice of behavior (e.g. reads vs writes, or “list everything” vs scoped queries) so files stay readable.
4. **Barrel exports** — `index.ts` (or equivalent) at the right levels so routes and collection setup import from a **small, stable path** (e.g. `@/data/...`).

The rule of thumb: **model → `fns/` → server functions → wired into the matching TanStack DB collection**.

## Implementation

- Use **`createServerFn`** from `@tanstack/react-start`, plus existing **middleware**, **validators**, and **D1** access patterns—no parallel ad-hoc REST layer for the same operations unless the repo already standardizes on that elsewhere.
- When implementing or changing collections, read the **react-db** and **server-functions** skills referenced from the repo root **`AGENTS.md`** so handlers stay aligned with current TanStack APIs.

## What not to put here

- **UI-only types, hooks, or presentation logic** — colocate with components or shared `lib` / `types` when there is no server entry point.
- **Generic utilities** unrelated to persisted models and collections.

When a new model appears, **extend this tree** with the **minimum** set of server functions those collections actually need, and export them cleanly.
