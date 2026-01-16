import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getToken } from "next-auth/jwt";
import Report from "@/models/Report";
import Prompt from "@/models/Prompt";
import User from "@/models/User";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const token = await getToken({ req });
    const { promptId, reason, comment } = await req.json();

    if (!promptId || !reason) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save report
    await Report.create({
      prompt: promptId,
      reportedBy: token?.sub || null,
      reason,
      comment,
    });

    // Increment report count
    const prompt = await Prompt.findById(promptId).populate("createdBy");
    if (!prompt) {
      return NextResponse.json({ message: "Prompt not found" }, { status: 404 });
    }

    prompt.reportCount += 1;

    // 🚨 AUTO-HIDE AFTER 3 REPORTS
    if (prompt.reportCount >= 3) {
      prompt.isHidden = true;
    }

    await prompt.save();

    // 🎯 STRIKE SYSTEM (next section)
    if (prompt.reportCount === 3) {
      const user = await User.findById(prompt.createdBy);
      if (user) {
        user.violations += 1;

        // 🚫 AUTO-SUSPEND AFTER 3 STRIKES
        if (user.violations >= 3) {
          user.isActive = false;
        }

        await user.save();
      }
    }

    return NextResponse.json({
      success: true,
      promptHidden: prompt.isHidden,
    });
  } catch (error) {
    console.error("REPORT ERROR:", error);
    return NextResponse.json(
      { message: "Failed to submit report" },
      { status: 500 }
    );
  }
}

