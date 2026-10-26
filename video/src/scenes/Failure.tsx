import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeOut, fadeUp, pop, progress } from "../anim";
import { Badge, Bubble, Card, CodeWindow, Headline, Kicker } from "../components";
import { cue } from "../schedule.js";
import { C, sans, serif } from "../theme";

const Dilemma = ({ title, result, tone, style }: { title: string; result: string; tone: string; style: object }) => (
  <Card style={{ width: 700, padding: "48px 54px", borderTop: `6px solid ${tone}`, ...style }}>
    <div style={{ fontFamily: serif, fontSize: 54, fontWeight: 600, color: C.text }}>{title}</div>
    <div style={{ fontFamily: sans, fontSize: 34, color: tone, marginTop: 16 }}>→ {result}</div>
  </Card>
);

export const Failure = () => {
  const f = useCurrentFrame();
  const rewrite = cue("failure", "They rewrite");
  const breaks = cue("failure", "three tests break");
  const sycophancy = cue("failure", "Language models");
  const firm = cue("failure", "But simply");

  const phaseA = fadeOut(f, sycophancy - 10);
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{ padding: "120px 140px", flexDirection: "row", alignItems: "center", gap: 90, opacity: phaseA }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
          <Kicker>A standard agent</Kicker>
          <CodeWindow broken={progress(f, rewrite, 40) * 6} />
          <div style={{ position: "relative", height: 64 }}>
            <Badge ok style={{ position: "absolute", opacity: 1 - progress(f, breaks, 8) }}>
              pytest 153/153 passed
            </Badge>
            <Badge
              ok={false}
              style={{ position: "absolute", transform: `scale(${pop(f, breaks)})`, transformOrigin: "left center" }}
            >
              150/153 · 3 tests fail
            </Badge>
          </div>
        </div>
        <Bubble who="agent" tone={C.standard} style={fadeUp(f, 6, 40)}>
          “You're right.
          <br />
          I'll rewrite it.”
        </Bubble>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 70 }}>
        <Headline style={{ ...fadeUp(f, sycophancy), textAlign: "center" }}>Two ways to fail</Headline>
        <div style={{ display: "flex", gap: 60 }}>
          <Dilemma title="Give in" result="breaks working code" tone={C.red} style={fadeUp(f, sycophancy + 12, 40)} />
          <Dilemma title="Stand firm" result="ignores real bugs" tone={C.amber} style={fadeUp(f, firm, 40)} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
