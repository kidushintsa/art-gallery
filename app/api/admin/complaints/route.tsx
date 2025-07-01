import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client"; // adjust the path if needed

export async function GET() {
  try {
    const complaints = await prisma.complaint.findMany({
      where: {
        status: {
          not: "HANDLED",
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(complaints);
  } catch (error) {
    console.error("Error fetching pending complaints:", error);
    return NextResponse.json(
      { error: "Failed to fetch complaints" },
      { status: 500 }
    );
  }
}
