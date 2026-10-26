import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeUp } from "../anim";
import { C, sans, serif, serifItalic } from "../theme";

export const Close = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ ...fadeUp(f, 0, 30, 30), fontFamily: serif, fontSize: 120, fontWeight: 600, color: C.text }}>
        Thinking-in-Bets
      </div>
      <div
        style={{
          ...fadeUp(f, 25, 20, 30),
          fontFamily: serifItalic,
          fontStyle: "italic",
          fontSize: 50,
          color: C.blue,
          marginTop: 20,
        }}
      >
        Place your bets before the feedback arrives.
      </div>
      <div style={{ ...fadeUp(f, 60), width: 120, height: 2, background: C.line, margin: "60px 0 44px" }} />
      <div style={{ ...fadeUp(f, 70), fontFamily: sans, fontSize: 32, color: C.text }}>Nghi D. Q. Bui · Google</div>
      <div style={{ ...fadeUp(f, 85), fontFamily: sans, fontSize: 28, color: C.muted, marginTop: 14 }}>
        thinking-in-bets.github.io
      </div>
    </AbsoluteFill>
  );
};
