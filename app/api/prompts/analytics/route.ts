import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";

export async function POST(req: NextRequest) {
  await connectDB();

  const { promptId, action } = await req.json();

  if (!promptId || !action) {
    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    );
  }

  const update: any = {};

  if (action === "view") update.$inc = { views: 1 };
  if (action === "like") update.$inc = { likes: 1 };
  if (action === "copy") update.$inc = { copies: 1 };

  await Prompt.findByIdAndUpdate(promptId, update);

  return NextResponse.json({ success: true });
}
