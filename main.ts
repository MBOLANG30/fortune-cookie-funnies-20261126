// Fortune Cookie Funnies for Engineers — make.fun bounty entry ($2).
//
// Writes a single fortune cookie message for a software engineer to
// entry.txt inside the output directory. The grader reads that file and
// the house judge compares it two at a time against other entries.
//
// The output directory comes from MAKEFUN_OUTPUT_DIR when it is set,
// otherwise /output. Only the file is written; the directory itself
// is created if missing and never removed.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning line: a fortune-cookie warning in classic "Beware ..."
// voice, with the punchline — the deploy itself is lying — landing
// on the last word. 66 characters, one line, no trailing newline.
const LINE =
  "Beware the deploy that works on the first try. It is lying to you.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const line = LINE.trim();
if (line.length < 1 || line.length > 120) {
  throw new Error(`entry line must be 1-120 characters, got ${line.length}`);
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry line must be a single line");
}

writeFileSync(join(outDir, "entry.txt"), line, "utf8");
console.error(
  `wrote entry.txt: ${line.length} chars, ${Buffer.byteLength(line, "utf8")} bytes`,
);
