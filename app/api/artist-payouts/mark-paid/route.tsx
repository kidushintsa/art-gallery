// app/api/artist-payouts/mark-paid/route.ts
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { orderItemIds } = await req.json();

    if (!Array.isArray(orderItemIds) || orderItemIds.length === 0) {
      return NextResponse.json(
        { error: "No orderItemIds provided" },
        { status: 400 }
      );
    }

    // Fetch order items
    const items = await prisma.orderItem.findMany({
      where: {
        id: { in: orderItemIds },
        artistGetPaid: "UNPAID",
      },
    });

    if (items.length === 0) {
      return NextResponse.json(
        { error: "No matching unpaid items" },
        { status: 400 }
      );
    }

    const artistId = items[0].artistId;
    const totalAmount = items.reduce((sum, item) => sum + item.artistCut, 0);

    // Update order items
    await prisma.orderItem.updateMany({
      where: {
        id: { in: orderItemIds },
        artistGetPaid: "UNPAID",
      },
      data: {
        artistGetPaid: "PAID",
        payoutDate: new Date(),
      },
    });

    // Create a Payout log (optional but useful)
    await prisma.payout.create({
      data: {
        amount: totalAmount,
        method: "Manual",
        reference: `Admin marked paid: ${new Date().toISOString()}`,
        artistId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking payout as paid:", error);
    return NextResponse.json(
      { error: "Failed to mark payout as paid" },
      { status: 500 }
    );
  }
}
