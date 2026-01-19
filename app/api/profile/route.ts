import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

/**
 * GET /api/profile
 * Get current user profile
 */
export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.sub) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const user = await User.findById(token.sub).select("-password");

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

/**
 * PUT /api/profile
 * Update profile + accept terms
 */
export async function PUT(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.sub) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  await connectDB();

  const updateData: any = {
    profileImage: body.profileImage,
    dob: body.dob,
    mobile: body.mobile,
  };

  // 🔑 When terms are accepted → profile is completed
  if (body.termsAccepted === true) {
    updateData.termsAccepted = true;
    updateData.profileCompleted = true;
  }

  const updatedUser = await User.findByIdAndUpdate(
    token.sub,
    updateData,
    { new: true }
  ).select("-password");

  return NextResponse.json(updatedUser);
}
