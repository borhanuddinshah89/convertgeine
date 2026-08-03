import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

export const runtime = "nodejs";

const execFileAsync = promisify(execFile);

export async function POST(request: Request) {
  return Response.json({
    success: true,
    message: "API is working!"
  });
}
