# WebTUI — `box-` utility (ASCII boxes)

Import:

```css
@import '@webtui/css/utils/box.css';
```

## Usage

```html
<div box-="square">Hi Mom</div>
```

**The attribute is `box-` with a trailing hyphen.** `box="..."` does **not** work.

## Border types

Combine keywords as needed:

- `square`, `round`, `double` (e.g. `box-="double round"`).

## `shear-` (top/bottom padding)

Shears padding so content can sit flush with the top/bottom edge:

- `shear-="top"`, `shear-="bottom"`, `shear-="both"`.

(Replaces pre-0.1.0 `contain:*` on `box-`; use `shear-` now.)

## CSS variables

- `--box-border-color`
- `--box-rounded-radius` (round boxes)
- `--box-border-width` (square/round)
- `--box-double-border-width`

## Extending

```css
@layer utils {
    [box-~='square'],
    [box-~='round'],
    [box-~='double'] {
        /* ... */
    }
}
```
