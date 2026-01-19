import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/mongodb";
import Prompt from "@/models/Prompt";

/* ============================
   TOGGLE HIDE / UNHIDE PROMPT
============================ */
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req });

  if (!token || token.role !== "admin") {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const body = await req.json();

  await connectDB();

  const prompt = await Prompt.findOneAndUpdate(
    {
      _id: id,
      createdBy: token.id, // 🔒 ownership
    },
    {
      isHidden: body.isHidden, // true = hide, false = unhide
    },
    { new: true }
  );

  if (!prompt) {
    return NextResponse.json(
      { message: "Prompt not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    isHidden: prompt.isHidden,
  });
}

/* ============================
   DELETE PROMPT (HARD)
============================ */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req });

  if (!token || token.role !== "admin") {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  await connectDB();

  const deleted = await Prompt.findOneAndDelete({
    _id: id,
    createdBy: token.id,
  });

  if (!deleted) {
    return NextResponse.json(
      { message: "Prompt not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
