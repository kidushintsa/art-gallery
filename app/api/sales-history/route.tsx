// /app/api/sales-history/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email;

  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        user: {
          email,
        },
        payoutStatus: {
          in: ["PAID", "UNPAID"],
        },
      },
      include: {
        artwork: {
          include: {
            user: true, // artist info
          },
        },
        order: {
          include: {
            user: true, // customer info
          },
        },
      },
      orderBy: {
        order: {
          createdAt: "desc",
        },
      },
    });

    return NextResponse.json(orderItems);
  } catch (error) {
    console.error("Failed to fetch sales history:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
