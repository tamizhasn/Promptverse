import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";

/* ============================
   ADMIN ANALYTICS
============================ */
export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || token.role !== "admin") {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  // 🔒 STRICT OWNERSHIP (string is enough)
  const prompts = await Prompt.find({
    createdBy: token.id,
  }).lean();

  const totals = prompts.reduce(
    (acc, p) => {
      acc.prompts += 1;
      acc.views += p.views ?? 0;
      acc.likes += p.likes ?? 0;
      acc.copies += p.copies ?? 0;
      return acc;
    },
    { prompts: 0, views: 0, likes: 0, copies: 0 }
  );

  return NextResponse.json({
    totals,
    prompts,
  });
}
