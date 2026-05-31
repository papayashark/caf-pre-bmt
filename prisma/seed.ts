import prisma from '../app/lib/db';

const rawPlanData = [
    {
        weekNumber: 1,
        days: [
            { dayNumber: 1, type: "Cardio", color: "bg-blue-500", exercises: ["Test Rockport"] },
            { dayNumber: 2, type: "Strength", color: "bg-red-500", exercises: ["Walk - 20 min", "Warm-up", "Chair squat", "Glute bridge", "Calf raises", "Shoulder taps", "Prone Angel", "Step Jack", "Pause Split Squat", "Plank to standing in control"] },
            { dayNumber: 3, type: "Rest Day", color: "bg-gray-500", exercises: ["Walk - 20 min"] },
            { dayNumber: 4, type: "Strength", color: "bg-red-500", exercises: ["Walk - 25 min loaded (25lbs)", "Warm-up", "Chair squat", "Glute bridge", "Calf raises", "Shoulder taps", "Prone Angel", "Step Jack", "Pause Split Squat", "Plank to standing in control"] },
            { dayNumber: 5, type: "Rest Day", color: "bg-gray-500", exercises: ["Rest"] },
            { dayNumber: 6, type: "Mix", color: "bg-purple-500", exercises: ["Walk - 35 min"] },
            { dayNumber: 7, type: "Rest Day", color: "bg-gray-500", exercises: ["Rest"] },
        ]
    },
    {
        weekNumber: 2,
        days: [
            { dayNumber: 1, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 10 min", "Warm-up - walking 5 min", "Jogging - 4x  (1 min J / 1 min W)"] },
            { dayNumber: 2, type: "Strength", color: "bg-red-500", exercises: ["Walk - 20 min", "Warm-up", "Chair squat", "Glute bridge", "Calf raises", "Shoulder taps", "Prone Angel", "Step Jack", "Pause Split Squat", "Plank to standing in control"] },
            { dayNumber: 3, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 10 min", "Warm-up - walking 5 min", "Jogging - 5x  (1 min J / 1 min W)"] },
            { dayNumber: 4, type: "Strength", color: "bg-red-500", exercises: ["Walk - 20 min", "Warm-up", "Chair squat", "Glute bridge", "Calf raises", "Shoulder taps", "Prone Angel", "Step Jack", "Pause Split Squat", "Plank to standing in control"] },
            { dayNumber: 5, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 10 min", "Warm-up - walking 5 min", "Jogging - 6x  (1 min J / 1 min W)"] },
            { dayNumber: 6, type: "Mix", color: "bg-purple-500", exercises: ["Walk - 40 min"] },
            { dayNumber: 7, type: "Rest Day", color: "bg-gray-500", exercises: ["Rest"] }
        ]
    },
    {
        weekNumber: 3,
        days: [
            { dayNumber: 1, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 15 min", "Warm-up - walking 5 min", "Jogging - 6x  (1 min J / 1 min W)"] },
            { dayNumber: 2, type: "Strength", color: "bg-red-500", exercises: ["Walk - 25 min", "Warm-up", "Air squat", "Glute bridge - single leg", "Calf raises - single leg", "Toes taps", "Prone Angel (ball)", "Jumping Jack", "Split Squat", "Dynamic plank to standing"] },
            { dayNumber: 3, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 15 min", "Warm-up - walking 5 min", "Jogging - 7x  (1 min J / 1 min W)"] },
            { dayNumber: 4, type: "Strength", color: "bg-red-500", exercises: ["Walk - 25 min loaded (25lbs)", "Warm-up", "Air squat", "Glute bridge - single leg", "Calf raises - single leg", "Toes taps", "Prone Angel (ball)", "Jumping Jack", "Split Squat", "Dynamic plank to standing"] },
            { dayNumber: 5, type: "Cardio", color: "bg-blue-500", exercises: ["Warm-up - walking 5 min", "Jogging - 8x  (1 min J / 1 min W)"] },
            { dayNumber: 6, type: "Mix", color: "bg-purple-500", exercises: ["Walk - 45 min"] },
            { dayNumber: 7, type: "Rest Day", color: "bg-gray-500", exercises: ["Rest"] }
        ]
    },
    {
        weekNumber: 4,
        days: [
            { dayNumber: 1, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 7x  (1 min J / 1 min W)"] },
            { dayNumber: 2, type: "Strength", color: "bg-red-500", exercises: ["Walk - 20 min", "Warm-up", "Air squat", "Glute bridge - single leg", "Calf raises - single leg", "Toes taps", "Prone Angel (ball)", "Jumping Jack", "Split Squat", "Dynamic plank to standing"] },
            { dayNumber: 3, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 8x  (1 min J / 1 min W)"] },
            { dayNumber: 4, type: "Strength", color: "bg-red-500", exercises: ["Walk - 20 min", "Warm-up", "Air squat", "Glute bridge - single leg", "Calf raises - single leg", "Toes taps", "Prone Angel (ball)", "Jumping Jack", "Split Squat", "Dynamic plank to standing"] },
            { dayNumber: 5, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 10x  (1 min J / 1 min W)"] },
            { dayNumber: 6, type: "Mix", color: "bg-purple-500", exercises: ["Walk - 20 min"] },
            { dayNumber: 7, type: "Rest Day", color: "bg-gray-500", exercises: ["Rest"] }
        ]
    },
    {
        weekNumber: 5,
        days: [
            { dayNumber: 1, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 15 min", "Warm-up - walking 5 min", "Jogging - 4x  (2 min J / 1 min W)"] },
            { dayNumber: 2, type: "Strength", color: "bg-red-500", exercises: ["Walk - 25 min", "Warm-up", "Air squat", "Glute bridge - single leg", "Calf raises - single leg", "Toes taps", "Prone Angel (ball)", "Jumping Jack", "Split Squat", "Dynamic plank to standing", "Shoulder press"] },
            { dayNumber: 3, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 15 min", "Warm-up - walking 5 min", "Jogging - 5x  (2 min J / 1 min W)"] },
            { dayNumber: 4, type: "Strength", color: "bg-red-500", exercises: ["Walk - 30 min loaded (25lbs)", "Warm-up", "Air squat", "Glute bridge - single leg", "Calf raises - single leg", "Toes taps", "Prone Angel (ball)", "Jumping Jack", "Split Squat", "Dynamic plank to standing", "Shoulder press"] },
            { dayNumber: 5, type: "Cardio", color: "bg-blue-500", exercises: ["Warm-up - walking 5 min", "Jogging - 6x  (2 min J / 1 min W)"] },
            { dayNumber: 6, type: "Mix", color: "bg-purple-500", exercises: ["Walk - 50 min"] },
            { dayNumber: 7, type: "Rest Day", color: "bg-gray-500", exercises: ["Rest"] }
        ]
    },
    {
        weekNumber: 6,
        days: [
            { dayNumber: 1, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 6x  (2 min J / 1 min W)"] },
            { dayNumber: 2, type: "Strength", color: "bg-red-500", exercises: ["Walk - 30 min", "Warm-up", "Air squat", "Glute bridge - single leg", "Calf raises - single leg", "Toes taps", "Prone Angel (ball)", "Jumping Jack", "Split Squat", "Dynamic plank to standing", "Shoulder press"] },
            { dayNumber: 3, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 7x  (2 min J / 1 min W)"] },
            { dayNumber: 4, type: "Strength", color: "bg-red-500", exercises: ["Walk - 30 min", "Warm-up", "Air squat", "Glute bridge - single leg", "Calf raises - single leg", "Toes taps", "Prone Angel (ball)", "Jumping Jack", "Split Squat", "Dynamic plank to standing", "Shoulder press"] },
            { dayNumber: 5, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 3x  (3 min J / 1 min W)"] },
            { dayNumber: 6, type: "Mix", color: "bg-purple-500", exercises: ["Walk - 55 min"] },
            { dayNumber: 7, type: "Rest Day", color: "bg-gray-500", exercises: ["Rest"] }
        ]
    },
    {
        weekNumber: 7,
        days: [
            { dayNumber: 1, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 4x  (3 min J / 1 min W)"] },
            { dayNumber: 2, type: "Strength", color: "bg-red-500", exercises: ["Walk - 35 min", "Warm-up", "Dynamic squat (backpack 10 - 45lbs)", "Glute bridge - single leg loaded 10-45lbs", "Jumping Calf raises - single leg", "Push-ups", "Supported row (single arm) loaded 10-45lbs", "Jumping Jack", "Back lunges (10-30lbs)", "Hand release get-up", "Shoulder press (10-30lbs)"] },
            { dayNumber: 3, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 5x  (3 min J / 1 min W)"] },
            { dayNumber: 4, type: "Strength", color: "bg-red-500", exercises: ["Walk - 35 min (25lbs)", "Warm-up", "Air squat", "Dynamic squat (backpack 10 - 45lbs)", "Glute bridge - single leg loaded 10-45lbs", "Jumping Calf raises - single leg", "Push-ups", "Supported row (single arm) loaded 10-45lbs", "Jumping Jack", "Back lunges (10-30lbs)", "Hand release get-up", "Shoulder press (10-30lbs)"] },
            { dayNumber: 5, type: "Cardio", color: "bg-blue-500", exercises: ["Warm-up - walking 5 min", "Jogging - 3x  (4 min J / 1 min W)"] },
            { dayNumber: 6, type: "Mix", color: "bg-purple-500", exercises: ["Walk - 60 min"] },
            { dayNumber: 7, type: "Rest Day", color: "bg-gray-500", exercises: ["Rest"] }
        ]
    },
    {
        weekNumber: 8,
        days: [
            { dayNumber: 1, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 4x  (2 min J / 1 min W)"] },
            { dayNumber: 2, type: "Strength", color: "bg-red-500", exercises: ["Walk - 20 min", "Warm-up", "Dynamic squat (backpack 10 - 45lbs)", "Glute bridge - single leg loaded 10-45lbs", "Jumping Calf raises - single leg", "Push-ups", "Supported row (single arm) loaded 10-45lbs", "Jumping Jack", "Back lunges (10-30lbs)", "Hand release get-up", "Shoulder press (10-30lbs)"] },
            { dayNumber: 3, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 5x  (2 min J / 1 min W)"] },
            { dayNumber: 4, type: "Strength", color: "bg-red-500", exercises: ["Walk - 20 min", "Warm-up", "Air squat", "Dynamic squat (backpack 10 - 45lbs)", "Glute bridge - single leg loaded 10-45lbs", "Jumping Calf raises - single leg", "Push-ups", "Supported row (single arm) loaded 10-45lbs", "Jumping Jack", "Back lunges (10-30lbs)", "Hand release get-up", "Shoulder press (10-30lbs)"] },
            { dayNumber: 5, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 6x  (2 min J / 1 min W)"] },
            { dayNumber: 6, type: "Mix", color: "bg-purple-500", exercises: ["Walk - 20 min"] },
            { dayNumber: 7, type: "Rest Day", color: "bg-gray-500", exercises: ["Rest"] }
        ]
    },
    {
        weekNumber: 9,
        days: [
            { dayNumber: 1, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 25 min", "Warm-up - walking 5 min", "Jogging - 4x  (4 min J / 1 min W)"] },
            { dayNumber: 2, type: "Strength", color: "bg-red-500", exercises: ["Walk - 35 min", "Warm-up", "Dynamic squat (backpack 10 - 45lbs)", "Glute bridge - single leg loaded 10-45lbs", "Jumping Calf raises - single leg", "Inclined Push-ups", "Supported row (single arm) loaded 10-45lbs", "Jumping Jack", "Back lunges (10-30lbs)", "Hand release get-up", "Shoulder press (10-30lbs)"] },
            { dayNumber: 3, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 25 min", "Warm-up - walking 5 min", "Jogging - 2x  (5 min J / 1 min W)"] },
            { dayNumber: 4, type: "Strength", color: "bg-red-500", exercises: ["Walk - 40 min (25lbs)", "Warm-up", "Dynamic squat (backpack 10 - 45lbs)", "Glute bridge - single leg loaded 10-45lbs", "Jumping Calf raises - single leg", "Inclined Push-ups", "Supported row (single arm) loaded 10-45lbs", "Jumping Jack", "Back lunges (10-30lbs)", "Hand release get-up", "Shoulder press (10-30lbs)"] },
            { dayNumber: 5, type: "Cardio", color: "bg-blue-500", exercises: ["Warm-up - walking 5 min", "Jogging - 3x  (5 min J / 1 min W)"] },
            { dayNumber: 6, type: "Mix", color: "bg-purple-500", exercises: ["Walk - 65 min"] },
            { dayNumber: 7, type: "Rest Day", color: "bg-gray-500", exercises: ["Rest"] }
        ]
    },
    {
        weekNumber: 10,
        days: [
            { dayNumber: 1, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 30 min", "Warm-up - walking 5 min", "Jogging - 4x  (5 min J / 1 min W)"] },
            { dayNumber: 2, type: "Strength", color: "bg-red-500", exercises: ["Walk - 40 min", "Warm-up", "Dynamic squat (backpack 10 - 45lbs)", "Glute bridge - single leg loaded 10-45lbs", "Jumping Calf raises - single leg", "Inclined Push-ups", "Supported row (single arm) loaded 10-45lbs", "Jumping Jack", "Back lunges (10-30lbs)", "Hand release get-up", "Shoulder press (10-30lbs)"] },
            { dayNumber: 3, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 30 min", "Warm-up - walking 5 min", "Jogging - 1x  (10 min J / 1 min W)"] },
            { dayNumber: 4, type: "Strength", color: "bg-red-500", exercises: ["Walk - 40 min (25lbs)", "Warm-up", "Dynamic squat (backpack 10 - 45lbs)", "Glute bridge - single leg loaded 10-45lbs", "Jumping Calf raises - single leg", "Inclined Push-ups", "Supported row (single arm) loaded 10-45lbs", "Jumping Jack", "Back lunges (10-30lbs)", "Hand release get-up", "Shoulder press (10-30lbs)"] },
            { dayNumber: 5, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 40 min", "Warm-up - walking 5 min", "Jogging - 1x  (15 min J / 1 min W)"] },
            { dayNumber: 6, type: "Mix", color: "bg-purple-500", exercises: ["Walk - 70 min"] },
            { dayNumber: 7, type: "Rest Day", color: "bg-gray-500", exercises: ["Rest"] }
        ]
    },
    {
        weekNumber: 11,
        days: [
            { dayNumber: 1, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 35 min", "Warm-up - walking 5 min", "Jogging - 2x  (10 min J / 1 min W)"] },
            { dayNumber: 2, type: "Strength", color: "bg-red-500", exercises: ["Walk - 45 min", "Warm-up", "Goblet squat (10-45lbs)", "Glute bridge - single leg loaded 10-45lbs", "Jumping Calf raises - single leg", "Push-ups", "Bent over row (single arm) loaded 10-45lbs", "Jumping Jack", "Walking lunges (10-30lbs)", "Hand release get-up", "Grounder to shoulder press (10-30lbs)"] },
            { dayNumber: 3, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 35 min", "Warm-up - walking 5 min", "Jogging - 1x  (15 min J / 1 min W)"] },
            { dayNumber: 4, type: "Strength", color: "bg-red-500", exercises: ["Walk - 45 min (25lbs)", "Warm-up", "Goblet squat (backpack 10 - 45lbs)", "Glute bridge - single leg loaded 10-45lbs", "Jumping Calf raises - single leg", "Push-ups", "Bent over row (single arm) loaded 10-45lbs", "Jumping Jack", "Walking lunges (10-30lbs)", "Hand release get-up", "Grounder to Shoulder press (10-30lbs)"] },
            { dayNumber: 5, type: "Cardio", color: "bg-blue-500", exercises: ["Warm-up - walking 5 min", "Jogging - 1x  (20 min J / 1 min W)"] },
            { dayNumber: 6, type: "Mix", color: "bg-purple-500", exercises: ["Walk - 75 min"] },
            { dayNumber: 7, type: "Rest Day", color: "bg-gray-500", exercises: ["Rest"] }
        ]
    },
    {
        weekNumber: 12,
        days: [
            { dayNumber: 1, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 5x  (2 min J / 1 min W)"] },
            { dayNumber: 2, type: "Strength", color: "bg-red-500", exercises: ["Walk - 20 min", "Warm-up", "Goblet squat (10-45lbs)", "Glute bridge - single leg loaded 10-45lbs", "Jumping Calf raises - single leg", "Push-ups", "Bent over row (single arm) loaded 10-45lbs", "Jumping Jack", "Walking lunges (10-30lbs)", "Hand release get-up", "Grounder to shoulder press (10-30lbs)"] },
            { dayNumber: 3, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 5x  (2 min J / 1 min W)"] },
            { dayNumber: 4, type: "Strength", color: "bg-red-500", exercises: ["Walk - 20 min", "Warm-up", "Goblet squat (backpack 10 - 45lbs)", "Glute bridge - single leg loaded 10-45lbs", "Jumping Calf raises - single leg", "Push-ups", "Bent over row (single arm) loaded 10-45lbs", "Jumping Jack", "Walking lunges (10-30lbs)", "Hand release get-up", "Grounder to Shoulder press (10-30lbs)"] },
            { dayNumber: 5, type: "Cardio", color: "bg-blue-500", exercises: ["Walk - 20 min", "Warm-up - walking 5 min", "Jogging - 5x  (2 min J / 1 min W)"] },
            { dayNumber: 6, type: "Mix", color: "bg-purple-500", exercises: ["Walk - 20 min"] },
            { dayNumber: 7, type: "Rest Day", color: "bg-gray-500", exercises: ["Rest"] }
        ]
    }
];

async function main() {
  console.log("🌱 Spouštím seedování tréninkového plánu...");

  await prisma.trainingDay.deleteMany();

  for (const week of rawPlanData) {
    for (const day of week.days) {
      await prisma.trainingDay.create({
        data: {
          weekNumber: week.weekNumber,
          dayNumber: day.dayNumber,
          type: day.type,
          color: day.color,
          exercises: JSON.stringify(day.exercises), 
        },
      });
    }
  }

  console.log("✅ Všech 12 týdnů bylo úspěšně uloženo do databáze!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });