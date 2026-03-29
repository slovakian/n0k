# WebTUI — Progress and spinner

## Progress — `progress.css`

Use a **`<div is-="progress">`**, not `<progress>` (Gecko / `attr()` limitations).

Display rounds to **nearest character width**.

```html
<div is-="progress" style="--progress-value: 50;">50%</div>
<div is-="progress" style="--progress-value: 2; --progress-max: 5;">2/5</div>
```

**Variables:**

- `--progress-value` (default 0), `--progress-max` (default 100)
- `--progress-value-background`, `--progress-value-color`, `--progress-value-content`
- `--progress-empty-background`, `--progress-empty-color`, `--progress-empty-content`

**Note:** for custom bar characters, you must supply a **fixed-length string** for value/empty content (CSS cannot repeat text arbitrarily).

**Extend:** `[is-~='progress']` in `@layer components` (use **`variant-`** with hyphen suffix per project rules).

## Spinner — `spinner.css`

```html
<span is-="spinner"></span>
```

**Variants:** default (line), `dots`, `arrows`, `cross`, `square`, `pie`, `half`, `bar-vertical`, `bar-horizontal`.

**Speed:** `speed-="slow|medium|fast"`

**Direction:** e.g. `direction-="reverse"` with `variant-="dots"`.

**Variables:** `--spinner-chars`, `--spinner-steps` (must match char count), `--spinner-duration`

**Extend:** `[is-='spinner']` / `[is-~='spinner']` with new `variant-` in `@layer components`.
