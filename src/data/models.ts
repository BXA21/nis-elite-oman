export type Trim = {
  id: string;
  name: string;
  pricePlaceholder: string;
  engine: string;
  mpg: string;
  features: string[];
  addsFromPrevious?: string[];
};

export type ModelYear = {
  id: string;
  year: number;
  generation: string;
  image: string;
  mpg: string;
  engineOptions: string[];
  safetyScore: string;
  highlightBadges: string[];
  trims: Trim[];
  techFeatures: string[];
  safetySystems: string[];
  reliabilityScore: string;
};

export const ALTIMA_MODELS: ModelYear[] = [
  {
    id: "altima-2023",
    year: 2023,
    generation: "6th Gen (Refresh)",
    image: "/images/cars/altima_2023.png",
    mpg: "27 City / 39 Hwy",
    engineOptions: ["2.5L 4-Cyl (188 hp)", "2.0L VC-Turbo (248 hp)"],
    safetyScore: "5-Star NHTSA / Top Safety Pick+",
    highlightBadges: ["New Front Fascia", "12.3-inch Display", "Great MPG"],
    reliabilityScore: "82/100 (J.D. Power)",
    techFeatures: ["12.3-inch Touchscreen", "Wireless Apple CarPlay", "Android Auto", "Wi-Fi Hotspot"],
    safetySystems: ["ProPILOT Assist", "Nissan Safety Shield 360", "Intelligent Forward Collision Warning"],
    trims: [
      { id: "2023-s", name: "S", pricePlaceholder: "$25k - $27k", engine: "2.5L 4-Cyl", mpg: "27/39", features: ["16-inch steel wheels", "7-inch touchscreen", "Safety Shield 360"] },
      { id: "2023-sv", name: "SV", pricePlaceholder: "$26k - $29k", engine: "2.5L 4-Cyl", mpg: "27/39", features: ["17-inch alloy wheels", "8-inch touchscreen", "ProPILOT Assist option"], addsFromPrevious: ["17-inch wheels", "8-inch display", "Power driver's seat", "Apple CarPlay/Android Auto"] },
      { id: "2023-sr", name: "SR", pricePlaceholder: "$28k - $31k", engine: "2.5L 4-Cyl", mpg: "27/37", features: ["19-inch alloy wheels", "Sport suspension", "Sport styling"], addsFromPrevious: ["19-inch wheels", "Sport suspension", "Dark chrome grille", "Paddle shifters"] },
      { id: "2023-sl", name: "SL", pricePlaceholder: "$32k - $35k", engine: "2.5L 4-Cyl", mpg: "27/37", features: ["Leather seating", "Bose Premium Audio", "ProPILOT Assist standard"], addsFromPrevious: ["Leather seats", "Bose 9-speaker system", "Navigation", "ProPILOT Assist standard"] },
      { id: "2023-sr-vc-turbo", name: "SR VC-Turbo", pricePlaceholder: "$35k - $37k", engine: "2.0L VC-Turbo", mpg: "25/34", features: ["248-hp engine", "Active Noise Cancellation", "12.3-inch display standard"], addsFromPrevious: ["2.0L VC-Turbo Engine", "Active Noise Cancellation", "Power moonroof", "12.3-inch HD display"] }
    ]
  },
  {
    id: "altima-2019",
    year: 2019,
    generation: "6th Gen (All-New)",
    image: "/images/cars/altima_2019.png",
    mpg: "28 City / 39 Hwy",
    engineOptions: ["2.5L 4-Cyl (188 hp)", "2.0L VC-Turbo (248 hp)"],
    safetyScore: "5-Star NHTSA / Top Safety Pick",
    highlightBadges: ["All-Wheel Drive Option", "First VC-Turbo", "ProPILOT Assist Intro"],
    reliabilityScore: "79/100 (J.D. Power)",
    techFeatures: ["8-inch Touchscreen", "Apple CarPlay / Android Auto", "Available Bose Audio"],
    safetySystems: ["Automatic Emergency Braking", "Nissan Safety Shield 360 (SV+)", "ProPILOT Assist (SV+)"],
    trims: [
      { id: "2019-s", name: "S", pricePlaceholder: "$18k - $20k", engine: "2.5L 4-Cyl", mpg: "28/39", features: ["16-inch steel wheels", "8-inch touchscreen", "Push button start"] },
      { id: "2019-sv", name: "SV", pricePlaceholder: "$20k - $22k", engine: "2.5L 4-Cyl", mpg: "28/39", features: ["17-inch alloy wheels", "ProPILOT Assist", "Safety Shield 360"], addsFromPrevious: ["ProPILOT Assist", "Safety Shield 360", "Moonroof", "17-inch wheels"] },
      { id: "2019-sr", name: "SR", pricePlaceholder: "$21k - $23k", engine: "2.5L 4-Cyl", mpg: "27/37", features: ["19-inch wheels", "188 hp", "Sport styling"], addsFromPrevious: ["Sport suspension", "19-inch wheels", "LED headlights"] },
      { id: "2019-sl", name: "SL", pricePlaceholder: "$23k - $25k", engine: "2.5L 4-Cyl", mpg: "28/39", features: ["Leather seating", "Bose Audio", "Navigation"], addsFromPrevious: ["Leather seats", "Bose Audio", "Navigation"] },
      { id: "2019-platinum", name: "Platinum", pricePlaceholder: "$25k - $27k", engine: "2.5L 4-Cyl", mpg: "28/39", features: ["19-inch wheels", "Intelligent Around View Monitor", "Interior ambient lighting"], addsFromPrevious: ["Around View Monitor", "19-inch alloy wheels", "Ambient interior lighting"] }
    ]
  },
  {
    id: "altima-2016",
    year: 2016,
    generation: "5th Gen (Refresh)",
    image: "/images/cars/altima_2016.png",
    mpg: "27 City / 39 Hwy",
    engineOptions: ["2.5L 4-Cyl (182 hp)", "3.5L V6 (270 hp)"],
    safetyScore: "5-Star NHTSA / Top Safety Pick+",
    highlightBadges: ["V-Motion Grille", "Zero Gravity Seats", "Available V6"],
    reliabilityScore: "84/100 (J.D. Power)",
    techFeatures: ["NissanConnect", "Advanced Drive-Assist Display", "Siri Eyes Free"],
    safetySystems: ["Predictive Forward Collision Warning", "Forward Emergency Braking", "Blind Spot Warning"],
    trims: [
      { id: "2016-2.5-s", name: "2.5 S", pricePlaceholder: "$12k - $14k", engine: "2.5L 4-Cyl", mpg: "27/39", features: ["16-inch steel wheels", "NissanConnect", "5-inch color display"] },
      { id: "2016-2.5-sv", name: "2.5 SV", pricePlaceholder: "$14k - $16k", engine: "2.5L 4-Cyl", mpg: "27/39", features: ["17-inch alloy wheels", "Blind Spot Warning", "Rear Cross Traffic Alert"], addsFromPrevious: ["17-inch wheels", "Remote Engine Start", "Blind Spot Warning"] },
      { id: "2016-2.5-sr", name: "2.5 SR", pricePlaceholder: "$14k - $16k", engine: "2.5L 4-Cyl", mpg: "26/37", features: ["18-inch sport alloys", "Sport suspension", "Paddle shifters"], addsFromPrevious: ["18-inch wheels", "Sport suspension", "Rear spoiler", "Fog lights"] },
      { id: "2016-2.5-sl", name: "2.5 SL", pricePlaceholder: "$16k - $18k", engine: "2.5L 4-Cyl", mpg: "27/39", features: ["Leather seating", "Bose audio", "Heated front seats"], addsFromPrevious: ["Leather appointed seats", "Bose Premium Audio", "Heated steering wheel"] },
      { id: "2016-3.5-sl", name: "3.5 SL", pricePlaceholder: "$18k - $21k", engine: "3.5L V6", mpg: "22/32", features: ["270-hp V6 engine", "18-inch wheels", "Front/rear sonar"], addsFromPrevious: ["3.5L V6 (270 hp)", "18-inch wheels", "Navigation", "Sonar system"] }
    ]
  }
];
