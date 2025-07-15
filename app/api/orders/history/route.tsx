import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const orders = await prisma.orders.findMany({
      where: {
        user: {
          email: session.user.email,
        },
        paymentStatus: "PAID",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: {
          include: {
            artwork: {
              include: {
                user: true, // artist info
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching order history:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
