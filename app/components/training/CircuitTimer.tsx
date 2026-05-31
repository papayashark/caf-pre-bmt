"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CircuitTimerProps {
    title: string;
    workSec: number;
    restSec: number;
    totalSets: number;
}

export default function CircuitTimer({ title, workSec, restSec, totalSets }: CircuitTimerProps) {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState<"WORK" | "REST" | "DONE">("WORK");
    const [timeLeft, setTimeLeft] = useState(workSec);
    const [currentSet, setCurrentSet] = useState(1);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && phase !== "DONE") {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime > 0) return prevTime - 1;

                    // Čas vypršel, jdeme měnit fáze
                    if (phase === "WORK") {
                        setPhase("REST");
                        return restSec;
                    } else {
                        // Konec odpočinku, jdeme na další sérii
                        if (currentSet < totalSets) {
                            setCurrentSet((prev) => prev + 1);
                            setPhase("WORK");
                            return workSec;
                        } else {
                            // Všechny série dokončeny!
                            setPhase("DONE");
                            setIsActive(false);
                            return 0;
                        }
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

    // Formátování času (aby ukazoval 00:09 místo 9)
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // Určení barev podle toho, co se zrovna děje
    const getBgColor = () => {
        if (phase === "DONE") return "bg-green-500/10 border-green-500";
        if (phase === "REST") return "bg-red-500/10 border-red-500";
        if (isActive && phase === "WORK") return "bg-green-500/10 border-green-500";
        return "bg-card border-border"; // Výchozí
    };

    return (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border-2 transition-colors duration-500 gap-4 ${getBgColor()}`}>
            
            {/* Levá část: Informace */}
            <div className="flex flex-col">
                <span className="font-bold text-lg">{title}</span>
                <div className="flex items-center gap-2 mt-1">
                    <Badge variant={phase === "WORK" && isActive ? "default" : "outline"} className="text-green-500 border-green-500/30">
                        {workSec}s ON
                    </Badge>
                    <Badge variant={phase === "REST" ? "destructive" : "outline"} className="text-red-500 border-red-500/30">
                        {restSec}s OFF
                    </Badge>
                    <span className="text-sm font-bold ml-2 text-muted-foreground">
                        Set {currentSet}/{totalSets}
                    </span>
                </div>
            </div>

            {/* Pravá část: Hodiny a ovládání */}
            <div className="flex items-center gap-4 self-end sm:self-auto">
                {phase === "DONE" ? (
                    <div className="flex items-center gap-2 text-green-500 font-bold">
                        <CheckCircle className="w-8 h-8" />
                        <span>COMPLETED</span>
                    </div>
                ) : (
                    <span className={`text-4xl font-extrabold tabular-nums tracking-tighter ${phase === "WORK" ? "text-green-500" : "text-red-500"}`}>
                        {formatTime(timeLeft)}
                    </span>
                )}

                <div className="flex gap-2">
                    {phase !== "DONE" && (
                        <Button size="icon" onClick={toggleTimer} className={isActive ? "bg-orange-500 hover:bg-orange-600" : "bg-primary"}>
                            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                        </Button>
                    )}
                    <Button size="icon" variant="outline" onClick={resetTimer}>
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}