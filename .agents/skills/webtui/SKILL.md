---
name: web-tui
description: WebTUI (@webtui/css)—terminal-style UI in the browser via CSS. Use when adding or styling WebTUI, importing layers, themes/plugins, box- or is- components, or migrating versions.
---

WebTUI is a **CSS library** for **terminal-like UIs** in the browser: modular imports, **`@layer` ordering** (`base`, `utils`, `components`), and **minimal markup**. Utility and component **attributes are suffixed with `-`** (e.g. `is-="badge"`, `box-="square"`, `variant-="background0"`). Never use unsuffixed `box="..."`—it will not work.

**Always define layer order before any `@webtui` import:**

```css
@layer base, utils, components;

@import '@webtui/css/base.css';
```

Then import only the CSS you need (utils/components), or use ESM `import '@webtui/css/components/...css'` after globals define layers.

## Progressive disclosure (read what you need)

| Topic | File |
|--------|------|
| Install, CDN, full bundle, Vite / Next.js / Astro | `installation.md` |
| CSS variables, light/dark, theme plugins, accent fallbacks | `theming.md` |
| Monospace, `ch` / `lh`, TUI vs GUI mindset | `tui-foundation.md` |
| `box-` ASCII frames, `shear-` | `box-utility.md` |
| Official plugins, Nerd Font, authoring plugins | `plugins.md` |
| Catppuccin, Nord, Gruvbox, Vitesse, Everforest | `themes.md` |
| Breaking changes and migrations (changelog digest) | `changelog-migrations.md` |
| Quick component → import map | `components-index.md` |
| Typography, pre, table, separator, view | `components-content-structure.md` |
| Button, badge, inputs, checkbox, radio, switch, range | `components-interactive.md` |
| Dialog, popover, tooltip, accordion | `components-overlays.md` |
| Progress, spinner | `components-feedback.md` |

Package: **`@webtui/css`**. Dark built-in theme: **`data-webtui-theme="dark"`** on `<html>` or a subtree.
