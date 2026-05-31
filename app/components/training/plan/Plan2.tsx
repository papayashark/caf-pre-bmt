
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const plan2 = [
    {
        week: 1,
        days: [
            { day: 1, type: "Kardio", color: "bg-red-500", workout: ["Run 3km at a comfortable pace", "Rest 1 hour", "Hydration"] },
            { day: 2, type: "Síla", color: "bg-blue-500", workout: ["Push-ups 3x15", "Bodyweight squats 3x20", "Plank 3x30s"] },
            { day: 3, type: "Kardio", color: "bg-red-500", workout: ["Run 4km at a comfortable pace", "Rest 1 hour", "Hydration"] },
            { day: 4, type: "Síla", color: "bg-blue-500", workout: ["Pull-ups 3x10", "Lunges 3x15 per leg", "Leg raises 3x20"] },
            { day: 5, type: "Kardio", color: "bg-red-500", workout: ["Run 5km at a comfortable pace", "Rest 1 hour", "Hydration"] },
            { day: 6, type: "Síla", color: "bg-blue-500", workout: ["Dips 3x12", "Burpees 3x15", "Mountain climbers 3x30s"] },
            { day: 7, type: "Rest", color: "bg-gray-500", workout: ["Active recovery (light walk, stretching)"] }
        ]
    },
    {
        week: 2,
        days: [
            { day: 1, type: "Kardio", color: "bg-red-500", workout: ["Run 4km at a comfortable pace", "Rest 1 hour", "Hydration"] },
            { day: 2, type: "Síla", color: "bg-blue-500", workout: ["Push-ups 4x15", "Bodyweight squats 4x20", "Plank 4x30s"] },
            { day: 3, type: "Kardio", color: "bg-red-500", workout: ["Run 5km at a comfortable pace", "Rest 1 hour", "Hydration"] },
            { day: 4, type: "Síla", color: "bg-blue-500", workout: ["Pull-ups 4x10", "Lunges 4x15 per leg", "Leg raises 4x20"] },
            { day: 5, type: "Kardio", color: "bg-red-500", workout: ["Run 6km at a comfortable pace", "Rest 1 hour", "Hydration"] },
            { day: 6, type: "Síla", color: "bg-blue-500", workout: ["Dips 4x12", "Burpees 4x15", "Mountain climbers 4x30s"] },
            { day: 7, type: "Rest", color: "bg-gray-500", workout: ["Active recovery (light walk, stretching)"] }
        ]
    }
]

export default function Plan2() {
    return (
        <div className="w-full">
            <Tabs defaultValue="week1" className="w-full">
                <TabsList>
                    {plan2.map((week) => (
                        <TabsTrigger key={week.week} value={`week${week.week}`} className="flex-shrink-0">

                            Tyden {week.week}
                        </TabsTrigger>
                    ))}
                </TabsList>


                {plan2.map((week) => (
                    <TabsContent key={week.week} value={`week${week.week}`}>
                        <Accordion type="single" collapsible className="w-full">
                            {week.days.map((day) => (
                                <AccordionItem key={day.day} value={`day${day.day}`}>
                                    <AccordionTrigger className={`p-4 ${day.color} text-white`}>
                                        Den {day.day} - {day.type}
                                    </AccordionTrigger>
                                    <AccordionContent className="p-4 bg-white">
                                        <ul className="list-disc pl-5">
                                            {day.workout.map((exercise, index) => (
                                                <li key={index} className="text-gray-700">
                                                    {exercise}
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}