# BMC V3 Component Framework

A lightweight, reusable CSS component and utility framework for Bishop Moore Catholic web pages.

The framework is scoped beneath the `.bmc-v3` namespace so it can be added to existing pages without unintentionally changing unrelated site elements.

## Included Files

| File | Purpose |
|---|---|
| `bmc-v3.css` | Scoped component and utility framework |
| `bmc-v3.min.css` | Minified framework stylesheet |
| `bmc-v3.js` | Optional carousel initializer for `[data-bmc-carousel]` components |
| `index.html` | Visual boilerplate and component gallery |
| `usage.html` | Bootstrap-style usage guide and class reference |
| `assets/images/` | Local demonstration images used by the boilerplate |

## Quick Start

### 1. Add the stylesheet

```html
<link rel="stylesheet" href="bmc-v3.css">
```

When the stylesheet is stored in another directory, update the path as needed:

```html
<link rel="stylesheet" href="/editoruploads/css/bmc-v3.css">
```

Load the JavaScript file once on pages that use carousels:

```html
<script src="bmc-v3.js" defer></script>
```

### 2. Add the framework namespace

Wrap framework content in an element with the `.bmc-v3` class:

```html
<div class="bmc-v3">
  <section class="bmc-section">
    <div class="bmc-container">
      <h2 class="bmc-heading-1">
        Build <strong>Something Moore</strong>
      </h2>

      <p class="bmc-lead">
        Add responsive BMC components without affecting the rest of the website.
      </p>
    </div>
  </section>
</div>
```

All framework selectors are scoped beneath `.bmc-v3`.

## Buttons

Use MooreKit's namespaced `.bmc-btn` class by itself. Do not add the website's generic `.button` class, because site-level button rules can override MooreKit variants:

```html
<a class="bmc-btn" href="#">
  Learn More
</a>
```

### Button variants

```html
<a class="bmc-btn" href="#">Primary</a>

<a class="bmc-btn bmc-btn-dark" href="#">
  Dark
</a>

<a class="bmc-btn bmc-btn-outline" href="#">
  Outline
</a>
```

The dark displays white text on black by default and changes to black text on gold when hovered or focused.

## Responsive Grid

The framework includes a Bootstrap-style 12-column responsive grid:

```html
<div class="bmc-row bmc-g-3">
  <div class="bmc-col-12 bmc-col-md-6">
    <div class="bmc-card">First column</div>
  </div>

  <div class="bmc-col-12 bmc-col-md-6">
    <div class="bmc-card">Second column</div>
  </div>
</div>
```

## Alternating Grid Utility

Use `bmc-grid-alternate` to place direct children in alternating left and right columns on screens 992px and wider. The items automatically collapse into one column on smaller screens.

```html
<div class="bmc-grid-alternate bmc-gap-4">
  <article>First item: left</article>
  <article>Second item: right</article>
  <article>Third item: left</article>
</div>
```

Add `bmc-grid-alternate-align` to right-align odd items and left-align even items on large screens. Mobile text returns to left alignment.

Text alignment utilities include `bmc-text-left`, `bmc-text-center`, `bmc-text-right`, `bmc-text-start`, and `bmc-text-end`, plus responsive `sm`, `md`, and `lg` variants for left, center, and right alignment.

## Component Examples

The framework includes reusable components for:

- Buttons
- Cards
- Pills
- Hexagons
- Quotes and testimonials
- Statistics
- Responsive videos
- Image and legacy cards
- Image-card carousels
- Tables
- Heroes
- Section headings
- Responsive columns and grids
- Typography and alignment utilities
- Spacing, display, flex, width, and visibility utilities

Open `index.html` to view the component gallery.

Open `usage.html` for the full class and component reference.

### Image-card carousel

Load `bmc-v3.js` once, then add `data-bmc-carousel` to the carousel root. The component shows three cards on desktop, two on tablet, and one on mobile. It supports scrolling, previous/next controls, keyboard navigation, status text, reduced-motion preferences, and optional looped navigation.

```html
<div class="bmc-carousel" data-bmc-carousel data-bmc-carousel-loop="true">
  <div class="bmc-carousel-header">
    <div>
      <span class="bmc-eyebrow">The latest from Imagine Moore</span>
      <h2 class="bmc-heading-2">Project <strong>Updates</strong></h2>
    </div>

    <div class="bmc-carousel-actions" aria-label="Carousel controls">
      <button class="bmc-carousel-button" type="button" data-bmc-carousel-prev aria-label="Previous">
        <span aria-hidden="true">&#8592;</span>
      </button>
      <button class="bmc-carousel-button" type="button" data-bmc-carousel-next aria-label="Next">
        <span aria-hidden="true">&#8594;</span>
      </button>
    </div>
  </div>

  <div class="bmc-carousel-viewport" data-bmc-carousel-viewport tabindex="0" aria-label="Project updates">
    <ul class="bmc-carousel-track" data-bmc-carousel-track>
      <li class="bmc-carousel-slide" data-bmc-carousel-slide>
        <article class="bmc-image-card">
          <div class="bmc-image-card-media bmc-image-card-media-landscape">
            <img src="image.jpg" alt="Description">
          </div>
          <div class="bmc-image-card-body">
            <p class="bmc-carousel-meta">July 2026</p>
            <h3 class="bmc-carousel-title">Update Title</h3>
            <p>Short update copy.</p>
          </div>
        </article>
      </li>
    </ul>
  </div>

  <p class="bmc-carousel-status" data-bmc-carousel-status aria-live="polite"></p>
</div>
```

Looping is disabled by default; add `data-bmc-carousel-loop="true"` for wraparound navigation. Media stages support `bmc-image-card-media-landscape`, `bmc-image-card-media-portrait`, and `bmc-image-card-media-square`. Images and videos preserve their full frame by default; add `bmc-image-card-media-cover` when intentional cropping is preferred. For YouTube embeds that should pause when they leave view, add `?enablejsapi=1` to the embed URL and include `data-bmc-video` on the `iframe`.

For dynamically inserted carousel markup, run:

```js
window.MooreKit.initCarousels(containerElement);
```


### Team timeline

```html
<div class="bmc-team-timeline">
  <article class="bmc-team-timeline-item">
    <div class="bmc-team-timeline-media bmc-team-timeline-media-circle">
      <img src="portrait.jpg" alt="Team member name">
    </div>
    <div class="bmc-team-timeline-content">
      <h3 class="bmc-team-timeline-name">Team Member</h3>
      <p class="bmc-team-timeline-role">Position</p>
      <p>Short biography or description.</p>
    </div>
  </article>
</div>
```

Use `bmc-team-timeline-media-hex` instead of `bmc-team-timeline-media-circle` for regular, equal-sided hexagon portraits. Add `bmc-team-timeline-compact` to the timeline for smaller desktop images.

Add `bmc-team-timeline-left` to place the timeline rail on the left and keep every entry to its right. For historical or milestone timelines, wrap an existing MooreKit pill in `bmc-team-timeline-year`; use `bmc-team-timeline-gallery` for image stacks. See `left-timeline.html` for a complete converted example.

## GitHub Pages Structure

Upload the project folder as a unit:

```text
bmc-v3-framework/
├── index.html
├── usage.html
├── bmc-v3.css
├── bmc-v3.min.css
├── bmc-v3.js
├── README.md
└── assets/
    └── images/
        ├── hero-stage.png
        ├── legacy-football-historic.png
        ├── legacy-science-historic.jpg
        └── legacy-science-current.jpg
```

All demonstration images use relative paths:

```html
<img
  src="assets/images/hero-stage.png"
  alt="Students performing on stage"
>
```

This allows the framework to work from a GitHub Pages project directory or subdirectory without changing image URLs.

## Design Conventions

- All components use square corners.
- Pills are rectangular rather than rounded.
- Colors and spacing are controlled through framework variables.
- Components are responsive by default.
- Framework styles remain scoped beneath `.bmc-v3`.
- Carousel behavior is opt-in through `bmc-v3.js`.
- Reduced-motion preferences are respected.
- Utility classes follow a Bootstrap-inspired naming pattern.

## Documentation

- [`index.html`](index.html) — component gallery and boilerplate
- [`usage.html`](usage.html) — usage guide and complete class reference
- [`bmc-v3.css`](bmc-v3.css) — framework stylesheet
- [`bmc-v3.min.css`](bmc-v3.min.css) — minified stylesheet
- [`bmc-v3.js`](bmc-v3.js) — carousel initializer

## Basic Page Template

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BMC V3 Page</title>

  <link rel="stylesheet" href="bmc-v3.css">
  <script src="bmc-v3.js" defer></script>
</head>
<body>
  <main class="bmc-v3">
    <section class="bmc-section">
      <div class="bmc-container">
        <span class="bmc-eyebrow">Bishop Moore Catholic</span>

        <h1 class="bmc-heading-1">
          Page <strong>Title</strong>
        </h1>

        <p class="bmc-lead">
          Add page content here.
        </p>

        <a class="bmc-btn" href="#">
          Call to Action
        </a>
      </div>
    </section>
  </main>
</body>
</html>
```


## Hexagon orientations

MooreKit hexagons are flat-top by default. Add `bmc-hex-pointed` to text hexagons or use `bmc-team-timeline-media-hex-pointed` for point-up/point-down image hexagons.


## Global image shapes

Use `bmc-image-shape` with `bmc-image-circle`, `bmc-image-hex`, or `bmc-image-hex-pointed`. Size modifiers include `bmc-image-shape-sm`, `bmc-image-shape-lg`, and `bmc-image-shape-fluid`. The team timeline uses these same global utilities; the older timeline-specific shape classes remain as compatibility aliases.


### Current fixes
- Regular flat-top and pointed image hexagons retain equal side geometry inside the team timeline.
- Standard, outline, and light buttons use gold hover text on a black hover background; the dark retains its dedicated inverse treatment.
