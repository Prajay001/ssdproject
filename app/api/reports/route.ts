import { NextResponse } from "next/server";
import { getSavedReports, saveReport } from "@/lib/supabase/client";

export async function GET() {
  try {
    const reports = getSavedReports();
    return NextResponse.json({ reports });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.report) {
      return NextResponse.json({ error: "Missing report payload" }, { status: 400 });
    }
    saveReport(body.report);
    return NextResponse.json({ success: true, report: body.report });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
