import { readFile } from "node:fs/promises";
import path from "node:path";
import defaultContent from "./default-content.json";

const FILE = path.join(process.cwd(), "app", "admin", "data", "content.json");

/**
 * Reads the editable content from disk (kept out of git under app/admin) so
 * edits made in /admin show up immediately in dev. Falls back to the bundled
 * default when the file is unavailable — e.g. git-based deploy builds that
 * don't include the gitignored app/admin directory.
 */
export async function getContent() {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch {
    return defaultContent;
  }
}
