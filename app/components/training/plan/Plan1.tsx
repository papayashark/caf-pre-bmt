"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import MiniTimer from "../MiniTimer"; // Zkontroluj si správnou cestu k MiniTimeru

export default function Plan1() {
    const { data: session, status } = useSession();
    
    // --- STAVY PRO DATA Z DATABÁZE ---
    const [planData, setPlanData] = useState<any[]>([]); 
    const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadAllData = async () => {
            // Čekáme, dokud NextAuth nezjistí, jestli je uživatel přihlášen
            if (status === "loading") return;

            try {
                // 1. Nejdříve stáhneme samotný tréninkový plán z databáze
                const planRes = await fetch("/api/training-plan");
                if (planRes.ok) {
                    const planJson = await planRes.json();
                    setPlanData(planJson);
                }

                // 2. Pokud je uživatel přihlášený, stáhneme i jeho osobní progres
                if (status === "authenticated" && session?.user?.email) {
                    const progressRes = await fetch(`/api/progress?email=${session.user.email}`);
                    if (progressRes.ok) {
                        const progressJson = await progressRes.json();
                        setCompletedExercises(progressJson);
                    }
                }
            } catch (error) {
                console.error("Chyba při synchronizaci dat z databáze:", error);
            } finally {
                setIsLoaded(true);
            }
        };

        loadAllData();
    }, [session, status]);

    // Funkce pro odškrtnutí cviku a uložení do databáze
    const toggleExercise = async (exerciseId: string, isChecked: boolean) => {
        // Okamžitá změna v UI, aby to bylo bleskové
        const newProgress = { ...completedExercises, [exerciseId]: isChecked };
        setCompletedExercises(newProgress);

        // Odeslání do DB na pozadí, pokud je uživatel přihlášen
        if (session?.user?.email) {
            try {
                await fetch("/api/progress", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: session.user.email, progressData: newProgress }),
                });
            } catch (error) {
                console.error("Failed to save progress", error);
            }
        }
    };

    // Loader, zatímco se data stahují z databáze
    if (!isLoaded || planData.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-muted-foreground font-medium tracking-widest uppercase">Loading Training Plan & Progress...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-12">
            
            {/* --- SECTON 1: GENERAL INSTRUCTIONS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col bg-muted/30 p-6 rounded-xl border-primary transition-shadow duration-300 hover:shadow-md h-full">
                    <h4 className="font-bold text-lg uppercase tracking-wider mb-4 flex items-center gap-2">
                        🔥 Warm-up Routine
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                        Walk, Skip A, Hip mobility, Dorso mobility, Thoracic mobility, Prone Angel, Glute bridge.
                    </p>
                    <div className="mt-auto pt-4">
                        <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest">Always complete before strength & cardio</span>
                    </div>
                </div>

                <div className="flex flex-col bg-card p-6 rounded-xl border shadow-sm h-full justify-center">
                    <h4 className="font-bold text-lg uppercase tracking-wider mb-4">
                        ⏱️ Circuit Info
                    </h4>
                    <p className="text-muted-foreground text-sm">
                        Perform exercises in sequence. Use the timer next to each exercise. Mark the completed set at the bottom of the list when all exercises are done.
                    </p>
                </div>
            </div>

            {/* --- SECTION 2: WEEKLY PLAN --- */}
            <div>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight mb-6">Training Schedule</h3>
                
                <Tabs defaultValue="week-1" className="w-full">
                    
                    <TabsList className="w-full flex justify-start overflow-x-auto pb-2 mb-6 bg-transparent h-auto p-0 gap-2">
                        {planData.map((week) => (
                            <TabsTrigger
                                key={week.weekNumber}
                                value={`week-${week.weekNumber}`}
                                className="flex-shrink-0 rounded-full px-5 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-card hover:bg-muted transition-colors"
                            >
                                Week {week.weekNumber}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {planData.map((week) => (
                        <TabsContent key={week.weekNumber} value={`week-${week.weekNumber}`}>
                            <Accordion className="w-full space-y-3">
                                {week.days.map((day: any) => (
                                    <AccordionItem
                                        key={day.dayNumber}
                                        value={`day-${day.dayNumber}`}
                                        className="bg-card border rounded-xl px-2 sm:px-6 shadow-sm overflow-hidden"
                                    >
                                        <AccordionTrigger className="hover:no-underline py-5">
                                            <div className="flex items-center justify-between w-full pr-4">
                                                <div className="flex items-center space-x-4">
                                                    <span className="font-extrabold text-lg sm:text-xl">Day {day.dayNumber}</span>
                                                    <Badge className={`${day.color} text-white border-none shadow-sm`}>
                                                        {day.type}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </AccordionTrigger>

                                        <AccordionContent className="pb-6">
                                            <ul className="space-y-4 mt-4 pl-1">
                                                {day.exercises.map((exercise: string, index: number) => {
                                                    const exerciseId = `w${week.weekNumber}-d${day.dayNumber}-e${index}`;
                                                    const isChecked = completedExercises[exerciseId] || false;

                                                    const isWarmupOrWalk = exercise.toLowerCase().includes("walk") || 
                                                                           exercise.toLowerCase().includes("warm-up") || 
                                                                           exercise.toLowerCase().includes("rest");

                                                    return (
                                                        <li key={exerciseId} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors border bg-card/40 shadow-sm">
                                                            
                                                            <div className="flex items-start gap-3 w-full lg:w-auto">
                                                                <Checkbox 
                                                                    id={exerciseId}
                                                                    checked={isChecked}
                                                                    onCheckedChange={(checked) => toggleExercise(exerciseId, checked === true)}
                                                                    className="mt-1 flex-shrink-0 w-5 h-5 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                                                                />
                                                                <label 
                                                                    htmlFor={exerciseId}
                                                                    className={`text-sm sm:text-base font-medium cursor-pointer transition-all duration-300 ${
                                                                        isChecked ? 'line-through text-muted-foreground opacity-50' : 'text-foreground'
                                                                    }`}
                                                                >
                                                                    {exercise}
                                                                </label>
                                                            </div>

                                                            {!isWarmupOrWalk && (
                                                                <div className="ml-8 lg:ml-0 flex-shrink-0">
                                                                    <MiniTimer workSec={20} restSec={40} totalSets={1} />
                                                                </div>
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                            </ul>

                                            {/* --- CIRCUIT SET TRACKER --- */}
                                            {day.type === "Strength" && (
                                                <div className="mt-8 pt-6 border-t border-border/50">
                                                    <h5 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                                                        Circuit Sets Completed
                                                    </h5>
                                                    <div className="flex flex-wrap gap-4">
                                                        {[1, 2, 3].map((setNum) => {
                                                            const setId = `w${week.weekNumber}-d${day.dayNumber}-set${setNum}`;
                                                            const isSetChecked = completedExercises[setId] || false;
                                                            
                                                            return (
                                                                <label 
                                                                    key={setId} 
                                                                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300 select-none shadow-sm ${
                                                                        isSetChecked 
                                                                            ? 'bg-primary text-primary-foreground border-primary shadow-primary/20' 
                                                                            : 'bg-card border-border hover:border-primary/50'
                                                                    }`}
                                                                >
                                                                    <Checkbox 
                                                                        id={setId}
                                                                        checked={isSetChecked}
                                                                        onCheckedChange={(checked) => toggleExercise(setId, checked === true)}
                                                                        className="hidden" 
                                                                    />
                                                                    <span className="font-extrabold text-lg">Set {setNum}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}