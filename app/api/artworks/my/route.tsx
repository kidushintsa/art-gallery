// app/api/artworks/my/route.ts
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const artworks = await prisma.artwork.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(artworks);
}
