"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Үсэг бүр доороос дээш эргэлдэн (flip-up) дараалан гарч ирэх анимэйшн.
 * Scroll-д орж ирэхэд асна, prefers-reduced-motion-г хүндэтгэнэ.
 */
export function ScrambleText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlay(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const chars = [...text];
  // Урт текстэд алхмыг багасгаж нийт хугацааг ~1.3s дотор барина.
  const step = Math.min(42, Math.max(10, Math.round(1300 / Math.max(chars.length, 1))));

  return (
    <span ref={ref} className={className} aria-label={text}>
      {chars.map((ch, i) =>
        ch === " " ? (
          " "
        ) : (
          <span
            key={i}
            className="roll-letter"
            data-play={play ? "true" : "false"}
            style={{ animationDelay: `${delay + i * step}ms` }}
          >
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
