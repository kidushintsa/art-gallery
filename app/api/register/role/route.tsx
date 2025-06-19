import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = await req.json();

    // Optional: Validate the role input
    const allowedRoles = ["CUSTOMER", "ARTIST", "ADMIN"];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Update the user's role
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        role: role,
      },
    });

    return NextResponse.json({ message: "Role updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating role:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
