import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client"; // Update this import path as needed

export async function GET() {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            artwork: {
              select: {
                title: true,
                imageUrl: true,
              },
            },
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
