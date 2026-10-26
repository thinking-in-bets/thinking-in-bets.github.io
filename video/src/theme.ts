import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSerif } from "@remotion/google-fonts/SourceSerif4";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

export const sans = loadInter("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] }).fontFamily;
export const serif = loadSerif("normal", { weights: ["400", "600"], subsets: ["latin"] }).fontFamily;
export const serifItalic = loadSerif("italic", { weights: ["400"], subsets: ["latin"] }).fontFamily;
export const mono = loadMono("normal", { weights: ["400", "500"], subsets: ["latin"] }).fontFamily;

// Gray = Standard, blue = Thinking-in-Bets, matching the paper's figures.
export const C = {
  bg: "#0d1320",
  panel: "#151d2d",
  panel2: "#1b2537",
  line: "#2a3650",
  text: "#e9edf5",
  muted: "#8e99ae",
  standard: "#9aa3b2",
  blue: "#8ab4f8",
  green: "#81c995",
  red: "#f28b82",
  amber: "#fdd663",
  purple: "#c58af9",
};
