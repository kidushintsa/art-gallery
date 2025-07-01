import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client"; // adjust if needed

export async function GET() {
  try {
    // Get users along with the earliest createdAt from their artworks
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        artworks: {
          select: { createdAt: true },
          orderBy: { createdAt: "asc" },
          take: 1,
        },
      },
    });

    // Map the result to inject createdAt from artwork (or fallback to null)
    const usersWithArtworkDate = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.artworks[0]?.createdAt || null,
    }));

    return NextResponse.json(usersWithArtworkDate);
  } catch (error) {
    console.error("Error fetching users with artwork dates:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
