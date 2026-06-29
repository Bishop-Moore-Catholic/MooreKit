BMC V3 COMPONENT FRAMEWORK

FILES
- bmc-v3.css: scoped component and utility framework
- index.html: visual boilerplate and component gallery
- usage.html: Bootstrap-style usage and class reference

QUICK START
1. Upload bmc-v3.css to your shared CSS directory.
2. Load it on the page.
3. Wrap new content in <div class="bmc-v3">.
4. For linked buttons, use both framework and site classes: class="bmc-btn button".

NAMESPACE
All framework selectors are scoped beneath .bmc-v3.

BUTTON NOTE
The dark button uses high-specificity selectors so it defaults to white text on black and changes to black text on gold when hovered or focused.


GITHUB PAGES DIRECTORY STRUCTURE
--------------------------------
Upload the folder as a unit:

index.html
usage.html
bmc-v3.css
assets/
  images/
    hero-stage.png
    legacy-football-historic.png
    legacy-science-historic.jpg
    legacy-science-current.jpg

All demonstration images use relative paths, so the boilerplate works from a GitHub Pages project directory or subdirectory without URL changes. All framework components use square corners, including pills.
