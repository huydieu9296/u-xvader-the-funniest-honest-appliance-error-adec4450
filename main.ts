import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The Funniest Honest Appliance Error — a washing machine reports, flatly,
// the one fault every owner already suspects: it ate a sock.
const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");
// Gate: the entry must be one line of 1 to 200 characters. Fail loudly
// instead of writing an entry the scorer would refuse.
const line = text.replace(/\r?\n$/, "");
if (line.length < 1 || line.length > 200 || line.includes("\n")) {
  throw new Error(`entry must be a single line of 1-200 characters, got ${line.length}`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
