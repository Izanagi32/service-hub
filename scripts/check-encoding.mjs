import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_DIRS = ["src", "scripts"];
const TARGET_FILES = [
  "package.json",
  "README.md",
  "tsconfig.json",
  "vite.config.ts",
  "eslint.config.js",
  ".env.example",
  ".editorconfig",
  ".gitattributes",
  ".gitignore",
];

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".css",
  ".html",
  ".yml",
  ".yaml",
  ".env",
  ".txt",
  ".ps1",
]);

const MOJIBAKE_TOKENS = ["РџР", "РќР", "Р“Р", "Р—Р", "СЃ", "С‚", "СЏ", "пїЅ"];

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  const out = [];
  const stack = [dir];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === "dist" || entry.name === ".vite") {
          continue;
        }
        stack.push(fullPath);
        continue;
      }

      const ext = path.extname(entry.name);
      const looksEnv = entry.name.startsWith(".env");
      if (TEXT_EXTENSIONS.has(ext) || looksEnv) {
        out.push(fullPath);
      }
    }
  }

  return out;
}

function relPath(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, "/");
}

const filesToCheck = new Set();

for (const dir of TARGET_DIRS) {
  for (const filePath of listFiles(path.join(ROOT, dir))) {
    filesToCheck.add(filePath);
  }
}

for (const file of TARGET_FILES) {
  const fullPath = path.join(ROOT, file);
  if (fs.existsSync(fullPath)) {
    filesToCheck.add(fullPath);
  }
}

const issues = [];

for (const filePath of filesToCheck) {
  const rel = relPath(filePath);
  const raw = fs.readFileSync(filePath);

  if (raw.length >= 3 && raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf) {
    issues.push(`${rel}: UTF-8 BOM detected`);
  }

  const content = raw.toString("utf8");

  if (content.includes("\uFFFD")) {
    issues.push(`${rel}: replacement char U+FFFD detected`);
  }

  if (rel !== "scripts/check-encoding.mjs") {
    for (const token of MOJIBAKE_TOKENS) {
      if (content.includes(token)) {
        issues.push(`${rel}: suspicious mojibake token '${token}' detected`);
        break;
      }
    }
  }
}

if (issues.length > 0) {
  console.error("Encoding check failed:\n");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`Encoding check passed (${filesToCheck.size} files scanned).`);