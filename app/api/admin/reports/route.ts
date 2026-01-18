import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Report from "@/models/Report";
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

  // 🔑 Get admin's prompt IDs
  const prompts = await Prompt.find(
    { createdBy: adminId },
    { _id: 1 }
  );

  const promptIds = prompts.map((p) => p._id);

  // 🔒 Only reports for admin's prompts
  const reports = await Report.find({
    promptId: { $in: promptIds },
  })
    .populate("promptId", "title")
    .sort({ createdAt: -1 });

  return NextResponse.json({ reports });
}
