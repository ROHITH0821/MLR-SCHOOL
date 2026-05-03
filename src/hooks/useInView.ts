"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Sets `inView` to true when the element enters the viewport (scroll into view).
 * Uses threshold 0 so the slightest intersection counts; light bottom rootMargin so it fires as the section comes in.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      {
        root: null,
        rootMargin: "0px 0px -5% 0px",
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
