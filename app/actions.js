"use server";
import { ticketSchema } from "../app/lib/types"
import prisma from "../app/lib/db";
import { revalidatePath } from "next/cache"

export const saveTicket = async (_, formData) => {
    const rawData = {
        teamOne: formData.get("teamOne"),
        teamTwo: formData.get("teamTwo"),
        expected: formData.get("expected"),
        outcome: formData.get("outcome")

    };

    const result = ticketSchema.safeParse(rawData);

    if (!result.success) {
        const firstError = result.error.issues[0];
        return {
            success: false,
            message: firstError.message,
            inputs: rawData
        }
    }


    try {
        await prisma.ticket.create({
            data: result.data
        });

        revalidatePath("/");

        return {
            success: true,
            message: "Ticket succesfully saved to database!",
            inputs: { teamOne: "", teamTwo: "", expected: "", outcome: "" }
        }
    } catch (error) {
        console.error("Database err", error)
        return {
            success: false,
            message: "Failed to save",
            inputs: rawData
        }
    }
}