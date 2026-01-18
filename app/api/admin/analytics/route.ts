import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const adminId = new mongoose.Types.ObjectId(session.user.id);

  // 🔒 STRICT OWNERSHIP FILTER
  const prompts = await Prompt.find({
    createdBy: adminId,
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
