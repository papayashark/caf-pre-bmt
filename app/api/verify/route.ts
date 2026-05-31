import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const existingToken = await prisma.verificationToken.findUnique({
      where: { token }
    });

    if (!existingToken) {
      return NextResponse.json({ message: "Invalid verification token." }, { status: 400 });
    }

    if (new Date() > existingToken.expires) {
      return NextResponse.json({ message: "Token has expired." }, { status: 400 });
    }

    // 1. Mark user as verified
    await prisma.user.update({
      where: { email: existingToken.email },
      data: { emailVerified: new Date() }
    });

    // 2. Delete the token so it can't be used again
    await prisma.verificationToken.delete({
      where: { id: existingToken.id }
    });

    return NextResponse.json({ message: "Email verified successfully!" }, { status: 200 });
  } catch (error) {
    console.error("VERIFICATION ERROR:", error);
    return NextResponse.json({ message: "Failed to verify email." }, { status: 500 });
  }
}