import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const txRef = body.tx_ref;
    if (!txRef) {
      return NextResponse.json({ error: "Missing tx_ref" }, { status: 400 });
    }

    // Verify payment with Chapa
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
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }

    const paymentStatus = chapaData.data.status;

    // Only process successful payments
    if (paymentStatus === "success") {
      // Mark order as paid in DB
      await prisma.order.updateMany({
        where: {
          chapaTxRef: txRef,
        },
        data: {
          paymentStatus: "PAID",
        },
      });

      console.log(`✅ Payment verified for tx_ref: ${txRef}`);
      return NextResponse.json(
        { message: "Payment verified and updated" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Payment was not successful" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
