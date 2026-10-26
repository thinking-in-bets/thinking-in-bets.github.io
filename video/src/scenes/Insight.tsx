import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fadeUp, pop, progress } from "../anim";
import { Headline } from "../components";
import { cue } from "../schedule.js";
import { C, sans, serifItalic } from "../theme";

const Node = ({ x, color, label, sub, style }: { x: number; color: string; label: string; sub: string; style: object }) => (
  <div style={{ position: "absolute", left: x - 160, top: -14, width: 320, textAlign: "center", ...style }}>
    <div style={{ width: 30, height: 30, borderRadius: 15, background: color, margin: "0 auto", boxShadow: `0 0 0 8px ${color}33` }} />
    <div style={{ fontFamily: sans, fontSize: 32, fontWeight: 600, color: C.text, marginTop: 26 }}>{label}</div>
    <div style={{ fontFamily: sans, fontSize: 24, color: C.muted, marginTop: 6 }}>{sub}</div>
  </div>
);

export const Insight = () => {
  const f = useCurrentFrame();
  const verdict = cue("insight", "Once you have heard");
  const remedy = cue("insight", "The remedy");
  const quote = cue("insight", "write down what");
  const draw = progress(f, verdict - 5, 40);
  const blur = interpolate(f, [verdict + 30, verdict + 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 40 }}>
      <Headline style={fadeUp(f, 0)}>
        The real problem is <span style={{ color: C.blue }}>timing</span>.
      </Headline>

      <div style={{ position: "relative", width: 1400, height: 200, marginTop: 130 }}>
        <div style={{ position: "absolute", top: 0, left: 0, height: 3, width: 1400 * draw, background: C.line }} />
        <Node x={140} color={C.blue} label="Your work" sub="tests, checks" style={fadeUp(f, verdict, 16)} />
        <Node
          x={1260}
          color={C.red}
          label="The verdict"
          sub="the user's reply"
          style={fadeUp(f, verdict + 20, 16)}
        />
        <div
          style={{
            position: "absolute",
            left: 260,
            right: 1120 - 960,
            top: 100,
            fontFamily: sans,
            fontSize: 24,
            color: C.red,
            textAlign: "center",
            opacity: blur * (1 - progress(f, remedy, 15)),
          }}
        >
          judged afterwards, earlier evidence looks weaker
        </div>
        <div
          style={{
            position: "absolute",
            left: 700 - 210,
            top: -48,
            width: 420,
            textAlign: "center",
            transform: `scale(${pop(f, remedy + 6)})`,
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "14px 26px",
              borderRadius: 14,
              background: C.green,
              color: "#0d1320",
              fontFamily: sans,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            ✎ Write it down here
          </div>
          <div style={{ width: 3, height: 36, background: C.green, margin: "0 auto" }} />
        </div>
      </div>

      <div
        style={{
          ...fadeUp(f, quote, 20, 30),
          fontFamily: serifItalic,
          fontStyle: "italic",
          fontSize: 50,
          color: C.text,
          textAlign: "center",
          maxWidth: 1300,
          lineHeight: 1.35,
          marginTop: 40,
        }}
      >
        “Write down what you believe, and how sure you are,
        <br />
        before the outcome arrives.”
      </div>
    </AbsoluteFill>
  );
};
