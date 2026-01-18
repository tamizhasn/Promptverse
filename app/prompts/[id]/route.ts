import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";
import { getToken } from "next-auth/jwt";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const token = await getToken({ req });
    if (!token || token.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();

    const updated = await Prompt.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /prompts/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update prompt" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const token = await getToken({ req });
    if (!token || token.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    await Prompt.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /prompts/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to delete prompt" },
      { status: 500 }
    );
  }
}
