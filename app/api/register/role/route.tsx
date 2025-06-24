// app/api/register/role/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = await req.json();

    const allowedRoles = ["CUSTOMER", "ARTIST", "ADMIN"];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Get the userId from email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create or update UserInfo
    const updatedUserInfo = await prisma.user.upsert({
      where: { id: user.id },
      update: { role },
      create: { id: user.id, role },
    });

    return NextResponse.json(
      {
        message: "Role updated",
        userInfo: updatedUserInfo,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating role:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
