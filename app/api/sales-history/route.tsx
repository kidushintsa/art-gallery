import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get current artist by email
    const artist = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    // Fetch order items where artist is the seller
    const orderItems = await prisma.orderItem.findMany({
      where: {
        artistId: artist.id,
      },
      include: {
        artwork: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                payoutMethod: true,
                payoutAccount: true,
                AccountHolderName: true,
              },
            },
          },
        },
        order: {
          select: {
            id: true,
            totalAmount: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Add payoutStatus manually (you can also add it to the schema later)
    const salesHistory = orderItems.map((item) => ({
      id: item.id,
      artistCut: item.artistCut,
      price: item.price,
      payoutStatus: item.payoutDate ? "PAID" : "UNPAID",
      artwork: item.artwork,
      order: item.order,
    }));

    return NextResponse.json(salesHistory);
  } catch (error) {
    console.error("Failed to fetch sales history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
