/**
 * MooreKit carousel utility.
 * Dependency-free progressive enhancement for [data-bmc-carousel].
 */
(function () {
  "use strict";

  function pauseMedia(slide) {
    if (!slide) return;

    slide.querySelectorAll("video, audio").forEach(function (media) {
      if (typeof media.pause === "function") media.pause();
    });

    slide.querySelectorAll("iframe[data-bmc-video]").forEach(function (frame) {
      if (!frame.contentWindow) return;
      frame.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "pauseVideo",
          args: []
        }),
        "*"
      );
    });
  }

  function removeDuplicateIds(element) {
    if (element.id) element.removeAttribute("id");
    element.querySelectorAll("[id]").forEach(function (child) {
      child.removeAttribute("id");
    });
  }

  function makeClone(slide) {
    var clone = slide.cloneNode(true);
    clone.setAttribute("data-bmc-carousel-clone", "true");
    clone.setAttribute("aria-hidden", "true");
    clone.setAttribute("inert", "");
    removeDuplicateIds(clone);
    return clone;
  }

  function initCarousel(root) {
    if (root.dataset.bmcCarouselReady === "true") return;

    var viewport = root.querySelector("[data-bmc-carousel-viewport]");
    var track = root.querySelector("[data-bmc-carousel-track]");
    var originalSlides = Array.prototype.slice.call(
      root.querySelectorAll("[data-bmc-carousel-slide]:not([data-bmc-carousel-clone])")
    );
    var previous = root.querySelector("[data-bmc-carousel-prev]");
    var next = root.querySelector("[data-bmc-carousel-next]");
    var status = root.querySelector("[data-bmc-carousel-status]");

    if (!viewport || !track || !originalSlides.length) return;

    root.dataset.bmcCarouselReady = "true";

    var loop = root.getAttribute("data-bmc-carousel-loop") === "true";
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var physicalSlides = originalSlides;
    var currentPhysical = 0;
    var scrollTimer = null;
    var isJumping = false;

    function visibleCount() {
      var value = getComputedStyle(root)
        .getPropertyValue("--bmc-carousel-visible")
        .trim();
      return Math.max(1, parseInt(value, 10) || 1);
    }

    function canMove() {
      return originalSlides.length > visibleCount();
    }

    function maxIndex() {
      return Math.max(0, originalSlides.length - visibleCount());
    }

    function logicalIndex(physicalIndex) {
      var count = originalSlides.length;
      if (!loop) return Math.max(0, Math.min(physicalIndex, maxIndex()));
      return ((physicalIndex - count) % count + count) % count;
    }

    function buildLoopClones() {
      if (!loop || originalSlides.length < 2) return;

      var before = document.createDocumentFragment();
      var after = document.createDocumentFragment();

      originalSlides.forEach(function (slide) {
        before.appendChild(makeClone(slide));
        after.appendChild(makeClone(slide));
      });

      track.insertBefore(before, track.firstChild);
      track.appendChild(after);
      physicalSlides = Array.prototype.slice.call(
        track.querySelectorAll("[data-bmc-carousel-slide]")
      );
      currentPhysical = originalSlides.length;
    }

    function setScrollBehavior(value) {
      viewport.style.scrollBehavior = value;
    }

    function jumpToPhysical(index) {
      if (!physicalSlides[index]) return;
      isJumping = true;
      setScrollBehavior("auto");
      viewport.scrollLeft = physicalSlides[index].offsetLeft;
      currentPhysical = index;
      viewport.offsetHeight;
      setScrollBehavior("");
      window.requestAnimationFrame(function () {
        isJumping = false;
      });
    }

    function closestPhysicalIndex() {
      var left = viewport.scrollLeft;
      var nearest = 0;
      var distance = Infinity;

      physicalSlides.forEach(function (slide, index) {
        var difference = Math.abs(slide.offsetLeft - left);
        if (difference < distance) {
          distance = difference;
          nearest = index;
        }
      });

      return nearest;
    }

    function visibleLogicalIndices(start) {
      var indices = [];
      var count = Math.min(visibleCount(), originalSlides.length);
      for (var i = 0; i < count; i += 1) {
        indices.push((start + i) % originalSlides.length);
      }
      return indices;
    }

    function formatStatus(start) {
      var indices = visibleLogicalIndices(start).map(function (index) {
        return index + 1;
      });

      if (indices.length === 1) {
        return "Showing " + indices[0] + " of " + originalSlides.length;
      }

      var groups = [];
      var groupStart = indices[0];
      var previousValue = indices[0];

      for (var i = 1; i <= indices.length; i += 1) {
        var value = indices[i];
        if (i < indices.length && value === previousValue + 1) {
          previousValue = value;
          continue;
        }

        groups.push(
          groupStart === previousValue
            ? String(groupStart)
            : groupStart + "-" + previousValue
        );

        groupStart = value;
        previousValue = value;
      }

      return "Showing " + groups.join(", ") + " of " + originalSlides.length;
    }

    function updateControls() {
      var movable = canMove();
      var currentLogical = logicalIndex(currentPhysical);

      if (previous) {
        previous.disabled = !movable || (!loop && currentPhysical <= 0);
      }

      if (next) {
        next.disabled = !movable || (!loop && currentPhysical >= maxIndex());
      }

      if (status) {
        status.textContent = formatStatus(currentLogical);
      }

      var visible = visibleLogicalIndices(currentLogical);
      originalSlides.forEach(function (slide, index) {
        var isVisible = visible.indexOf(index) !== -1;
        slide.setAttribute("aria-hidden", isVisible ? "false" : "true");
        if (!isVisible) pauseMedia(slide);
      });

      physicalSlides.forEach(function (slide) {
        if (slide.hasAttribute("data-bmc-carousel-clone")) {
          slide.setAttribute("aria-hidden", "true");
        }
      });
    }

    function normalizeLoopPosition() {
      if (!loop || !canMove()) return;

      var count = originalSlides.length;
      if (currentPhysical < count) {
        jumpToPhysical(currentPhysical + count);
      } else if (currentPhysical >= count * 2) {
        jumpToPhysical(currentPhysical - count);
      }
    }

    function goToPhysical(index, focusSlide) {
      if (!physicalSlides[index]) return;

      currentPhysical = index;
      viewport.scrollTo({
        left: physicalSlides[index].offsetLeft,
        behavior: reducedMotion.matches ? "auto" : "smooth"
      });

      updateControls();

      if (focusSlide) {
        var focusTarget = originalSlides[logicalIndex(index)];
        focusTarget.setAttribute("tabindex", "-1");
        focusTarget.focus({ preventScroll: true });
      }
    }

    function goBy(direction, focusSlide) {
      if (!canMove()) return;

      if (loop) {
        goToPhysical(currentPhysical + direction, focusSlide);
      } else {
        var step = visibleCount();
        var target = Math.max(
          0,
          Math.min(currentPhysical + direction * step, maxIndex())
        );
        goToPhysical(target, focusSlide);
      }
    }

    buildLoopClones();

    if (loop && physicalSlides.length !== originalSlides.length) {
      window.requestAnimationFrame(function () {
        jumpToPhysical(originalSlides.length);
        updateControls();
      });
    }

    if (previous) {
      previous.addEventListener("click", function () {
        goBy(-1, false);
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        goBy(1, false);
      });
    }

    viewport.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goBy(-1, true);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goBy(1, true);
      }

      if (event.key === "Home") {
        event.preventDefault();
        goToPhysical(loop ? originalSlides.length : 0, true);
      }

      if (event.key === "End") {
        event.preventDefault();
        goToPhysical(
          loop ? originalSlides.length * 2 - 1 : maxIndex(),
          true
        );
      }
    });

    viewport.addEventListener(
      "scroll",
      function () {
        if (isJumping) return;
        window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(function () {
          currentPhysical = closestPhysicalIndex();
          normalizeLoopPosition();
          updateControls();
        }, 100);
      },
      { passive: true }
    );

    if ("ResizeObserver" in window) {
      new ResizeObserver(function () {
        var currentLogical = logicalIndex(currentPhysical);
        window.requestAnimationFrame(function () {
          jumpToPhysical(
            loop
              ? originalSlides.length + currentLogical
              : Math.min(currentLogical, maxIndex())
          );
          updateControls();
        });
      }).observe(viewport);
    } else {
      window.addEventListener("resize", function () {
        var currentLogical = logicalIndex(currentPhysical);
        jumpToPhysical(
          loop
            ? originalSlides.length + currentLogical
            : Math.min(currentLogical, maxIndex())
        );
        updateControls();
      });
    }

    updateControls();
  }

  function initAll(scope) {
    (scope || document)
      .querySelectorAll("[data-bmc-carousel]")
      .forEach(initCarousel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initAll(document);
    });
  } else {
    initAll(document);
  }

  window.MooreKit = window.MooreKit || {};
  window.MooreKit.initCarousels = initAll;
})();
