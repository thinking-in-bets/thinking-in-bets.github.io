import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import type { ComponentType } from "react";
import { scenes } from "./schedule.js";
import { C, sans } from "./theme";
import { Subtitles } from "./Subtitles";
import { Hook } from "./scenes/Hook";
import { Failure } from "./scenes/Failure";
import { Insight } from "./scenes/Insight";
import { Method } from "./scenes/Method";
import { Results } from "./scenes/Results";
import { Close } from "./scenes/Close";

const VIEWS: Record<string, ComponentType> = {
  hook: Hook,
  failure: Failure,
  insight: Insight,
  method: Method,
  results: Results,
  close: Close,
};

const FADE = 14;

// Each scene dips gently through the shared background at its edges.
const SceneShell = ({ frames, children }: { frames: number; children: React.ReactNode }) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, FADE, frames - FADE, frames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const Background = () => {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 240) * 60;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(1200px 800px at ${30 + drift / 20}% 20%, #1a2742 0%, ${C.bg} 60%)`,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${C.line} 1.2px, transparent 1.2px)`,
          backgroundSize: "44px 44px",
          opacity: 0.35,
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
    </AbsoluteFill>
  );
};

export const TibIntro = () => (
  <AbsoluteFill style={{ fontFamily: sans, color: C.text }}>
    <Background />
    {scenes.map(({ id, from, frames }) => {
      const View = VIEWS[id];
      return (
        <Sequence key={id} from={from} durationInFrames={frames} name={id}>
          <SceneShell frames={frames}>
            <View />
          </SceneShell>
          <Subtitles id={id} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
