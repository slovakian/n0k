# WebTUI — TUIs vs GUIs and layout units

**TUIs** use ASCII/Unicode for UI chrome; **GUIs** use typical graphical controls. For terminal-like pages:

1. Use a **monospace** font (even character width, alignment, ASCII art).
2. Think in **character cells**, not only `px` / `em` / `rem`.

## CSS units

- **`ch`**: width of the `0` glyph in the current font ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/length#ch)). With monospace, one `ch` ≈ one character column.
- **`lh`**: line height of the element ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/length#lh)).

Example “cell” sizing:

```css
.box {
    width: 10ch;
    height: 5lh;
}
```
