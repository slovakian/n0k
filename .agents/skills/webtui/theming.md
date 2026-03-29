# WebTUI — Theming

## Base CSS variables

Customize in **`@layer base`** on `:root`:

**Font:** `--font-size`, `--line-height`, `--font-weight-bold`, `--font-weight-normal`, `--font-family`.

**Colors (four background, three foreground levels):**

- `--background0` … `--background3`
- `--foreground0` … `--foreground2`
- Component borders: `--box-border-color`, `--table-border-color`, `--separator-color` (often set to `var(--foreground0)` or themed values)

## Built-in light and dark

Add to `<html>` or any subtree:

```html
<html data-webtui-theme="dark"></html>
```

## Theme plugins

Theme packages override base colors and often add **badge/button/typography** variants. Import **after** all `@webtui/css` imports. Set **`data-webtui-theme="<theme-id>"`** on `<html>` or a wrapper element for scoped theming.

Details per package: see `themes.md`.

## Multiple themes / accent names

Accent variable names differ by theme (`--blue` vs `--aqua` vs `--gb-aqua`, etc.). Use **fallback chains**:

```css
#my-element {
    color: var(--gb-aqua, var(--blue, var(--cyan)));
}
```
