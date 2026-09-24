/**
 * docs/05 validation rule: "any TODO string appears anywhere in content/ or
 * the rendered site" fails the build. Run against raw content/ (pre-build)
 * and again against the exported out/ (postbuild) — see package.json.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const TEXT_EXTENSIONS = new Set([".yaml", ".yml", ".mdx", ".md", ".html", ".json"]);

function walk(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...walk(full));
    } else if (TEXT_EXTENSIONS.has(extname(full))) {
      files.push(full);
    }
  }
  return files;
}

const target = process.argv[2];
if (!target) {
  console.error("Usage: tsx scripts/check-no-todo.mts <directory>");
  process.exit(1);
}

const hits: Array<{ file: string; line: number; text: string }> = [];

try {
  const files = walk(target);
  for (const file of files) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (line.includes("TODO")) {
        hits.push({ file, line: i + 1, text: line.trim() });
      }
    });
  }
} catch (err) {
  if ((err as NodeJS.ErrnoException).code === "ENOENT") {
    console.log(`check-no-todo: ${target} does not exist yet, skipping.`);
    process.exit(0);
  }
  throw err;
}

if (hits.length > 0) {
  console.error(`check-no-todo: found the literal string "TODO" in ${target}:`);
  for (const hit of hits) {
    console.error(`  ${hit.file}:${hit.line}: ${hit.text}`);
  }
  console.error(
    "\nEvery TODO must be omitted from content and logged in docs/06-open-questions.md instead.",
  );
  process.exit(1);
}

console.log(`check-no-todo: clean (${target}).`);
