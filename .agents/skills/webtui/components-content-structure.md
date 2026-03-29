# WebTUI — Typography, pre, table, separator, view

## Typography — `typography.css`

Headings `h1`–`h6`, `p`, `blockquote`, `ol`/`ul`/`li`, inline `strong`/`em`/`code`/`a`.

**Lists:** `ul` supports **`marker-`**:

- `marker-="bullet"`, `marker-="tree"`
- `marker-="tree open"`, `marker-="open tree"`, `marker-="open tree open"` for open ends

**Block wrapper:** `is-="typography-block"` applies typography to children.

## Pre — `pre.css`

```html
<pre>…</pre>
```

**Sizes:** `size-="small"`, default, `size-="large"`.

**Variable:** `--pre-background`

**Extend:** `@layer components` on `pre, [is-~='pre']`.

## Table — `table.css`

Standard `<table>` / `thead` / `tbody` / `tfoot` / `tr` / `th` / `td`.

**Caveat:** `<caption>` breaks the ASCII box look.

**Variables:** `--table-border-width`, `--table-border-color` (inherits per 0.1.2+).

## Separator — `separator.css`

```html
<div is-="separator"></div>
```

**Direction:** default horizontal; `direction-="vertical"` / `y` or `horizontal` / `x`.

**Caps:** `cap-="bisect"` (extends `0.5ch` for box alignment), `cap-="edge"` (clips `0.5ch`), `default`; pair values for start/end, e.g. `cap-="edge bisect"`.

**Variables:** `--separator-width`, `--separator-color`, `--separator-background`

**Scope / extend:** `[is-~='separator']` in `@layer components`.

## View — `view.css`

TUI-sized panel: outer snaps to **`ch`/`lh`** grid.

```html
<div is-="view">
    <div is-="view-content">…</div>
</div>
```

**Extend:** `@layer components` for `[is-~='view']` and `[is-~='view-content']`.
