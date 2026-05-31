import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

// 1. NAČTENÍ PROGRESU PŘI STARTU APLIKACE
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({}, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Převedeme text z databáze zpět na objekt pro frontend
    const progress = user?.progressData ? JSON.parse(user.progressData) : {};
    
    return NextResponse.json(progress, { status: 200 });
  } catch (error) {
    console.error("GET PROGRESS ERROR:", error);
    return NextResponse.json({}, { status: 500 });
  }
}

// 2. ULOŽENÍ PROGRESU PŘI KLIKNUTÍ NA CHECKBOX
export async function POST(req: Request) {
  try {
    const { email, progressData } = await req.json();

    if (!email || !progressData) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    // Uložíme nový stav jako text do databáze k danému uživateli
    await prisma.user.update({
      where: { email },
      data: { progressData: JSON.stringify(progressData) }
    });

    return NextResponse.json({ message: "Progress saved successfully!" }, { status: 200 });
  } catch (error) {
    console.error("SAVE PROGRESS ERROR:", error);
    return NextResponse.json({ message: "Failed to save progress" }, { status: 500 });
  }
}