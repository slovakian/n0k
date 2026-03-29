# WebTUI — Installation and imports

## Package

```bash
bun i @webtui/css
npm i @webtui/css
yarn add @webtui/css
pnpm install @webtui/css
```

## Global CSS (required pattern)

Define **`@layer` order first**, then import **base**:

```css
@layer base, utils, components;

@import '@webtui/css/base.css';
```

Add utilities and components **after** base:

```css
@import '@webtui/css/utils/box.css';
@import '@webtui/css/components/button.css';
@import '@webtui/css/components/typography.css';
```

Prefer **per-file imports** in production; avoid pulling the whole library unless developing.

## ESM (bundler)

```tsx
import '@webtui/css/components/button.css'
```

Layers must already be declared in global CSS.

## CDN (no bundler)

Use JSDelivr (pin a version):

```css
@layer base, utils, components;

@import 'https://cdn.jsdelivr.net/npm/@webtui/css@<version>/dist/base.css';
@import 'https://cdn.jsdelivr.net/npm/@webtui/css@<version>/dist/utils/box.css';
@import 'https://cdn.jsdelivr.net/npm/@webtui/css@<version>/dist/components/button.css';
```

Browse files: [cdn.jsdelivr.net/npm/@webtui/css/dist/](https://cdn.jsdelivr.net/npm/@webtui/css/dist/)

## Full library (development)

**CSS** (after defining layers):

```html
<style>
    @import '@webtui/css';
</style>
```

**ESM:**

```js
import '@webtui/css'
```

**CDN:** use `/dist/full.css` (pin version), or a `<link href=".../dist/full.css" rel="stylesheet">`.

## Framework notes

**Vite / Next.js:** Same global CSS pattern in `globals.css`; optional per-component ESM imports.

**Astro:** Import global CSS from the root layout frontmatter (`import '../styles/global.css'`). For component-scoped styling, import in frontmatter or use `<style is:global>` around `@import` of WebTUI CSS. For **full library** import from the package, set Vite `ssr.noExternal` to include **`@webtui/css`** (not a placeholder package name).
