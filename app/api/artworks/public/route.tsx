// app/api/artworks/public/route.ts
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "unauthorized user" }, { status: 400 });
  }
  try {
    const artworks = await prisma.artwork.findMany({
      where: {
        status: "APPROVED",
        purchased: false,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(artworks);
  } catch (error) {
    console.error("Failed to fetch public artworks:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
