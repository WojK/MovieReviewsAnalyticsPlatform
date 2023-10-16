import { NextRequest, NextResponse } from "next/server";
import { homedir } from "os";
import fs from "fs";

export async function GET(request: NextRequest, response: Response) {
  const id = request.nextUrl.searchParams.get("id");

  const imagePath = `${homedir()}\\WordCloud\\${id}.png`;

  if (id !== null) {
    try {
      const image = fs.readFileSync(imagePath);
      return new Response(image, { headers: { "content-type": "image/png" } });
    } catch {
      return new Response("Not found", { status: 405 });
    }
  }

  return new Response("Id missing", { status: 400 });
}
