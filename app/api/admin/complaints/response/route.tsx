import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { complaintId, response } = body;

    if (!complaintId || !response) {
      return NextResponse.json(
        { error: "Missing complaintId or response" },
        { status: 400 }
      );
    }

    const updated = await prisma.complaint.update({
      where: { id: complaintId },
      data: {
        response,
        status: "HANDLED", // optional if you're using enum
      },
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("Error responding to complaint:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
