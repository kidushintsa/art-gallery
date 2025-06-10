import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json(); // ✅ await

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isPasswordCorrect = await bcrypt.compare(
    body.password,
    user.passwordHash
  );
  if (!isPasswordCorrect) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 400 });
  }

  return NextResponse.json({ message: "Logged in" }, { status: 200 });
}
