# AGENTS.md

Guidance for future agents working in MooreKit.

## Project Shape

MooreKit is a lightweight, static component framework for Bishop Moore Catholic web pages. It is intentionally small: scoped CSS, optional dependency-free JavaScript, static documentation pages, and local demo images.

Primary files:

- `bmc-v3.css` - source stylesheet for the framework.
- `bmc-v3.min.css` - minified stylesheet that should stay in sync with `bmc-v3.css`.
- `bmc-v3.js` - optional progressive enhancement for `[data-bmc-carousel]`.
- `index.html` - root GitHub Pages component gallery.
- `docs/index.html` - usage guide and class reference.
- `docs/examples.html` - component gallery/boilerplate.
- `docs/team-timeline.html` and `docs/left-timeline.html` - timeline examples.
- `assets/images/` - local demo images referenced with relative paths.

There is no build system or package manifest in this repo. Do not add dependencies, bundlers, preprocessors, or a framework unless the user explicitly asks for that direction.

## Core Conventions

- Keep all framework selectors scoped beneath `.bmc-v3`.
- Use the `bmc-` or established `bmc-v3-` naming patterns for new classes.
- Do not rely on global element styles outside the `.bmc-v3` namespace, except page-local demo/doc styling.
- Components should be responsive by default.
- Use framework CSS variables for shared colors, spacing, font families, sizing, and reusable geometry.
- Keep the visual language consistent with the existing system: square corners, rectangular pills, black/white/gold/neutral palette, and restrained presentation.
- Use relative asset URLs so the site works from a GitHub Pages project directory or subdirectory.
- Preserve accessibility attributes in examples and components: meaningful `alt`, semantic headings, keyboard support, `aria-live` status where used, and reduced-motion behavior.

## CSS Guidance

- Edit `bmc-v3.css` as the source of truth.
- When changing framework CSS, update `bmc-v3.min.css` in the same change.
- Group new rules near related sections and keep section comments consistent with the existing file.
- Prefer existing utility patterns before adding one-off component rules.
- Avoid breaking existing class contracts; add compatibility aliases when replacing or generalizing previously documented classes.
- Do not use the generic website `.button` class in examples. Use `.bmc-btn` and its MooreKit modifiers.
- Image shape geometry should remain stable. Flat-top hexagons and pointed hexagons use the framework variables and should keep equal-side proportions.

## JavaScript Guidance

- Keep `bmc-v3.js` dependency-free and browser-native.
- Treat JavaScript as progressive enhancement. Static markup should remain readable and usable when the script is absent.
- Carousel behavior is opt-in through `data-bmc-carousel`.
- Preserve support for keyboard navigation, status text, disabled control state, looped navigation, media pausing, and `prefers-reduced-motion`.
- Keep the public initializer available as `window.MooreKit.initCarousels(containerElement)` for dynamically inserted markup.

## Documentation Expectations

When adding or changing a component, utility, modifier, or behavior:

- Update `README.md` with the short usage guidance.
- Update `docs/index.html` when the class reference or copy-and-paste example changes.
- Update `index.html` and/or `docs/examples.html` when a visual example should be represented in the gallery.
- Keep paths correct for each location: root pages use `assets/...`, docs pages use `../assets/...`.
- Keep examples realistic but generic; demo content should not imply live data unless provided by the user.

## Verification Checklist

Before finishing:

- Confirm `git status --short` only shows intended files.
- Open or inspect affected HTML examples for broken paths, missing closing tags, and inconsistent class names.
- Check responsive behavior for changed layout/components at mobile and desktop widths.
- For carousel edits, verify previous/next buttons, keyboard navigation, loop/non-loop behavior, status text, and reduced-motion handling.
- If CSS changed, confirm `bmc-v3.min.css` matches the source changes.

## Editing Discipline

- Keep changes tightly scoped to the requested component, utility, doc page, or behavior.
- Do not reformat entire files unless formatting is the explicit task.
- Preserve user edits and unrelated local changes.
- Prefer clear, reusable framework patterns over page-specific fixes when the behavior belongs to MooreKit.
