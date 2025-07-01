import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { artworkId, action } = await req.json();

    if (!artworkId || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const updated = await prisma.artwork.update({
      where: { id: artworkId },
      data: {
        status: action === "approve" ? "APPROVED" : "REJECTED",
      },
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("Failed to update artwork status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
