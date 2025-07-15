import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";

interface OrderUser {
  name: string | null;
  email: string | null;
}

interface ArtworkInfo {
  id: string;
  title: string;
  imageUrl: string;
}

interface OrderInfo {
  id: string;
  totalAmount: number;
  createdAt: Date;
  user: OrderUser;
}

interface OrderItemSummary {
  id: string;
  price: number;
  artistCut: number;
  payoutStatus: "UNPAID" | "PAID";
  artwork: ArtworkInfo;
  order: OrderInfo;
}

interface ArtistPayout {
  artistId: string;
  artistName: string | null;
  artistEmail: string | null;
  payoutMethod: string;
  payoutAccount: string;
  accountHolderName: string;
  unpaidItems: OrderItemSummary[];
  totalUnpaidAmount: number;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const unpaidItems = await prisma.orderItem.findMany({
      where: {
        artistGetPaid: "UNPAID",
      },
      include: {
        artwork: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            payoutMethod: true,
            payoutAccount: true,
            AccountHolderName: true,
            role: true,
          },
        },
      },
    });

    const payoutsByArtist: Record<string, ArtistPayout> = {};

    for (const item of unpaidItems) {
      const artist = item.user;
      if (artist.role !== "ARTIST") continue;

      const artistId = artist.id;

      if (!payoutsByArtist[artistId]) {
        payoutsByArtist[artistId] = {
          artistId,
          artistName: artist.name ?? "Unknown",
          artistEmail: artist.email ?? "Unknown",
          payoutMethod: artist.payoutMethod ?? "N/A",
          payoutAccount: artist.payoutAccount ?? "N/A",
          accountHolderName: artist.AccountHolderName ?? "N/A",
          unpaidItems: [],
          totalUnpaidAmount: 0,
        };
      }

      payoutsByArtist[artistId].unpaidItems.push({
        id: item.id,
        price: item.price,
        artistCut: item.artistCut,
        payoutStatus: item.artistGetPaid,
        artwork: item.artwork,
        order: {
          id: item.order.id,
          totalAmount: item.order.totalAmount,
          createdAt: item.order.createdAt,
          user: item.order.user,
        },
      });

      payoutsByArtist[artistId].totalUnpaidAmount += item.artistCut;
    }

    const payoutArray = Object.values(payoutsByArtist);

    return NextResponse.json(payoutArray);
  } catch (error) {
    console.error("Error fetching artist payouts:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
