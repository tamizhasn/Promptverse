import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";

/**
 * GET /api/prompts
 * Public → anyone can fetch prompts
 */
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const outputType = searchParams.get("outputType");
    const difficulty = searchParams.get("difficulty");

    const filter: any = {
      status: "published",
      isHidden: false, 
    };


    if (query) {
      filter.$text = { $search: query };
    }
    if (category) filter.category = category;
    if (outputType) filter.outputType = outputType;
    if (difficulty) filter.difficulty = difficulty;

    const prompts = await Prompt.find(filter)
      .populate("createdBy", "name profileImage")
      .sort({ createdAt: -1 })
      .limit(20);

    return NextResponse.json(prompts);
  } catch (error) {
    console.error("GET /api/prompts error:", error);
    return NextResponse.json(
      { message: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/prompts
 * Admin only → create new prompt
 * Enforces terms acceptance & active account
 */
export async function POST(req: NextRequest) {
  try {
    // 🔐 1. Get session token
    const token = await getToken({ req });

    // 🔒 2. Auth check
    if (!token || token.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔌 3. Connect DB
    await connectDB();

    // 🧑‍💼 4. Fetch admin user
    const user = await User.findById(token.sub);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // 🚫 5. Account status check
    if (!user.isActive) {
      return NextResponse.json(
        { message: "Account suspended due to policy violations" },
        { status: 403 }
      );
    }

    // 📜 6. Terms acceptance check
    if (!user.termsAccepted) {
      return NextResponse.json(
        {
          message:
            "You must accept the prompt usage terms before creating prompts",
        },
        { status: 403 }
      );
    }

    // 📦 7. Read request body
    const body = await req.json();

    // 🧾 8. Create prompt
    const prompt = await Prompt.create({
      ...body,
      createdBy: token.sub,

      // 🛡️ ensure moderation fields exist
      reportCount: 0,
      isHidden: false,
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
