# WebTUI — Button, badge, inputs, checkbox, radio, switch, range

## Button — `button.css`

```html
<button>…</button>
<div is-="button">…</div>
```

**Variants:** `variant-="background0"` … `background3`, `foreground0` … `foreground2` (match base theme).

**Sizes:** `size-="small"`, default, `size-="large"`.

**Box borders:** import `box.css`, then `box-="round|square|double"`.

**Variables:** `--button-primary`, `--button-secondary` (swap behavior when `box-` is used).

**Extend:** `@layer components` — `button, [is-~='button'] { &[variant-='…'] { … } }`.

## Badge — `badge.css`

```html
<span is-="badge">…</span>
```

**Variants:** base theme colors (`background0`–`3`, `foreground0`–`2`); themes add more.

**Caps:** `cap-="square|round|triangle|ribbon|slant-top|slant-bottom"`; two values for start/end.

**Variables:** `--badge-color`, `--badge-text` (prefer over raw `background-color` on the element).

## Input — `input.css`

```html
<input />
```

**Sizes:** `size-="small"`, default, `size-="large"`.

**Box:** cannot put `box-` on `<input>` (no pseudo-elements). Wrap with **`<label box-="…">`** or use **`contenteditable`** with `box-`.

**Scope:** `input` not `button|submit|reset|checkbox|radio`, plus `[is-~='input']`.

## Textarea — `textarea.css`

```html
<textarea></textarea>
```

**Sizes:** `size-="small"`, default, `size-="large"`.

**Extend:** `textarea, [is-~='textarea']` in `@layer components`.

## Checkbox — `checkbox.css`

```html
<label><input type="checkbox" /> Label</label>
```

**Scope:** `input[type='checkbox']:not([is-='switch'])`.

## Radio — `radio.css`

```html
<label><input type="radio" name="…" /> Option</label>
```

**Scope:** `input[type='radio']`.

## Switch — `switch.css`

```html
<input type="checkbox" is-="switch" />
```

**Sizes:** `size-="small"`, default.

**Bar:** `bar-="thin"` or `bar-="line"`.

**Variables:** `--switch-thumb-color`, `--switch-track-color`

**Scope:** `input[type='checkbox'][is-='switch']`.

## Range — `range.css`

```html
<input type="range" />
```

**Track styles:** `bar-="thick"`, `bar-="line"` (default bar).

**Variables:** `--range-track-color`, `--range-thumb-color`, `--range-thumb-color-focus`, `--range-track-height`

**Extend:** `input[type='range']` in `@layer components`.
