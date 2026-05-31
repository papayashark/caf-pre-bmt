"use client";

import { useState, useEffect } from "react";
import { Play, Square, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MiniTimerProps {
    workSec?: number;
    restSec?: number;
    totalSets?: number;
}

export default function MiniTimer({ workSec = 20, restSec = 40, totalSets = 3 }: MiniTimerProps) {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState<"WORK" | "REST" | "DONE">("WORK");
    const [timeLeft, setTimeLeft] = useState(workSec);
    const [currentSet, setCurrentSet] = useState(1);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && phase !== "DONE") {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev > 0) return prev - 1;
                    
                    // Fáze Práce skončila
                    if (phase === "WORK") {
                        // Pokud to byla poslední série, končíme
                        if (currentSet >= totalSets) {
                            setPhase("DONE");
                            setIsActive(false);
                            return 0;
                        }
                        // Jinak jdeme odpočívat
                        setPhase("REST");
                        return restSec;
                    } else {
                        // Fáze Odpočinku skončila, jdeme na další sérii
                        setCurrentSet((s) => s + 1);
                        setPhase("WORK");
                        return workSec;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, phase, currentSet, workSec, restSec, totalSets]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => { 
        setIsActive(false); 
        setPhase("WORK"); 
        setCurrentSet(1);
        setTimeLeft(workSec); 
    };

    if (phase === "DONE") {
        return (
            <div 
                className="flex items-center gap-2 text-green-600 dark:text-green-500 font-bold text-sm bg-green-500/10 px-3 py-1.5 rounded-md cursor-pointer border border-green-500/30 transition-all hover:bg-green-500/20" 
                onClick={resetTimer}
            >
                <CheckCircle2 className="w-5 h-5" /> 
                <span>DONE ({totalSets}/{totalSets})</span>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-3 px-3 py-1.5 rounded-md border transition-colors ${
            phase === "WORK" && isActive ? "bg-green-500/10 border-green-500 text-green-600 dark:text-green-500" 
            : phase === "REST" ? "bg-red-500/10 border-red-500 text-red-500 dark:text-red-400" 
            : "bg-muted border-border"
        }`}>
            {/* Čas a Fáze */}
            <div className="flex flex-col items-center justify-center min-w-[3.5rem]">
                <span className="font-bold tabular-nums text-sm leading-none">
                    {timeLeft}s
                </span>
                <span className="text-[10px] uppercase font-extrabold opacity-70 leading-none mt-1 tracking-wider">
                    {phase}
                </span>
            </div>
            
            {/* Ukazatel Série */}
            <div className="flex flex-col items-center border-l pl-3 border-current/20">
                <span className="text-xs font-bold whitespace-nowrap opacity-90">
                    Set {currentSet}/{totalSets}
                </span>
            </div>

            {/* Tlačítko */}
            <Button size="icon" variant="ghost" className="h-7 w-7 ml-1 hover:bg-transparent" onClick={toggleTimer}>
                {isActive ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </Button>
        </div>
    );
}