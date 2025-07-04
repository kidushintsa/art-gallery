// app/api/artist/payout/setup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { paymentMethod, accountNumber, accountHolderName } = body;

  if (!paymentMethod || !accountNumber || !accountHolderName) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        payoutMethod: paymentMethod,
        payoutAccount: accountNumber,
        AccountHolderName: accountHolderName,
      },
    });

    return NextResponse.json(
      { message: "Payout info saved", user: updatedUser },
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to update payout info:", err);
    return NextResponse.json(
      { error: "Failed to save payout info" },
      { status: 500 }
    );
  }
}
