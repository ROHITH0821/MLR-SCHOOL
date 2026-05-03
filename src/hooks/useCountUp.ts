"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(
  end: number,
  durationMs: number,
  enabled: boolean,
  decimals = 0
) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    startTime.current = null;

    const tick = (now: number) => {
      if (startTime.current === null) startTime.current = now;
      const t = Math.min(1, (now - startTime.current) / durationMs);
      const eased = 1 - (1 - t) ** 3;
      setValue(end * eased);
      if (t < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [end, durationMs, enabled]);

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  return formatted;
}
