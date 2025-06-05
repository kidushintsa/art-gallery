import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const admins = await prisma.admin.findMany();
  return NextResponse.json(admins[0].name);
}
