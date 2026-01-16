import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { getToken } from "next-auth/jwt";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req });
  if (!token || token.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();

  const prompt = await Prompt.findByIdAndUpdate(
    params.id,
    body,
    { new: true }
  );

  return NextResponse.json(prompt);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req });
  if (!token || token.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  await Prompt.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });
}
