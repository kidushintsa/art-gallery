// app/api/user-role/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userInfo = await prisma.userInfo.findUnique({
    where: { userId: user.id },
    select: { role: true },
  });

  if (!userInfo) {
    return NextResponse.json({ error: "UserInfo not found" }, { status: 404 });
  }

  return NextResponse.json({ role: userInfo.role }, { status: 200 });
}
