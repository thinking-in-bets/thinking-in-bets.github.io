import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fadeUp, progress } from "../anim";
import { Card, Kicker } from "../components";
import { cue } from "../schedule.js";
import { C, mono, sans, serif } from "../theme";

const Bar = ({ label, value, tone, grow, style }: { label: string; value: number; tone: string; grow: number; style?: object }) => (
  <div style={{ marginTop: 30, ...style }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: sans, fontSize: 26, color: C.text }}>
      <span>{label}</span>
      <span style={{ fontFamily: mono, color: tone }}>{Math.round(value * grow)}%</span>
    </div>
    <div style={{ height: 22, borderRadius: 11, background: C.panel2, marginTop: 12 }}>
      <div style={{ height: 22, borderRadius: 11, background: tone, width: `${value * grow}%` }} />
    </div>
  </div>
);

export const Results = () => {
  const f = useCurrentFrame();
  const fr = cue("results", "false reversals");
  const fall = cue("results", "fall from");
  const reports = cue("results", "Reviewed reports");
  const after = cue("results", "And writing");

  const t = progress(f, fall, 45);
  const rate = interpolate(t, [0, 1], [12.2, 0.02]);

  return (
    <AbsoluteFill style={{ padding: "0 120px", justifyContent: "center" }}>
      <Kicker style={fadeUp(f, 0)}>5 Gemini models · 8 benchmarks</Kicker>
      <div style={{ display: "flex", gap: 60, marginTop: 50 }}>
        <Card style={{ flex: 1, padding: "52px 56px", ...fadeUp(f, fr - 10, 40) }}>
          <div style={{ fontFamily: serif, fontSize: 44, fontWeight: 600, color: C.text, lineHeight: 1.2 }}>
            Correct code broken after a mistaken complaint
          </div>
          <div style={{ fontFamily: sans, fontSize: 24, color: C.muted, marginTop: 10 }}>
            patch review, share of passing requirements
          </div>
          <div
            style={{
              fontFamily: serif,
              fontSize: 180,
              fontWeight: 600,
              color: t > 0.98 ? C.blue : C.text,
              marginTop: 40,
              lineHeight: 1,
            }}
          >
            {rate < 1 ? rate.toFixed(2) : rate.toFixed(1)}%
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 30, fontFamily: sans, fontSize: 28 }}>
            <span style={{ color: C.standard }}>Standard 12.2%</span>
            <span style={{ color: C.blue, opacity: progress(f, fall + 40, 15) }}>Thinking-in-Bets 0.02%</span>
          </div>
        </Card>

        <Card style={{ flex: 1, padding: "52px 56px", ...fadeUp(f, reports - 10, 40) }}>
          <div style={{ fontFamily: serif, fontSize: 44, fontWeight: 600, color: C.text, lineHeight: 1.2 }}>
            Reports that pass after review
          </div>
          <div style={{ fontFamily: sans, fontSize: 24, color: C.muted, marginTop: 10 }}>
            Agents' Last Exam, under mistaken and valid pushback
          </div>
          <Bar label="Standard" value={58} tone={C.standard} grow={progress(f, reports, 35)} style={{ marginTop: 50 }} />
          <Bar label="Thinking-in-Bets" value={89} tone={C.blue} grow={progress(f, reports + 25, 35)} />
          <Bar
            label="Same checklist, written after the complaint"
            value={65}
            tone={C.purple}
            grow={progress(f, after, 35)}
            style={{ opacity: progress(f, after, 12) }}
          />
          <div
            style={{
              ...fadeUp(f, after + 40),
              fontFamily: sans,
              fontSize: 26,
              color: C.purple,
              marginTop: 26,
            }}
          >
            recovers less than a quarter of the gain
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};
