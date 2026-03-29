# WebTUI — Component quick index

Import path pattern: `@webtui/css/components/<name>.css`

| Component | Import | Markup / notes |
|-----------|--------|----------------|
| Accordion | `accordion.css` | `<details is-="accordion"><summary>…</summary>…` |
| Badge | `badge.css` | `<span is-="badge">` — `variant-`, `cap-` |
| Button | `button.css` | `<button>` or `<div is-="button">` — `variant-`, `size-`, optional `box-` (+ `box.css`) |
| Checkbox | `checkbox.css` | `<input type="checkbox">` not `is-="switch"` |
| Dialog | `dialog.css` | `<dialog>` — `position-`, `container-`, `size-`, popover API |
| Input | `input.css` | `<input>` (not button/submit/reset/checkbox/radio) — `size-`; wrap in `<label box-="…">` for box |
| Popover | `popover.css` | `<details is-="popover">` + `position-` |
| Pre | `pre.css` | `<pre>` — `size-`, `--pre-background` |
| Progress | `progress.css` | `<div is-="progress">` + `--progress-value` / `--progress-max` |
| Radio | `radio.css` | `<input type="radio">` |
| Range | `range.css` | `<input type="range">` — `bar-="thick|line"` |
| Separator | `separator.css` | `<div is-="separator">` — `direction-`, `cap-` |
| Spinner | `spinner.css` | `<span is-="spinner">` — `variant-`, `speed-`, `direction-` |
| Switch | `switch.css` | `<input type="checkbox" is-="switch">` — `size-`, `bar-` |
| Table | `table.css` | `<table>` — avoid `<caption>` (breaks ASCII styling) |
| Textarea | `textarea.css` | `<textarea>` — `size-` |
| Tooltip | `tooltip.css` | `<div is-="tooltip">` + trigger/content children |
| Typography | `typography.css` | headings, `p`, lists, `blockquote`, inline — `ul marker-` |
| View | `view.css` | `<div is-="view"><div is-="view-content">` |

See split files for attributes, CSS variables, extending patterns, and caveats.
