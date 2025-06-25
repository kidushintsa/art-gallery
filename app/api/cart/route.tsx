// /api/cart/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ cartItems: [] });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      cartItems: true,
    },
  });

  return NextResponse.json({ cartItems: user?.cartItems ?? [] });
}
