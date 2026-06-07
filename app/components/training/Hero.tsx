"use client"; // Zásadní: říkáme Next.js, že tohle je interaktivní klientská komponenta

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Plan1 from "@/app/components/training/plan/Plan1";
import Plan2 from "@/app/components/training/plan/Plan2";

// 1. Definujeme si, jak vypadá náš "Plán" (TypeScript)
type Plan = {
    id: number;
    name: string;
    description: string;
    duration: string;
};

// 2. Naše "hardcoded" data
const trainingPlans: Plan[] = [
    {
        id: 1,
        name: "Plan 1: Foundation",
        description: "The foundational phase. Build your baseline cardio and muscular endurance.",
        duration: "12 Weeks"
    },
    {
        id: 2,
        name: "Plan 2: Advanced",
        description: "The advanced phase. Ramp up for CAF BMT standards.",
        duration: "6 Weeks"
    }
];

export default function Hero() {
    // 3. Tady je naše "krabička" na vybraný plán. Na začátku je prázdná (null).
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    return (
        <div className="py-12 max-w-4xl mx-auto px-4">

            {/* VÝHYBKA: Máme něco v krabičce? */}
            {selectedPlan ? (

                // --- POHLED 1: DETAIL PLÁNU (zobrazí se po kliknutí) ---
                <div className="space-y-6">
                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={() => setSelectedPlan(null)} // Tlačítko vyprázdní krabičku -> návrat zpět
                    >
                        ← Back to the list of training plans
                    </Button>

                    <Card className="border-2 border-primary">
                        <CardHeader>
                            <CardTitle className="text-3xl">{selectedPlan.name}</CardTitle>
                            <CardDescription className="text-lg">{selectedPlan.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold text-muted-foreground">
                                Duration: {selectedPlan.duration}
                            </p>
                            <div className="mt-6 p-4 bg-muted rounded-md">
                                {/* <p>Tady pak můžeš vypsat konkrétní dny, cviky, nebo přidat tlačítko pro start tréninku.</p> */}
                                {selectedPlan.id === 1 && <Plan1 />}
                                {selectedPlan.id === 2 && <Plan2 />}
                            </div>
                        </CardContent>
                    </Card>
                </div>

            ) : (

                // --- POHLED 2: ÚVODNÍ KARTY (zobrazí se na začátku) ---
                <div className="space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight">CAF BMT Preparation</h1>
                        <p className="text-muted-foreground text-lg">Choose your training plan.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {trainingPlans.map((plan) => (
                            <Card key={plan.id} className="flex flex-col hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle>{plan.name}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm font-medium">⏳ {plan.duration}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full cursor-pointer"
                                        onClick={() => setSelectedPlan(plan)} // Kliknutí vloží tento plán do krabičky
                                    >
                                        Show details
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

            )}

        </div>
    );
}