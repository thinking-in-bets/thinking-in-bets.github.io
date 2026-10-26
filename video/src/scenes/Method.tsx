import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeUp, pop, progress } from "../anim";
import { Card, Kicker } from "../components";
import { cue } from "../schedule.js";
import { C, mono, sans, serif } from "../theme";

// Illustrative entries, as in the paper's Figure 1.
const ROWS = [
  { claim: "cookies persist", evidence: "cookie tests pass", p: 0.98 },
  { claim: "153/153 tests pass", evidence: "pytest run", p: 0.96 },
  { claim: "empty realm header", evidence: "not yet tested", p: 0.4 },
];

const Cell = ({ title, body, tone, on, dim }: { title: string; body: string; tone: string; on: number; dim: number }) => (
  <div
    style={{
      borderRadius: 18,
      border: `2.5px solid ${tone}`,
      background: `${tone}${on > 0.5 ? "33" : "14"}`,
      padding: "26px 24px",
      textAlign: "center",
      opacity: 1 - 0.55 * dim,
      transform: `scale(${1 + 0.06 * on})`,
      boxShadow: on > 0.5 ? `0 0 50px ${tone}55` : "none",
    }}
  >
    <div style={{ fontFamily: serif, fontSize: 40, fontWeight: 600, color: tone }}>{title}</div>
    <div style={{ fontFamily: sans, fontSize: 23, color: C.text, marginTop: 8, lineHeight: 1.35 }}>{body}</div>
  </div>
);

export const Method = () => {
  const f = useCurrentFrame();
  const book = cue("method", "Before reading");
  const claim = cue("method", "each claim");
  const evidence = cue("method", "the evidence");
  const conf = cue("method", "and a confidence");
  const bet = cue("method", "A bet.");
  const reply = cue("method", "When the reply");
  const keep = cue("method", "a strong bet and a vague");
  const fix = cue("method", "A specific bug report");

  const onKeep = progress(f, keep, 12) * (1 - progress(f, fix, 12));
  const onFix = progress(f, fix, 12);
  const highlighting = progress(f, keep, 12);

  return (
    <AbsoluteFill style={{ padding: "0 110px", justifyContent: "center" }}>
      <div style={{ ...fadeUp(f, 0), fontFamily: serif, fontSize: 64, fontWeight: 600, color: C.text }}>
        Thinking-in-Bets
      </div>
      <div style={{ display: "flex", gap: 70, marginTop: 56, alignItems: "flex-start" }}>
        <Card style={{ width: 900, padding: "36px 40px", position: "relative", ...fadeUp(f, book, 40) }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
            <div style={{ fontFamily: serif, fontSize: 42, fontWeight: 600, color: C.text }}>Claim Checklist</div>
            <div style={{ fontFamily: sans, fontSize: 22, color: C.muted, fontStyle: "italic" }}>
              written before reading the reply
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.25fr 1fr 0.9fr",
              gap: "0 24px",
              marginTop: 30,
              fontFamily: sans,
              fontSize: 20,
              color: C.muted,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            <div style={fadeUp(f, claim, 10)}>Claim</div>
            <div style={fadeUp(f, evidence, 10)}>Evidence</div>
            <div style={fadeUp(f, conf, 10)}>Bet</div>
          </div>
          {ROWS.map((r, i) => {
            const tone = r.p >= 0.5 ? C.blue : C.amber;
            return (
              <div
                key={r.claim}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.25fr 1fr 0.9fr",
                  gap: "0 24px",
                  alignItems: "center",
                  padding: "20px 0",
                  borderTop: `1px solid ${C.line}`,
                  marginTop: i === 0 ? 14 : 0,
                }}
              >
                <div style={{ ...fadeUp(f, claim + i * 6, 12), fontFamily: mono, fontSize: 25, color: C.text }}>
                  {r.claim}
                </div>
                <div style={{ ...fadeUp(f, evidence + i * 6, 12), fontFamily: sans, fontSize: 25, color: C.muted }}>
                  {r.evidence}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: progress(f, conf, 10) }}>
                  <div style={{ flex: 1, height: 12, borderRadius: 6, background: C.panel2 }}>
                    <div
                      style={{
                        height: 12,
                        borderRadius: 6,
                        background: tone,
                        width: `${100 * r.p * progress(f, conf + i * 6, 30)}%`,
                      }}
                    />
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 26, color: tone, width: 70 }}>{r.p.toFixed(2)}</div>
                </div>
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              right: -26,
              top: -26,
              transform: `scale(${pop(f, bet)}) rotate(-6deg)`,
              padding: "12px 22px",
              borderRadius: 12,
              background: C.blue,
              color: "#0d1320",
              fontFamily: sans,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            🔒 SEALED
          </div>
        </Card>

        <div style={{ flex: 1, ...fadeUp(f, reply, 40) }}>
          <Kicker style={{ marginBottom: 22 }}>When the reply arrives</Kicker>
          <div style={{ display: "grid", gridTemplateColumns: "150px 1fr 1fr", gap: 18, alignItems: "center" }}>
            <div />
            <div style={{ fontFamily: sans, fontSize: 24, color: C.muted, textAlign: "center" }}>vague reply</div>
            <div style={{ fontFamily: sans, fontSize: 24, color: C.muted, textAlign: "center" }}>specific reply</div>
            <div style={{ fontFamily: sans, fontSize: 26, color: C.text, fontWeight: 600 }}>strong bet</div>
            <Cell title="Keep" body="ask which case fails" tone={C.green} on={onKeep} dim={highlighting * (1 - onKeep)} />
            <Cell title="Re-check" body="fix only if it fails" tone={C.blue} on={0} dim={highlighting} />
            <div style={{ fontFamily: sans, fontSize: 26, color: C.text, fontWeight: 600 }}>weak bet</div>
            <Cell title="Ask" body="one targeted question" tone={C.amber} on={0} dim={highlighting} />
            <Cell title="Fix" body="that claim only" tone={C.red} on={onFix} dim={highlighting * (1 - onFix)} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
