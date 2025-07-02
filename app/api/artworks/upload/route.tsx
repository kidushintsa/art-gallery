import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";

// POST /api/artist/artworks
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const {
      title,
      price,
      category,
      description,
      imageUrl,
      status = "PENDING",
    } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newArtwork = await prisma.artwork.create({
      data: {
        title,
        price,
        category,
        description,
        imageUrl,
        status,
        artistId: user.id,
      },
    });

    return NextResponse.json(newArtwork, { status: 201 });
  } catch (error) {
    console.error("Error uploading artwork:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
