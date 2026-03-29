# WebTUI — Plugins

Plugins are **external stylesheets** that work with `@webtui/css`.

## Official

- **Nerd Font:** `@webtui/plugin-nf` — see install/font stack in this file below.
- **Themes:** Catppuccin, Nord, Gruvbox, Vitesse, Everforest (`themes.md`).

## `@webtui/plugin-nf` (Nerd Font)

Install:

```bash
bun i @webtui/plugin-nf
npm i @webtui/plugin-nf
yarn add @webtui/plugin-nf
pnpm i @webtui/plugin-nf
```

Import **at the end** of the WebTUI import chain:

```css
@import '@webtui/css/base.css';
@import '@webtui/css/components/typography.css';
/* ... */
@import '@webtui/plugin-nf';
```

Append **`"Symbols Nerd Font"`** to the end of `--font-family`:

```css
@layer base {
  :root {
    --font-family: /* your fonts */, Menlo, Monaco, monospace, "Symbols Nerd Font";
  }
}
```

Icons: [nerdfonts.com](https://www.nerdfonts.com) and [cheat sheet](https://www.nerdfonts.com/cheat-sheet).

## Authoring a plugin

1. Export one or more **CSS** entry points.
2. Publish to **npm**.
3. Utility/component variant attributes must use the **`-` suffix** (e.g. `variant-="foo"`).
4. Use correct **`@layer`**: `base` (tokens, fonts), `utils` (utilities), `components` (components).

```css
@layer base { /* ... */ }
@layer utils { /* ... */ }
@layer components { /* ... */ }
```
