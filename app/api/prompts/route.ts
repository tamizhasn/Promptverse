import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";

/* ============================
   GET /api/prompts
   Public search + filters
============================ */
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q")?.trim();
    const category = searchParams.get("category")?.trim();
    const outputType = searchParams.get("outputType")?.trim();
    const difficulty = searchParams.get("difficulty")?.trim();

    const filter: any = {
      status: "published",
      isHidden: false,
    };

    /* 🔍 SEARCH (REGEX-BASED — SAFE & FLEXIBLE) */
    if (q) {
      const regex = new RegExp(q, "i");

      filter.$or = [
        { title: regex },
        { description: regex },
        { promptText: regex },
        { category: regex },
        { tags: { $in: [regex] } },
      ];
    }

    /* 🎯 FILTERS */
    if (category) filter.category = category;
    if (outputType) filter.outputType = outputType;
    if (difficulty) filter.difficulty = difficulty;

    const prompts = await Prompt.find(filter)
      .populate("createdBy", "name profileImage")
      .sort({ createdAt: -1 })
      .limit(30)
      .lean();

    return NextResponse.json(prompts);
  } catch (error) {
    console.error("GET /api/prompts error:", error);
    return NextResponse.json(
      { message: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}

/* ============================
   POST /api/prompts
   Admin only
============================ */
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findById(token.sub);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { message: "Account suspended" },
        { status: 403 }
      );
    }

    if (!user.termsAccepted) {
      return NextResponse.json(
        {
          message:
            "Accept terms & conditions before creating prompts",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    const prompt = await Prompt.create({
      ...body,
      createdBy: token.sub,
      reportCount: 0,
      isHidden: false,
      likes: 0,
      copies: 0,
      views: 0,
    });

    return NextResponse.json(prompt, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/prompts error:", error);
    return NextResponse.json(
      {
        message: "Failed to create prompt",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
