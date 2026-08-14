import { NextResponse } from "next/server";
import { getUserProfile, updateUserProfile } from "@/lib/supabase/client";

export async function GET() {
  try {
    const user = getUserProfile();
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const updated = updateUserProfile(body);
    return NextResponse.json({ success: true, user: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
