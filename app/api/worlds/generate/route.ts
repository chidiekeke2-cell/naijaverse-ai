import { NextResponse } from "next/server";
import { generateWorld } from "@/lib/ai/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const idea = typeof body.idea === "string" ? body.idea.trim() : "";
    if (!idea || idea.length > 2000) return NextResponse.json({ error: "Please provide a story idea under 2,000 characters." }, { status: 400 });
    const result = await generateWorld({ idea, setting: body.setting || "Future Africa", genre: body.genre || "Adventure", tone: body.tone || "Cinematic" });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Generation failed" }, { status: 500 });
  }
}
