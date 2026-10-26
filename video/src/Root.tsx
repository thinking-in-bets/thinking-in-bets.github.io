import { Composition } from "remotion";
import { TibIntro } from "./Video";
import { FPS, TOTAL_FRAMES } from "./schedule.js";

export const Root = () => (
  <Composition id="TibIntro" component={TibIntro} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1920} height={1080} />
);
