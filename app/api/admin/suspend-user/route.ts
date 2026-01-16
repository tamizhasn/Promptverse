import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getToken } from "next-auth/jwt";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token || token.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { userId, suspend } = await req.json();
  await connectDB();

  const user = await User.findByIdAndUpdate(
    userId,
    { isActive: !suspend },
    { new: true }
  );

  return NextResponse.json(user);
}
