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

    const playAlarm = () => {
        // Cesta začíná '/' což automaticky ukazuje do složky public
        const audio = new Audio('/alarm.mp3'); 
        // Přidali jsme .catch() pro zachycení případné chyby, kdyby prohlížeč zvuk zablokoval
        audio.play().catch(e => console.log("Audio zablokováno prohlížečem:", e)); 
    };

    // NOVÝ EFEKT: Jen "hlídá" čas a přehraje zvuk, když padne nula
    useEffect(() => {
        if (timeLeft === 0 && isActive && phase !== "DONE") {
            playAlarm();
        }
    }, [timeLeft, isActive, phase]);

    // PŮVODNÍ EFEKT: Stará se o samotný odpočet a přepínání fází
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && phase !== "DONE") {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    // Pokud ještě zbývá čas, normálně odečítáme 1 vteřinu
                    if (prevTime > 0) return prevTime - 1;

                    // Čas vypršel (je 0), řešíme přechod do další fáze
                    if (phase === "WORK") {
                        setPhase("REST");
                        return restSec;
                    } else if (phase === "REST") {
                        if (currentSet < totalSets) {
                            // Jdeme na další sérii
                            setPhase("WORK");
                            setCurrentSet((prevSet) => prevSet + 1);
                            return workSec;
                        } else {
                            // Všechny série jsou hotové
                            setPhase("DONE");
                            setIsActive(false);
                            return 0;
                        }
                    }
                    return 0;
                });
            }, 1000);
        }

        // Úklid po efektu, aby se nám intervaly nezbláznily
        return () => clearInterval(interval);
    }, [isActive, phase, currentSet, totalSets, workSec, restSec]);

    // Pomocné funkce pro tlačítka
    const toggleTimer = () => {
        if (phase !== "DONE") setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setPhase("WORK");
        setCurrentSet(1);
        setTimeLeft(workSec);
    };

    // Vzhled komponentu
    return (
        <div className="flex flex-col items-center p-6 border rounded-xl bg-white shadow-sm max-w-sm w-full mx-auto space-y-4">
            <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Set {currentSet} / {totalSets}
                </h3>
                
                <h2 className={`text-2xl font-bold uppercase tracking-widest transition-colors duration-300 ${
                    phase === "WORK" ? "text-red-500" : 
                    phase === "REST" ? "text-blue-500" : 
                    "text-green-500"
                }`}>
                    {phase}
                </h2>
                
                <div className="text-7xl font-mono mt-2 font-light text-gray-800">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
            </div>

            <div className="flex space-x-3 w-full mt-4">
                {phase !== "DONE" ? (
                    <Button 
                        onClick={toggleTimer} 
                        className="flex-1 cursor-pointer text-lg py-6"
                        variant={isActive ? "secondary" : "default"}
                    >
                        {isActive ? <Square className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5 fill-current" />}
                        {isActive ? "Pause" : "Start"}
                    </Button>
                ) : (
                    <Button disabled className="flex-1 bg-green-500 text-white opacity-100 py-6 text-lg">
                        <CheckCircle2 className="mr-2 h-5 w-5" /> Finished
                    </Button>
                )}
                
                <Button 
                    variant="outline" 
                    onClick={resetTimer} 
                    className="cursor-pointer py-6"
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}