import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Find all unpaid order items
    const unpaidItems = await prisma.orderItem.findMany({
      where: { artistGetPaid: "UNPAID" },
      include: {
        artwork: true,
        order: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });

    // Group by artist
    const groupedByArtist: Record<string, any> = {};

    for (const item of unpaidItems) {
      const artistId = item.artistId;
      if (!groupedByArtist[artistId]) {
        groupedByArtist[artistId] = {
          artistId,
          artistName: item.user.name || "Unknown",
          artistEmail: item.user.email || "",
          payoutMethod: item.user.payoutMethod || "N/A",
          payoutAccount: item.user.payoutAccount || "N/A",
          accountHolderName: item.user.AccountHolderName || "N/A",
          unpaidItems: [],
          totalUnpaidAmount: 0,
        };
      }

      groupedByArtist[artistId].unpaidItems.push({
        id: item.id,
        price: item.price,
        artistCut: item.artistCut,
        payoutStatus: item.artistGetPaid,
        artwork: {
          id: item.artwork.id,
          title: item.artwork.title,
          imageUrl: item.artwork.imageUrl,
        },
        order: {
          id: item.order.id,
          totalAmount: item.order.totalAmount,
          createdAt: item.order.createdAt,
          user: {
            name: item.order.user.name || "Unknown",
            email: item.order.user.email || "",
          },
        },
      });

      groupedByArtist[artistId].totalUnpaidAmount += item.artistCut;
    }

    return NextResponse.json(Object.values(groupedByArtist));
  } catch (error) {
    console.error("Error fetching payouts:", error);
    return NextResponse.json(
      { error: "Failed to fetch payouts" },
      { status: 500 }
    );
  }
}
