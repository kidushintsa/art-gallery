import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const txRef = body.tx_ref;

    if (!txRef) {
      return NextResponse.json({ error: "Missing tx_ref" }, { status: 400 });
    }

    console.log("🔁 Verifying Chapa payment for:", txRef);

    // Step 1: Verify with Chapa
    const chapaRes = await fetch(
      `https://api.chapa.co/v1/transaction/verify/${txRef}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          Accept: "application/json",
        },
      }
    );

    const chapaData = await chapaRes.json();

    if (chapaData.status !== "success") {
      console.error("❌ Chapa verification failed:", chapaData);
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }

    const paymentStatus = chapaData.data.status;

    if (paymentStatus === "success") {
      // Step 2: Update order payment status
      const updatedOrder = await prisma.orders.update({
        where: { chapaTxRef: txRef },
        data: {
          paymentStatus: "PAID",
          paymentMethod: "Chapa",
        },
        include: {
          orderItems: {
            select: {
              artworkId: true,
            },
          },
        },
      });

      const artworkIds = updatedOrder.orderItems.map((item) => item.artworkId);

      // Step 3: Mark each related artwork as purchased
      if (artworkIds.length > 0) {
        await prisma.artwork.updateMany({
          where: {
            id: { in: artworkIds },
          },
          data: {
            purchased: true,
          },
        });

        console.log("🖼️ Artworks updated as purchased:", artworkIds);
      }

      return NextResponse.json(
        { message: "✅ Payment verified. Order and artworks updated." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Payment was not successful" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("❌ Server error in callback:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
