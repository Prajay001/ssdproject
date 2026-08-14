import { NextResponse } from "next/server";
import { generateStartupAnalysis } from "@/lib/openai/client";
import { StartupIdeaInput } from "@/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, oneSentenceIdea, problem, targetAudience, country, stage, userApiKey } = body;

    if (!name || !oneSentenceIdea || !problem || !targetAudience) {
      return NextResponse.json(
        { error: "Missing required fields for startup analysis." },
        { status: 400 }
      );
    }

    const ideaInput: StartupIdeaInput = {
      name,
      oneSentenceIdea,
      problem,
      targetAudience,
      country: country || "United States",
      stage: stage || "Idea",
    };

    const report = await generateStartupAnalysis(ideaInput, userApiKey);

    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    console.error("API /api/analyze error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to perform AI analysis." },
      { status: 500 }
    );
  }
}
