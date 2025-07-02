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
    // Get the logged-in artist's sales
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        orders: {
          include: {
            orderItems: {
              where: {
                payoutStatus: {
                  in: ["PAID", "UNPAID"],
                },
                artwork: {
                  user: {
                    email,
                  },
                },
              },
              include: {
                artwork: true,
                order: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const salesHistory = user?.orders.flatMap(
      (order) =>
        order.orderItems.map((item) => ({
          id: item.id,
          artworkTitle: item.artwork.title,
          artworkId: item.artwork.id,
          dateSold: item.order.createdAt,
          salePrice: item.price,
          artistCut: item.artistCut,
          payoutStatus: item.payoutStatus,
          customerName: item.order.user.name,
          orderId: item.order.id,
        })) || []
    );

    return NextResponse.json(salesHistory);
  } catch (error) {
    console.error("Failed to fetch sales history:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
