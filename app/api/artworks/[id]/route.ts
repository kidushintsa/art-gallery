// app/api/artworks/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = context.params;
  const body = await req.json();

  try {
    const updated = await prisma.artwork.update({
      where: { id },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating artwork:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = context.params;

  try {
    const deleted = await prisma.artwork.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete artwork" },
      { status: 500 }
    );
  }
}
