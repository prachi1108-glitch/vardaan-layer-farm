"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric stat from 0 to its value when scrolled into view,
 * preserving any prefix/suffix (e.g. "50,000+" counts up and keeps the "+").
 * Non-numeric values render as-is. Honours prefers-reduced-motion.
 */
function parse(value: string) {
  const m = value.match(/[\d,]+(?:\.\d+)?/);
  if (!m) return null;
  const raw = m[0];
  const numStr = raw.replace(/,/g, "");
  const num = Number.parseFloat(numStr);
  if (!Number.isFinite(num)) return null;
  const idx = value.indexOf(raw);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return {
    num,
    decimals,
    prefix: value.slice(0, idx),
    suffix: value.slice(idx + raw.length),
  };
}

const fmt = (n: number, decimals: number) =>
  n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(
    parsed ? `${parsed.prefix}${fmt(0, parsed.decimals)}${parsed.suffix}` : value
  );

  useEffect(() => {
    if (!parsed) return;
    const final = `${parsed.prefix}${fmt(parsed.num, parsed.decimals)}${parsed.suffix}`;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (reduce || !("IntersectionObserver" in window) || !el) {
      setOut(final);
      return;
    }

    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          io.disconnect();
          const dur = 1400;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setOut(
              `${parsed.prefix}${fmt(parsed.num * eased, parsed.decimals)}${parsed.suffix}`
            );
            if (p < 1) raf = requestAnimationFrame(tick);
            else setOut(final);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}
