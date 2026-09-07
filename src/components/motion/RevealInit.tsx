"use client";

import { useEffect } from "react";

/**
 * Wires up scroll reveals site-wide: any element with the class `reveal`
 * (or `egg-wobble`) gets `is-visible` added when it scrolls into view, which
 * the CSS animates. Mounted once in the frontend layout.
 *
 * - Honours prefers-reduced-motion: reveals everything immediately, no motion.
 * - A MutationObserver re-observes elements added on client-side navigation.
 */
export function RevealInit() {
  useEffect(() => {
    const SELECTOR = ".reveal:not(.is-visible), .egg-wobble:not(.is-visible)";
    const reveal = (el: Element) => el.classList.add("is-visible");

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal, .egg-wobble").forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const observeAll = () =>
      document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));

    observeAll();

    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
