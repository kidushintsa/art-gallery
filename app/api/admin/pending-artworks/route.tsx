// app/api/admin/pending-artworks/route.ts

import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const artworks = await prisma.artwork.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(artworks);
  } catch (error) {
    console.error("❌ Failed to fetch pending artworks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
