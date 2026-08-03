import { execFile } from "node:child_process";
import {
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

export const runtime = "nodejs";

const run = promisify(execFile);

export async function POST(request: Request) {
  let workFolder = "";

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        { error: "Please choose a PDF file." },
        { status: 400 }
      );
    }

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      return Response.json(
        { error: "Only PDF files are allowed." },
        { status: 400 }
      );
    }

    if (file.size > 25 * 1024 * 1024) {
      return Response.json(
        { error: "Maximum file size is 25 MB." },
        { status: 400 }
      );
    }

    workFolder = await mkdtemp(
      path.join(tmpdir(), "convertgeine-jpg-")
    );

    const inputPath = path.join(workFolder, "input.pdf");
    const outputPattern = path.join(
      workFolder,
      "page-%03d.jpg"
    );

    await writeFile(
      inputPath,
      Buffer.from(await file.arrayBuffer())
    );

    await run("gs", [
      "-sDEVICE=jpeg",
      "-dJPEGQ=90",
      "-r150",
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      `-sOutputFile=${outputPattern}`,
      inputPath,
    ]);

    const imageNames = (await readdir(workFolder))
      .filter((name) => name.toLowerCase().endsWith(".jpg"))
      .sort();

    if (imageNames.length === 0) {
      return Response.json(
        { error: "No JPG images were created." },
        { status: 500 }
      );
    }

    if (imageNames.length === 1) {
      const image = await readFile(
        path.join(workFolder, imageNames[0])
      );

      return new Response(image, {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
          "Content-Disposition":
            'attachment; filename="page-001.jpg"',
        },
      });
    }

    const zipPath = path.join(workFolder, "pdf-images.zip");

    await run(
      "zip",
      ["-j", zipPath, ...imageNames],
      { cwd: workFolder }
    );

    const zipFile = await readFile(zipPath);

    return new Response(zipFile, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition":
          'attachment; filename="pdf-images.zip"',
      },
    });
  } catch (error) {
    console.error("PDF to JPG failed:", error);

    return Response.json(
      {
        error:
          "Conversion failed. Make sure Ghostscript and ZIP are installed.",
      },
      { status: 500 }
    );
  } finally {
    if (workFolder) {
      await rm(workFolder, {
        recursive: true,
        force: true,
      });
    }
  }
}
