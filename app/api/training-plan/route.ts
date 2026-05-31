import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET() {
  try {
    // Vytáhneme všechny dny z DB a seřadíme je
    const dbDays = await prisma.trainingDay.findMany({
      orderBy: [
        { weekNumber: 'asc' },
        { dayNumber: 'asc' }
      ]
    });

    // Přeformátujeme data do struktury, kterou očekává náš frontend (seskupíme dny do týdnů)
    const formattedPlan: any[] = [];

    dbDays.forEach((day) => {
      let week = formattedPlan.find(w => w.weekNumber === day.weekNumber);
      
      if (!week) {
        week = { weekNumber: day.weekNumber, days: [] };
        formattedPlan.push(week);
      }

      week.days.push({
        dayNumber: day.dayNumber,
        type: day.type,
        color: day.color,
        exercises: JSON.parse(day.exercises) // Převedeme text zpět na pole [cvik1, cvik2]
      });
    });

    return NextResponse.json(formattedPlan, { status: 200 });
  } catch (error) {
    console.error("GET TRAINING PLAN ERROR:", error);
    return NextResponse.json({ message: "Failed to fetch training plan" }, { status: 500 });
  }
}