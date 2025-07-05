import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
// import { PaymentStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { tx_ref } = await req.json();

    if (!tx_ref) {
      return NextResponse.json({ error: "Missing tx_ref" }, { status: 400 });
    }

    // 1. Find the order using the Chapa reference
    const order = await prisma.orders.findUnique({
      where: { chapaTxRef: tx_ref },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check if already paid to avoid duplicates
    if (order.paymentStatus === PaymentStatus.PAID) {
      return NextResponse.json({ success: true, message: "Already confirmed" });
    }

    // 2. Update purchased = true for related artworks
    const artworkIds = order.orderItems.map((item) => item.artworkId);

    await prisma.artwork.updateMany({
      where: {
        id: { in: artworkIds },
      },
      data: {
        purchased: true,
      },
    });

    // 3. Update the order status to paid
    await prisma.orders.update({
      where: { id: order.id },
      data: {
        paymentStatus: "PAID",
        paymentMethod: "Chapa",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Payment confirmation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
