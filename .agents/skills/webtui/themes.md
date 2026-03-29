# WebTUI — Theme plugins

**Rules for all:** Install the npm package (`bun|npm|yarn|pnpm i @webtui/theme-<name>`). In CSS, **`@import` the theme after every `@webtui/css` import** or overrides will not apply. Set **`data-webtui-theme="..."`** on `<html>` or a subtree.

Packages: `@webtui/theme-catppuccin`, `@webtui/theme-nord`, `@webtui/theme-gruvbox`, `@webtui/theme-vitesse`, `@webtui/theme-everforest`.

```css
@layer base, utils, components;

@import '@webtui/css/base.css';
@import '@webtui/css/components/typography.css';
/* ... */
@import '@webtui/theme-<name>';
```

## Catppuccin — `@webtui/theme-catppuccin`

**Flavors:** `catppuccin` (same as mocha), `catppuccin-mocha`, `catppuccin-macchiato`, `catppuccin-frappe`, `catppuccin-latte`.

**Components:** colored `h1`–`h6`; links → `var(--sky)`; inline `code` → `var(--red)`; **badge** and **button** gain accent variants (`rosewater`, `flamingo`, … `lavender`).

**Variables:** accent palette (`--rosewater`, `--mauve`, …) plus Catppuccin surfaces; maps to `--background0`–`3` / `--foreground0`–`2` under `[data-webtui-theme='catppuccin-*']`.

## Nord — `@webtui/theme-nord`

**Theme id:** `nord`.

**Components:** headings colored; links `var(--nord7)`; code `var(--nord12)`; **badge**/**button** variants `nord0`–`nord15`.

**Variables:** `--nord0`–`--nord15` (Polar Night, Snow Storm, Frost, Aurora); base bg/fg map from those on `:root` in theme.

## Gruvbox — `@webtui/theme-gruvbox`

**Variants:** dark/light × hard/medium/soft. Examples: `gruvbox-dark-hard`, `gruvbox-dark-medium`, `gruvbox-dark-soft`; `gruvbox-light-hard`, `gruvbox-light-medium`, `gruvbox-light-soft`. Defaults: **`gruvbox`** / **`gruvbox-dark`** → dark medium; **`gruvbox-light`** → light medium.

**Components:** headings use `var(--gb-green)`; links `var(--gb-blue)` hover `var(--gb-aqua)`; code `var(--gb-orange)`; badge/button variants `gray`, `red`, … `orange`.

**Variables:** `--gb-*` and dark palette mappings under `[data-webtui-theme='gruvbox-*-*']`.

## Vitesse — `@webtui/theme-vitesse`

**Variants:** `vitesse-black`, `vitesse-dark-soft`, `vitesse-dark` (default for `vitesse`), `vitesse-light`, `vitesse-light-soft`.

**Components:** headings `var(--green)`; links `var(--blue)` hover `var(--aqua)`; code `var(--orange)`; badge/button accents `gray`, `red`, … `orange`.

**Variables:** `--bg0`–`--bg4`, `--fg0`–`--fg4`, accent `--gray`, `--red`, … under `[data-webtui-theme='vitesse-*-*']`.

## Everforest — `@webtui/theme-everforest`

**Variants:** `everforest-dark-hard`, `everforest-dark-medium`, `everforest-dark-soft` (defaults: `everforest-dark` / `everforest`); `everforest-light-hard`, `everforest-light-medium`, `everforest-light-soft` (default light: `everforest-light`).

**Components:** headings `var(--ef-green)`; links `var(--ef-blue)` hover `var(--ef-aqua)`; code `var(--ef-orange)`; badge/button red/orange/yellow/green/blue/aqua/purple variants.

**Variables:** `--red`, `--orange`, … `--bg0`–`--bg5`, `--fg`, grays; bg/fg levels under `[data-webtui-theme='everforest-*-*']`.
