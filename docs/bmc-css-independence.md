# BMC-CSS Independence Audit

MooreKit was developed in the Bishop Moore Catholic CMS environment alongside
[`Bishop-Moore-Catholic/BMC-CSS`](https://github.com/Bishop-Moore-Catholic/BMC-CSS).
That upstream repository contains one stylesheet, `bmc-style.css`. It combines a
small brand foundation with corrections for the current CMS theme and its
third-party widgets.

This document records which upstream concerns belong in MooreKit and which do
not. The audit is based on the upstream `main` branch reviewed July 23, 2026.

## Portable foundation

The following concerns are fundamental to a standalone MooreKit page:

| Upstream concern | MooreKit implementation |
|---|---|
| Adobe Fonts kit (`ymt8xmp`) | Imported directly by `bmc-v3.css` |
| Futura PT as the primary sans-serif face | `--bmc-v3-font-sans`, including the Adobe family name `futura-pt` and system fallbacks |
| Heading and body typography | Scoped semantic defaults and `bmc-*` typography utilities |
| Responsive images and embedded media | Scoped media defaults and MooreKit media components |
| Buttons and interactive controls | Namespaced `bmc-btn` components with keyboard focus behavior |
| Mobile layout behavior | Responsive grid, display, spacing, alignment, and component rules |

These foundations are included in MooreKit itself. A page only needs
`bmc-v3.css`, the `.bmc-v3` wrapper, and `bmc-v3.js` when it uses an enhanced
carousel.

The font kit remains a network-hosted brand asset, not a dependency on BMC-CSS.
When it cannot load, MooreKit falls back to Futura PT if locally available, then
Avenir Next, Avenir, Montserrat, Arial, and finally the generic sans-serif face.

## CMS corrections intentionally excluded

The remainder of BMC-CSS targets the deployed site rather than reusable
components. MooreKit does not copy these global or environment-specific rules:

- UIkit selectors such as `.uk-h1`, `.uk-h2`, `.uk-card-title`, and
  `.uk-text-primary`.
- CMS content and module selectors such as `.inside`, `.middle_column`,
  `.right_content`, `.detail_profiles`, `.detail_announcements2`,
  `.announcement_photo`, `.links-list`, `.calendar_list_title`, and
  `.per_blog_post`.
- Site-shell navigation and menu selectors such as `#topnav`, `#menu`,
  `.drop_level2_wrapper`, and `article#logo`.
- Third-party widget overrides such as `.swal2-close` and
  `.swal2-html-container`.
- Editor-generated layout corrections such as `.multi-column`,
  `.multi-description`, `.image_resized`, and `.image-style-align-left`.
- Global element overrides and the generic website `.button` class.

Those rules should remain in BMC-CSS because they intentionally affect markup
outside `.bmc-v3`. Moving them into MooreKit would break its namespace guarantee
and tie the framework to one CMS implementation.

## Migration and verification

To verify a page without the upstream dependency:

1. Remove the BMC-CSS link from a test page while retaining `bmc-v3.css`.
2. Confirm the page's MooreKit region is wrapped in `.bmc-v3`.
3. Check headings, body copy, buttons, images, grids, and mobile layouts.
4. Verify the `futura-pt` request succeeds, then repeat with network fonts
   disabled to confirm the fallback stack.
5. If the surrounding site shell changes, keep BMC-CSS on that CMS page; the
   affected rules are site corrections, not MooreKit dependencies.

The independence boundary is deliberate: MooreKit owns reusable, scoped
components and foundations; BMC-CSS owns global CMS and site-shell corrections.
