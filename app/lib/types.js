import { z } from "zod";

export const ticketSchema = z.object({
    teamOne: z
        .string()
        .min(3, "Team one must be at least 3 ch")
        .max(10, "Team one must be max 10 ch"),

    teamTwo: z
        .string()
        .min(3, "Team 2 must be at least 3 ch")
        .max(10, "Team 2 must be max 10 ch"),

    expected: z
        .string()
        .min(3, "Expected must be at least 3 ch")
        .max(10, "Expectedmust be max 10 ch"),

    outcome: z
        .string()
        .min(3, "Outcome must be at least 3 ch")
        .max(10, "Outcome must be max 10 ch"),
})