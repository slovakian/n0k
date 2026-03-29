# WebTUI — Dialog, popover, tooltip, accordion

## Dialog — `dialog.css`

```html
<dialog>…</dialog>
```

Use HTML **`popover`** / **`popovertarget`** or JS `showModal()` per [MDN dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog).

**Position:** `position-="<anchor>"` or `position-="<x> <y>"` — e.g. `center`, `start end`, `center start`.

**Container:** `container-="auto"` | `fill`.

**Size:** `size-="small"` | default | `size-="full"`.

**Offset variables:** `--dialog-offset-x`, `--dialog-offset-y`; max size `--dialog-max-width`, `--dialog-max-height` (also driven by `size-`).

## Popover — `popover.css`

```html
<details is-="popover">
    <summary>Trigger</summary>
    <div>Content</div>
</details>
```

**Position:** same idea as dialog — corners, `baseline-*` variants; see site asset `popover-positioning.png` for diagram.

**Variables:** `--popover-backdrop-color`, `--popover-offset-x`, `--popover-offset-y`

**Caveat:** elements with **`box-`** that come **after** the popover in DOM can paint above the popover regardless of z-index. Workaround: parent **`flex-direction: row-reverse`** or **`column-reverse`** so the popover follows the box in order.

## Tooltip — `tooltip.css`

```html
<div is-="tooltip">
    <div is-="tooltip-trigger">…</div>
    <div is-="tooltip-content" position-="bottom right">…</div>
</div>
```

**Position:** on **`tooltip-content`**, same vocabulary as popover (including `baseline-*`).

**Variables:** `--tooltip-offset-x`, `--tooltip-offset-y`, `--tooltip-delay`

**Scope:** `[is-~='tooltip']`, children `[is-~='tooltip-trigger']`, `[is-~='tooltip-content']`.

## Accordion — `accordion.css`

```html
<details is-="accordion">
    <summary>Title</summary>
    <p>Content</p>
</details>
```

Supports nesting.

**Extend:** `@layer components` — `details[is-~='accordion'] { &[variant-='…'] { … } }`.
