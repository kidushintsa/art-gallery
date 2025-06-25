// /app/api/cart/add/route.ts (or /pages/api/cart/add.ts if you're using Pages Router)

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { artworkId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Check if already added
  const exists = await prisma.cartItem.findFirst({
    where: {
      userId: user.id,
      artworkId,
    },
  });

  if (!exists) {
    await prisma.cartItem.create({
      data: {
        userId: user.id,
        artworkId,
      },
    });
  }

  return NextResponse.json({ success: true });
}
