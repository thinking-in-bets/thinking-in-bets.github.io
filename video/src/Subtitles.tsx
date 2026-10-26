import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { scenes } from "./schedule.js";
import { C, sans } from "./theme";

const FADE = 6;

// Burned-in subtitles for the current scene, one sentence at a time.
export const Subtitles = ({ id }: { id: string }) => {
  const f = useCurrentFrame();
  const line = scenes.find((s) => s.id === id)!.subtitles.find((s) => f >= s.from && f < s.to);
  if (!line) return null;
  const opacity = interpolate(f, [line.from, line.from + FADE, line.to - FADE, line.to], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 64 }}>
      <div
        style={{
          opacity,
          maxWidth: 1500,
          padding: "14px 30px",
          borderRadius: 14,
          background: "rgba(8, 12, 20, 0.72)",
          border: `1px solid ${C.line}`,
          fontFamily: sans,
          fontSize: 36,
          fontWeight: 500,
          lineHeight: 1.4,
          color: C.text,
          textAlign: "center",
        }}
      >
        {line.text}
      </div>
    </AbsoluteFill>
  );
};
