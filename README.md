# Thinking-in-Bets project page

Project page for *Thinking-in-Bets at Test Time Reduces Sycophantic Revisions in LLM Agents*.

Static site served by GitHub Pages from `main`. Figures in `static/images/` are rendered from the paper PDFs with `pdftoppm -png -r 220`.

## Intro video

Silent, subtitled video made with Remotion; source is in `video/`. Subtitle text lives in `video/narration.json`, and each scene lasts as long as its text takes to read.

```bash
cd video && npm install
npm run build      # render MP4 + poster into static/video/
npm run studio     # live preview / timeline editor
```

## Result charts

The charts under "Key findings" are drawn by `static/js/charts.js`. Every number is copied from the paper's result tables; edit the `CHARTS` object there to update them.
