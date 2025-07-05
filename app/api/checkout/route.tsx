// /app/api/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { total } = body;

    if (!total || total <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: {
        artwork: {
          select: {
            id: true,
            price: true,
            user: { select: { id: true } }, // artist
          },
        },
      },
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const txRef = "txn_" + crypto.randomUUID();

    // Create order with order items in one transaction
    const order = await prisma.orders.create({
      data: {
        userId: user.id,
        totalAmount: total,
        chapaTxRef: txRef,
        orderItems: {
          create: cartItems.map((item) => ({
            price: item.artwork.price,
            artistCut: item.artwork.price * 0.8, // 80%
            artworkId: item.artwork.id,
            artistId: item.artwork.user.id,
          })),
        },
      },
    });
    console.log("your order from checkout route", order);

    // Optional: Clear the user's cart after order is placed
    await prisma.cartItem.deleteMany({ where: { userId: user.id } });

    // Call Chapa API
    const chapaRes = await fetch(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total.toString(),
          currency: "ETB",
          email: user.email,
          first_name: user.name || "User",
          last_name: "Customer",
          tx_ref: txRef,
          // callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback`,
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/verify-payment/${txRef}`,
          customization: {
            title: "Art Gallery",
            description: "Thank you",
          },
        }),
      }
    );

    const chapaData = await chapaRes.json();

    if (chapaData.status !== "success") {
      console.error("❌ Chapa Error:", chapaData);
      return NextResponse.json(
        { error: "Chapa error", detail: chapaData },
        { status: 400 }
      );
    }

    return NextResponse.json({ checkoutUrl: chapaData.data.checkout_url });
  } catch (error) {
    console.error("❌ Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
