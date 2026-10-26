// Scene timing for the silent, subtitled intro video. Each scene lasts as
// long as its subtitle text takes to read, so text and animation stay in step.
import narration from "../narration.json" with { type: "json" };

export const FPS = 30;
export const LEAD = 0.6; // seconds before the first subtitle of a scene
export const TAIL = 1.2; // seconds held after the last subtitle
const MIN_SECONDS = 6;
const WORDS_PER_SECOND = 2.6;

// Spoken-style wording reads better as digits on screen.
const DISPLAY = [
  ["one hundred and fifty-three", "153"],
  ["twelve percent", "12%"],
  ["fifty-eight to eighty-nine percent", "58% to 89%"],
];
const display = (s) => DISPLAY.reduce((t, [a, b]) => t.replace(a, b), s);

// Very short sentences ("Redo it.", "A bet.") join the previous subtitle.
function sentences(text) {
  const out = [];
  for (const s of text.match(/[^.!?]+[.!?]+/g).map((x) => x.trim())) {
    if (out.length && s.length < 12) out[out.length - 1] += ` ${s}`;
    else out.push(s);
  }
  return out;
}

let from = 0;
export const scenes = narration.scenes.map(({ id, text, subtitles: show = true }) => {
  const read = text.split(/\s+/).length / WORDS_PER_SECOND;
  const frames = Math.ceil(Math.max(MIN_SECONDS, LEAD + read + TAIL) * FPS);

  // Subtitles share the reading time in proportion to their length.
  let at = 0;
  const lines = sentences(text).map((s) => {
    const start = LEAD + (at / text.length) * read;
    at += s.length + 1;
    const end = LEAD + (Math.min(at, text.length) / text.length) * read;
    return { text: display(s), from: Math.round(start * FPS), to: Math.round(end * FPS) };
  });
  lines.at(-1).to = frames - Math.round(0.4 * FPS);
  const subtitles = show ? lines : [];

  const scene = { id, text, read, from, frames, subtitles };
  from += frames;
  return scene;
});
export const TOTAL_FRAMES = from;

const byId = Object.fromEntries(scenes.map((s) => [s.id, s]));

// Frame (relative to the scene start) where `phrase` appears in the subtitles,
// estimated from its character position in the scene text.
export function cue(id, phrase, offset = 0) {
  const { text, read } = byId[id];
  const at = text.indexOf(phrase);
  if (at < 0) throw new Error(`cue: "${phrase}" not found in ${id}`);
  return Math.round((LEAD + (at / text.length) * read) * FPS) + offset;
}
