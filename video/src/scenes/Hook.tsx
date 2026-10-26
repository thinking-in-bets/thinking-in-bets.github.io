import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fadeUp, pop, progress } from "../anim";
import { Badge, Bubble, CodeWindow, Kicker } from "../components";
import { cue } from "../schedule.js";
import { C } from "../theme";

export const Hook = () => {
  const f = useCurrentFrame();
  const typed = progress(f, 8, 45) * 6;
  const badge = cue("hook", "All one hundred");
  const reply = cue("hook", "Then the user");

  return (
    <AbsoluteFill style={{ padding: "120px 140px", flexDirection: "row", alignItems: "center", gap: 90 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
        <Kicker style={fadeUp(f, 0)}>Turn 1 · the agent's patch</Kicker>
        <CodeWindow visible={typed} style={fadeUp(f, 0, 40)} />
        <div style={{ transform: `scale(${pop(f, badge)})`, transformOrigin: "left center" }}>
          <Badge ok>pytest 153/153 passed</Badge>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 30, ...fadeUp(f, reply, 40) }}>
        <Kicker>Turn 2 · the user replies</Kicker>
        <Bubble who="user" tone={C.red}>
          “No, that's wrong.
          <br />
          Redo it.”
        </Bubble>
        <div style={{ ...fadeUp(f, reply + 45), color: C.muted, fontSize: 28, paddingLeft: 86, fontStyle: "italic" }}>
          No failing test. No new evidence.
        </div>
      </div>
    </AbsoluteFill>
  );
};
