// app/api/check-user/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const email = session.user.email;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // If user doesn't exist, create it (basic info from session)
      user = await prisma.user.create({
        data: {
          email,
          name: session.user.name ?? "",
          image: session.user.image ?? "",
        },
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
