"use client";

import { useState, useEffect, useRef } from "react";
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

    // 1. TADY JE TEN CHYBĚJÍCÍ audioRef! (Here is the missing audioRef)
    const audioRef = useRef<HTMLAudioElement>(null);

    const playAlarm = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0; // Rewind to start
            audioRef.current.play().catch(e => console.log("Audio blocked:", e));
        }
    };

    // Watch for the timer to hit zero
    // Watch for the timer to hit zero or countdown
    useEffect(() => {
        if (!isActive || phase === "DONE") return;

        // Beep at 3, 2, and 1 seconds ONLY during the WORK phase (before rest)
        if (phase === "WORK" && timeLeft <= 3 && timeLeft > 0) {
            playAlarm();
        }

        // The final beep when time hits zero (for both Work and Rest)
        if (timeLeft === 0) {
            playAlarm();
        }
    }, [timeLeft, isActive, phase]);

    // Handle the actual countdown
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && phase !== "DONE") {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime > 0) return prevTime - 1;

                    if (phase === "WORK") {
                        setPhase("REST");
                        return restSec;
                    } else if (phase === "REST") {
                        if (currentSet < totalSets) {
                            setPhase("WORK");
                            setCurrentSet((prevSet) => prevSet + 1);
                            return workSec;
                        } else {
                            setPhase("DONE");
                            setIsActive(false);
                            return 0;
                        }
                    }
                    return 0;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, phase, currentSet, totalSets, workSec, restSec]);

    // Update timeLeft if the parent component changes the workSec (like switching weeks)
    useEffect(() => {
        if (!isActive && phase === "WORK") {
            setTimeLeft(workSec);
        }
    }, [workSec, isActive, phase]);

    // 2. TLAČÍTKA S ODBLOKOVÁNÍM ZVUKU (Buttons with Mobile Audio Unlock)
    const toggleTimer = () => {
        if (phase !== "DONE") {
            // MOBILE AUDIO FIX: "Unlock" the audio on the very first tap
            if (!isActive && audioRef.current) {
                audioRef.current.volume = 0; // Mute it temporarily
                audioRef.current.play().then(() => {
                    audioRef.current?.pause(); // Pause it immediately
                    if (audioRef.current) {
                        audioRef.current.currentTime = 0; // Reset to start
                        audioRef.current.volume = 1; // Put volume back to normal for the real alarm
                    }
                }).catch(e => console.log("Audio unlock blocked:", e));
            }

            setIsActive(!isActive);
        }
    };

    const resetTimer = () => {
        setIsActive(false);
        setPhase("WORK");
        setCurrentSet(1);
        setTimeLeft(workSec);
    };

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

            {/* 3. NEVIDITELNÝ PŘEHRÁVAČ (Invisible Audio Player) */}
            <audio ref={audioRef} src="/alarm.mp3" preload="auto" />
        </div>
    );
}