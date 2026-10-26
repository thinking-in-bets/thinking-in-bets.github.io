import { Easing, interpolate, spring } from "remotion";
import type { CSSProperties } from "react";
import { FPS } from "./schedule.js";

const ease = Easing.bezier(0.22, 1, 0.36, 1);

// 0 → 1 over `dur` frames starting at `start`, with a soft ease-out.
export const progress = (frame: number, start: number, dur = 20) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

export const fadeUp = (frame: number, start: number, dist = 24, dur = 22): CSSProperties => {
  const p = progress(frame, start, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)` };
};

export const fadeOut = (frame: number, start: number, dur = 14) => 1 - progress(frame, start, dur);

export const pop = (frame: number, start: number) =>
  spring({ frame: frame - start, fps: FPS, config: { damping: 14, stiffness: 140, mass: 0.7 } });
