# WebTUI — Changelog highlights and migrations

## 0.1.6–0.1.7

- **Table:** single-row display fixed.
- **Accordion** added.
- **Progress:** uses CSS variables (see below).

### Progress (from 0.1.5)

Do **not** use `<progress>`; Gecko limitations. Use a **`<div is-="progress">`** with **inline styles or CSS**:

```html
<div is-="progress" style="--progress-value: 50;">50%</div>
<div is-="progress" style="--progress-value: 8; --progress-max: 10;">8/10</div>
```

```js
el.style.setProperty('--progress-max', '100')
el.style.setProperty('--progress-value', '50')
```

## 0.1.5

- **View**, **Progress** added; popover arrow marker Safari fix.

## 0.1.2

- **Switch** dimmer when unchecked; track with checkbox stylesheet.
- **Separator** bisect/edge caps; **badge** vertical align.
- **Dialog:** invalid `initial-value` removed.
- **Headings:** markdown-like `#` prefixes on `h1`–`h6` **removed** — restore with `::before` if needed.
- `--box-border-color`, `--table-border-color`, `--separator-color` **inherit** from ancestors (no longer always `--foreground0`). Set defaults on `:root` in `@layer base` if needed.

## 0.1.1

- **Switch** added; **pre** default height reduced (`size-="small"` / default / `size-="large"`).

## 0.1.0

- **`box-`:** `contain:*` removed → use **`shear-`** (`top`, `bottom`, `both`). `box-` no longer allows multiple keywords in the same way — review layouts using old `contain`.
- **Button:** default shorter; **`size-="small"` / default / `size-="large"`**.

## 0.0.x → 0.1.0 box migration

Old:

```html
<div box-="square contain:!top"></div>
```

New:

```html
<div box-="square" shear-="top"></div>
```
