import type { CSSProperties, ReactNode } from "react";
import { C, mono, sans, serif } from "./theme";

export const Card = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      background: C.panel,
      border: `1px solid ${C.line}`,
      borderRadius: 22,
      boxShadow: "0 30px 80px rgba(0,0,0,.35)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Kicker = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      fontFamily: sans,
      fontSize: 24,
      letterSpacing: 4,
      textTransform: "uppercase",
      color: C.muted,
      fontWeight: 500,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Headline = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{ fontFamily: serif, fontSize: 76, fontWeight: 600, color: C.text, lineHeight: 1.15, ...style }}>
    {children}
  </div>
);

const CODE = [
  { t: "class DigestAuthWithCookies(HTTPDigestAuth):", c: C.blue },
  { t: "    def handle_401(self, r, **kwargs):", c: C.text },
  { t: "        self._persist_cookies(r)", c: C.text },
  { t: "        prep = r.request.copy()", c: C.text },
  { t: "        prep.prepare_cookies(self.jar)", c: C.amber },
  { t: "        return self._retry(prep, r)", c: C.text },
];

// Editor window with the patch; `visible` lines are typed in, `broken` strikes them out.
export const CodeWindow = ({
  visible = CODE.length,
  broken = 0,
  style,
}: {
  visible?: number;
  broken?: number;
  style?: CSSProperties;
}) => (
  <Card style={{ width: 860, overflow: "hidden", ...style }}>
    <div style={{ display: "flex", gap: 10, padding: "18px 22px", borderBottom: `1px solid ${C.line}` }}>
      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
        <div key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />
      ))}
      <div style={{ marginLeft: 16, fontFamily: mono, fontSize: 20, color: C.muted }}>digest_auth.py</div>
    </div>
    <div style={{ padding: "26px 30px", fontFamily: mono, fontSize: 25, lineHeight: 1.75 }}>
      {CODE.map((line, i) => {
        const shown = Math.max(0, Math.min(1, visible - i));
        const struck = Math.max(0, Math.min(1, broken - i));
        return (
          <div
            key={i}
            style={{
              whiteSpace: "pre",
              color: struck > 0 ? C.red : line.c,
              opacity: shown * (1 - 0.6 * struck),
              textDecoration: struck > 0.5 ? "line-through" : "none",
              transform: `translateX(${(1 - shown) * -12}px)`,
            }}
          >
            {line.t}
          </div>
        );
      })}
    </div>
  </Card>
);

export const Badge = ({ ok, children, style }: { ok: boolean; children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 26px",
      borderRadius: 14,
      fontFamily: mono,
      fontSize: 26,
      fontWeight: 500,
      color: ok ? "#0d1320" : "#fff",
      background: ok ? C.green : "#c5221f",
      ...style,
    }}
  >
    {ok ? "✓" : "✕"} {children}
  </div>
);

export const Bubble = ({
  who,
  children,
  tone,
  style,
}: {
  who: "user" | "agent";
  children: ReactNode;
  tone: string;
  style?: CSSProperties;
}) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 22, ...style }}>
    <div
      style={{
        width: 64,
        height: 64,
        flex: "0 0 64px",
        borderRadius: who === "user" ? 32 : 16,
        background: tone,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: sans,
        fontSize: 22,
        fontWeight: 700,
        color: "#0d1320",
      }}
    >
      {who === "user" ? "User" : "AI"}
    </div>
    <div
      style={{
        background: C.panel2,
        border: `1.5px solid ${tone}`,
        borderRadius: 22,
        borderTopLeftRadius: 6,
        padding: "22px 30px",
        fontFamily: serif,
        fontSize: 38,
        color: C.text,
        lineHeight: 1.3,
      }}
    >
      {children}
    </div>
  </div>
);
