import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(token.sub).select("-password");

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  await connectDB();

  const updatedUser = await User.findByIdAndUpdate(
    token.sub,
    {
      profileImage: body.profileImage,
      dob: body.dob,
      mobile: body.mobile,
      termsAccepted: body.termsAccepted,
    },
    { new: true }
  ).select("-password");

  return NextResponse.json(updatedUser);
}
