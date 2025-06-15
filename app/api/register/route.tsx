import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma/client";

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["CUSTOMER", "ARTIST"]),
  artistProfile: z
    .object({
      payoutMethod: z.string().min(3),
      payoutAccount: z.string().min(5),
    })
    .optional(), // only required for ARTIST
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password, role, artistProfile } = body;
  const validation = userSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const userExist = await prisma.user.findUnique({ where: { email } });
  if (userExist)
    return NextResponse.json({ error: "user already exist" }, { status: 400 });
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      role,
      ...(role === "ARTIST" &&
        artistProfile && {
          artistProfile: {
            create: artistProfile,
          },
        }),
    },
  });

  return NextResponse.json(user, { status: 201 });
}
