export interface Athlete {
  id: string;
  name: string;
  age: number;
  sport: string;
  squad: string;
  avatar: string;
  role: string;
  
  // Physiological Telemetry
  readinessScore: number;       // 0-100
  hrv: number;                  // Heart Rate Variability (ms)
  rhr: number;                  // Resting Heart Rate (bpm)
  sleepScore: number;           // 0-100
  sleepHours: number;           // hours
  sleepEfficiency: number;      // %
  hydrationLevel: number;       // 0-100
  vo2Max: number;               // ml/kg/min
  muscleFatigue: number;        // 0-100
  jointSoreness: number;        // 0-100
  trainingLoadStatus: "Optimal" | "Overreaching" | "Recovery" | "Under-training";
  weeklyWorkload: number;       // Arbitrary load units
  injuryRisk: "Low" | "Medium" | "High";
  injuryDetails?: string;

  // Athletic Metrics
  topSpeed: number;             // km/h
  acceleration: number;         // m/s^2
  sprintSplit10m: number;        // seconds
  sprintSplit30m: number;        // seconds
  agilityTTest: number;         // seconds
  reactiveAgility: number;      // ms delay
  enduranceBeepTest: number;    // Level
  aerobicThreshold: number;     // bpm
  anaerobicThreshold: number;   // bpm
  jumpHeight: number;           // cm
  
  // Biomechanical Stats
  hipFlexionAngle: number;      // degrees
  kneeExtensionAngle: number;   // degrees
  groundContactTime: number;    // ms
  strideLength: number;         // meters
  strideFrequency: number;      // Hz
  
  // Nutrition & Academic Stats
  nutritionMacros: {
    protein: number;            // grams
    carbs: number;              // grams
    fats: number;               // grams
    calories: number;           // kcal
    waterIntake: number;        // Liters
    waterTarget: number;        // Liters
  };
  academicScore: number;        // GPA / Performance score (0-100)
  studyHours: number;           // hours per week
  socialScore: number;          // Mental balance (0-100)
  
  // AI recommendations
  aiAdvice: string;
  aiSuggestedWorkouts: string[];
  
  // Progress Timelines (History over 6 weeks)
  history: {
    weeks: string[];
    readiness: number[];
    workload: number[];
    speed: number[];
    sleep: number[];
  };
}

export const mockAthletes: Athlete[] = [
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    age: 16,
    sport: "Track & Field (Sprints)",
    squad: "U-18 Elite Sprinters",
    avatar: "MV",
    role: "Athlete",
    readinessScore: 92,
    hrv: 88,
    rhr: 48,
    sleepScore: 94,
    sleepHours: 8.8,
    sleepEfficiency: 96,
    hydrationLevel: 90,
    vo2Max: 62,
    muscleFatigue: 24,
    jointSoreness: 10,
    trainingLoadStatus: "Optimal",
    weeklyWorkload: 420,
    injuryRisk: "Low",
    topSpeed: 34.2,
    acceleration: 8.4,
    sprintSplit10m: 1.64,
    sprintSplit30m: 3.82,
    agilityTTest: 9.12,
    reactiveAgility: 185,
    enduranceBeepTest: 11.2,
    aerobicThreshold: 145,
    anaerobicThreshold: 178,
    jumpHeight: 68,
    hipFlexionAngle: 112,
    kneeExtensionAngle: 164,
    groundContactTime: 92,
    strideLength: 2.15,
    strideFrequency: 4.4,
    nutritionMacros: {
      protein: 165,
      carbs: 380,
      fats: 70,
      calories: 2810,
      waterIntake: 3.6,
      waterTarget: 4.0
    },
    academicScore: 92,
    studyHours: 12,
    socialScore: 88,
    aiAdvice: "Physiological readiness is high. Excellent window for neural activation and maximum-velocity sprinting block. Hamstring load limits are well within safe thresholds. Suggest prioritizing speed-endurance sets today with 5-minute passive recovery windows.",
    aiSuggestedWorkouts: [
      "4 x 60m Flying Sprints (98% intensity, 5m rest)",
      "3 x 120m Speed Endurance Runs (92% intensity, 6m rest)",
      "Plyometric Box Jump complex (5 sets of 4 reps)"
    ],
    history: {
      weeks: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"],
      readiness: [82, 85, 78, 89, 90, 92],
      workload: [360, 380, 450, 410, 400, 420],
      speed: [33.1, 33.4, 33.2, 33.8, 34.0, 34.2],
      sleep: [88, 90, 84, 91, 92, 94]
    }
  },
  {
    id: "chloe-chen",
    name: "Chloe Chen",
    age: 15,
    sport: "Cross Country & 1500m",
    squad: "U-18 Endurance Elite",
    avatar: "CC",
    role: "Athlete",
    readinessScore: 86,
    hrv: 95,
    rhr: 42,
    sleepScore: 88,
    sleepHours: 8.2,
    sleepEfficiency: 92,
    hydrationLevel: 95,
    vo2Max: 68,
    muscleFatigue: 35,
    jointSoreness: 18,
    trainingLoadStatus: "Optimal",
    weeklyWorkload: 510,
    injuryRisk: "Low",
    topSpeed: 27.8,
    acceleration: 6.2,
    sprintSplit10m: 1.88,
    sprintSplit30m: 4.35,
    agilityTTest: 9.85,
    reactiveAgility: 210,
    enduranceBeepTest: 14.5,
    aerobicThreshold: 135,
    anaerobicThreshold: 168,
    jumpHeight: 52,
    hipFlexionAngle: 104,
    kneeExtensionAngle: 158,
    groundContactTime: 115,
    strideLength: 1.85,
    strideFrequency: 3.8,
    nutritionMacros: {
      protein: 130,
      carbs: 450,
      fats: 65,
      calories: 2880,
      waterIntake: 3.8,
      waterTarget: 4.2
    },
    academicScore: 96,
    studyHours: 15,
    socialScore: 90,
    aiAdvice: "Aerobic markers are stellar with an ultra-low RHR of 42bpm. Sleep depth was slightly compromised. Recommend high-intensity aerobic threshold running with steady pacing. Ensure hamstring mobility is maintained during post-run dynamic cool-down.",
    aiSuggestedWorkouts: [
      "20m Lactate Threshold Tempo Run (85% HRmax)",
      "6 x 800m Intervals (90% Aerobic Pace, 2m recovery jog)",
      "Deep mobility flow & hip flexor release (20 mins)"
    ],
    history: {
      weeks: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"],
      readiness: [88, 82, 84, 85, 87, 86],
      workload: [480, 500, 520, 490, 500, 510],
      speed: [26.9, 27.1, 27.3, 27.5, 27.6, 27.8],
      sleep: [90, 86, 88, 87, 89, 88]
    }
  },
  {
    id: "leo-santos",
    name: "Leo Santos",
    age: 17,
    sport: "Soccer (Midfielder)",
    squad: "Academy U-17 A",
    avatar: "LS",
    role: "Athlete",
    readinessScore: 78,
    hrv: 72,
    rhr: 54,
    sleepScore: 80,
    sleepHours: 7.5,
    sleepEfficiency: 86,
    hydrationLevel: 82,
    vo2Max: 59,
    muscleFatigue: 48,
    jointSoreness: 25,
    trainingLoadStatus: "Recovery",
    weeklyWorkload: 490,
    injuryRisk: "Medium",
    topSpeed: 30.5,
    acceleration: 7.6,
    sprintSplit10m: 1.72,
    sprintSplit30m: 4.02,
    agilityTTest: 8.65,
    reactiveAgility: 168,
    enduranceBeepTest: 12.8,
    aerobicThreshold: 140,
    anaerobicThreshold: 172,
    jumpHeight: 61,
    hipFlexionAngle: 108,
    kneeExtensionAngle: 161,
    groundContactTime: 102,
    strideLength: 1.95,
    strideFrequency: 4.1,
    nutritionMacros: {
      protein: 155,
      carbs: 410,
      fats: 75,
      calories: 2930,
      waterIntake: 3.0,
      waterTarget: 3.8
    },
    academicScore: 84,
    studyHours: 8,
    socialScore: 82,
    aiAdvice: "Moderate fatigue is accumulating in the lower limbs, specifically calf and Achilles tendons. Transitioning from optimal to a recovery load state. Restrict maximum-velocity sprinting and focus instead on structural agility drills, reactive positioning, and technical play.",
    aiSuggestedWorkouts: [
      "Technical passing drill with rapid change-of-direction (75% speed)",
      "Agility Ladder drills focusing on footwork quickness without absolute loading",
      "Lower extremity foam rolling & calf stretching (25 mins)"
    ],
    history: {
      weeks: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"],
      readiness: [85, 80, 83, 76, 75, 78],
      workload: [400, 440, 470, 510, 520, 490],
      speed: [29.8, 30.1, 30.2, 30.4, 30.5, 30.5],
      sleep: [85, 82, 84, 79, 78, 80]
    }
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    age: 16,
    sport: "Tennis",
    squad: "U-18 National Team",
    avatar: "ER",
    role: "Athlete",
    readinessScore: 48,
    hrv: 45,
    rhr: 66,
    sleepScore: 61,
    sleepHours: 6.2,
    sleepEfficiency: 74,
    hydrationLevel: 75,
    vo2Max: 54,
    muscleFatigue: 78,
    jointSoreness: 55,
    trainingLoadStatus: "Overreaching",
    weeklyWorkload: 590,
    injuryRisk: "High",
    injuryDetails: "Left hamstring tension / minor distal strain detected by biomechanical scanner asymmetry analysis.",
    topSpeed: 26.2,
    acceleration: 6.8,
    sprintSplit10m: 1.94,
    sprintSplit30m: 4.52,
    agilityTTest: 9.98,
    reactiveAgility: 245,
    enduranceBeepTest: 9.8,
    aerobicThreshold: 142,
    anaerobicThreshold: 170,
    jumpHeight: 46,
    hipFlexionAngle: 96,
    kneeExtensionAngle: 148,
    groundContactTime: 122,
    strideLength: 1.72,
    strideFrequency: 3.6,
    nutritionMacros: {
      protein: 120,
      carbs: 320,
      fats: 58,
      calories: 2280,
      waterIntake: 2.2,
      waterTarget: 3.5
    },
    academicScore: 89,
    studyHours: 10,
    socialScore: 70,
    aiAdvice: "WARNING: High Overload Risk. Heart Rate Variability (HRV) has collapsed by 35% below baseline, and resting heart rate has elevated to 66bpm. Ground Contact Time asymmetry is heavily favoring the right leg (+8% imbalance). Mandate complete speed/impact restrictions. Focus solely on light mobility, active rehab, upper-body core strength, and thermal recovery.",
    aiSuggestedWorkouts: [
      "Isolated Upper-Body Strength Circuit (30 mins)",
      "Targeted Left Hamstring eccentric isometric holds (Low load, rehab focus)",
      "Contrast hydrotherapy (cold plunge + sauna) + 30 mins active physical therapy"
    ],
    history: {
      weeks: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"],
      readiness: [78, 74, 68, 55, 45, 48],
      workload: [450, 480, 520, 580, 600, 590],
      speed: [27.1, 26.9, 26.8, 26.4, 26.0, 26.2],
      sleep: [80, 78, 75, 68, 60, 61]
    }
  }
];

export interface Message {
  id: string;
  sender: string;
  role: "Coach" | "Parent" | "Athlete" | "AI Advisor";
  avatar: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    sender: "Coach Henderson",
    role: "Coach",
    avatar: "CH",
    content: "Hi team, remember to complete your sleep and hydration tracking before the 9:00 AM dynamic screening. The biomechanical scanner is set up on lane 4.",
    timestamp: "07:30 AM",
    read: true
  },
  {
    id: "msg-2",
    sender: "Sarah Vance (Parent)",
    role: "Parent",
    avatar: "SV",
    content: "Coach Henderson, Marcus mentioned his left hamstring felt a bit tight after the flying sprints yesterday. We did an extra stretch last night, let me know what his scanner readings show today.",
    timestamp: "Yesterday",
    read: true
  },
  {
    id: "msg-3",
    sender: "AURA Coach AI",
    role: "AI Advisor",
    avatar: "AI",
    content: "Elena Rostova: Bio-asymmetry of +8% has triggered a system restriction. I have updated her profile and proposed a light active rehab docket for today's session. Awaiting coach override.",
    timestamp: "05:12 AM",
    read: false
  },
  {
    id: "msg-4",
    sender: "Marcus Vance",
    role: "Athlete",
    avatar: "MV",
    content: "Got it coach! Syncing my wearable now, sleep quality was great, ready to push the block starts today.",
    timestamp: "08:02 AM",
    read: false
  }
];

export interface TrainingSession {
  id: string;
  time: string;
  title: string;
  type: "Speed" | "Endurance" | "Recovery" | "Screening";
  attendees: number;
  duration: string;
}

export const mockSessions: TrainingSession[] = [
  {
    id: "sess-1",
    time: "09:00 AM - 10:30 AM",
    title: "High-Velocity Start Acceleration",
    type: "Speed",
    attendees: 8,
    duration: "90 min"
  },
  {
    id: "sess-2",
    time: "11:00 AM - 12:00 PM",
    title: "Dynamic Screening & Joint Range Tests",
    type: "Screening",
    attendees: 12,
    duration: "60 min"
  },
  {
    id: "sess-3",
    time: "02:30 PM - 04:00 PM",
    title: "Aerobic Lactate Threshold Intervals",
    type: "Endurance",
    attendees: 6,
    duration: "90 min"
  },
  {
    id: "sess-4",
    time: "04:30 PM - 05:30 PM",
    title: "Neuromuscular Release & Cold Plunge",
    type: "Recovery",
    attendees: 15,
    duration: "60 min"
  }
];
