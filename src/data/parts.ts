export type Part = {
    id: string;
    name: string;
    category: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    compatibleYears: [number, number];
    description: string;
    inStock: boolean;
    condition?: string;
    orderFromChina?: boolean;
};

// Note: Prices are in Omani Rial (OMR).
export const ALTIMA_PARTS: Part[] = [
    // Mechanical / Engine Parts
    {
        id: 'part-1', name: "Nissan Altima Engine Mounting Set", category: "Mechanical / Engine Parts",
        price: 25.00, rating: 4.6, reviews: 45,
        image: "/images/parts/engine_mounting.png",
        compatibleYears: [2015, 2022],
        description: "Set of used original engine mounts to absorb vibration and secure the engine block perfectly. Tested and verified from a working vehicle.",
        inStock: true, condition: "Used original part"
    },
    {
        id: 'part-2', name: "Nissan Altima Throttle Body", category: "Mechanical / Engine Parts",
        price: 35.00, rating: 4.5, reviews: 24,
        image: "/images/parts/throttle_body.png",
        compatibleYears: [2015, 2020],
        description: "Used genuine throttle body with butterfly valve intact. Cleaned and tested to fix rough idling, stalling, and throttle response issues.",
        inStock: true, condition: "Used original part"
    },
    {
        id: 'part-3', name: "Platinum Spark Plugs (Set of 4)", category: "Mechanical / Engine Parts",
        price: 20.00, rating: 4.9, reviews: 512,
        image: "/images/parts/spark_plugs.png",
        compatibleYears: [2015, 2025],
        description: "Genuine OEM platinum spark plugs for the 2.5L engine. Delivers enhanced spark, improved fuel economy, and smooth cold starts.",
        inStock: true, condition: "New OEM/original part"
    },
    {
        id: 'part-4', name: "Nissens Oil Cooler for Altima", category: "Mechanical / Engine Parts",
        price: 15.00, rating: 4.6, reviews: 89,
        image: "/images/parts/oil_cooler.png",
        compatibleYears: [2016, 2022],
        description: "High-quality Nissens branded commercial oil cooler. Prevents engine oil from overheating during heavy driving conditions in Oman.",
        inStock: true, condition: "New aftermarket/commercial part", orderFromChina: true
    },
    {
        id: 'part-5', name: "Altima Water Thermostat", category: "Mechanical / Engine Parts",
        price: 22.00, rating: 4.8, reviews: 156,
        image: "/images/parts/water_thermostat.png",
        compatibleYears: [2019, 2025],
        description: "Brand new original OEM water thermostat with housing and gasket. Regulates engine coolant temperature for efficient performance.",
        inStock: true, condition: "New OEM/original part"
    },
    {
        id: 'part-6', name: "Altima Timing Chain Kit", category: "Mechanical / Engine Parts",
        price: 45.00, rating: 4.7, reviews: 112,
        image: "/images/parts/timing_chain_kit.png",
        compatibleYears: [2015, 2020],
        description: "Complete aftermarket timing chain kit with tensioners and guides. Keeps engine timing in perfect sync and prevents costly internal damage.",
        inStock: true, condition: "New aftermarket/commercial part", orderFromChina: true
    },
    {
        id: 'part-7', name: "Altima Engine Air Filter", category: "Mechanical / Engine Parts",
        price: 8.00, rating: 4.8, reviews: 320,
        image: "/images/parts/air_intake.png",
        compatibleYears: [2015, 2025],
        description: "Original equipment paper air filter to maximize engine breathing and performance. Easy drop-in replacement in under 5 minutes.",
        inStock: true, condition: "New OEM/original part"
    },
    {
        id: 'part-8', name: "Genuine Nissan Oil Filter", category: "Mechanical / Engine Parts",
        price: 3.00, rating: 4.9, reviews: 840,
        image: "/images/parts/oil_filter.png",
        compatibleYears: [2015, 2025],
        description: "OEM Nissan branded oil filter cartridge. Essential for every engine oil change to protect against sludge and engine wear.",
        inStock: true, condition: "New OEM/original part"
    },
    {
        id: 'part-9', name: "Nissan Altima Radiator Assembly (Used)", category: "Mechanical / Engine Parts",
        price: 35.00, rating: 4.4, reviews: 36,
        image: "/images/parts/radiator_used.png",
        compatibleYears: [2019, 2025],
        description: "Original used aluminum radiator in perfect working condition. Pressure tested with no leaks. Extracted from a low-mileage salvage vehicle.",
        inStock: true, condition: "Used original part"
    },
    {
        id: 'part-10', name: "Nissan Altima Custom Exhaust System", category: "Mechanical / Engine Parts",
        price: 299.00, rating: 4.7, reviews: 45,
        image: "/images/parts/catback_exhaust.png",
        compatibleYears: [2019, 2025],
        description: "Full stainless steel catback exhaust system with a large polished tip. Gives a deeper exhaust note and mild horsepower improvement.",
        inStock: true, condition: "New aftermarket/commercial part"
    },
    {
        id: 'part-11', name: "aFe Power Performance Air Filter", category: "Mechanical / Engine Parts",
        price: 130.00, rating: 4.8, reviews: 68,
        image: "/images/parts/afe_performance_filter.png",
        compatibleYears: [2019, 2025],
        description: "Premium red cotton gauze aFe Power washable performance filter. Increases airflow significantly for maximum horsepower and torque gains.",
        inStock: true, condition: "New aftermarket/commercial part"
    },
    {
        id: 'part-12', name: "Nissan Altima Used Engine Components Set", category: "Mechanical / Engine Parts",
        price: 250.00, rating: 4.2, reviews: 12,
        image: "/images/parts/engine_components_set.png",
        compatibleYears: [2015, 2018],
        description: "Full set of internal used engine components including pistons, camshaft, and valves from a verified working 2.5L motor. Great for rebuild projects.",
        inStock: true, condition: "Used original part"
    },
    {
        id: 'part-13', name: "KYB Shock Absorber (Single)", category: "Mechanical / Engine Parts",
        price: 25.00, rating: 4.7, reviews: 215,
        image: "/images/parts/shock_absorber_single.png",
        compatibleYears: [2016, 2021],
        description: "Brand new KYB gas-charged single shock absorber. Restores factory ride quality and eliminates bouncing, bottoming out, and poor handling.",
        inStock: true, condition: "New aftermarket/commercial part", orderFromChina: true
    },
    {
        id: 'part-14', name: "Front Shock Top Mounting", category: "Mechanical / Engine Parts",
        price: 12.00, rating: 4.8, reviews: 90,
        image: "/images/parts/shock_mounting.png",
        compatibleYears: [2015, 2022],
        description: "OEM front strut top mount bearing and plate. Eliminates knocking and clunking from the front suspension on turns and bumps.",
        inStock: true, condition: "New OEM/original part"
    },
    {
        id: 'part-15', name: "Front Ceramic Brake Pads", category: "Mechanical / Engine Parts",
        price: 25.00, rating: 4.6, reviews: 410,
        image: "/images/parts/front_brake_pads.png",
        compatibleYears: [2019, 2025],
        description: "Commercial grade ceramic brake pads for the front axle. Zero noise, low dust, and strong consistent stopping power for daily driving.",
        inStock: true, condition: "New aftermarket/commercial part"
    },
    {
        id: 'part-16', name: "Front Brake Disc Rotor (OEM)", category: "Mechanical / Engine Parts",
        price: 25.00, rating: 4.8, reviews: 260,
        image: "/images/parts/oem_brake_rotor.png",
        compatibleYears: [2015, 2018],
        description: "Brand new OEM vented front brake disc rotor. Machined to exact factory specification for vibration-free, reliable stopping performance.",
        inStock: true, condition: "New OEM/original part"
    },
    {
        id: 'part-17', name: "Rear Brake Pads & Discs Kit", category: "Mechanical / Engine Parts",
        price: 31.75, rating: 4.5, reviews: 180,
        image: "/images/parts/rear_brake_kit.png",
        compatibleYears: [2019, 2022],
        description: "Complete aftermarket rear brake kit with pads and two disc rotors. Great value all-in-one replacement for worn rear brakes.",
        inStock: true, condition: "New aftermarket/commercial part", orderFromChina: true
    },
    {
        id: 'part-18', name: "Stabilizer Sway Bar Link Rod", category: "Mechanical / Engine Parts",
        price: 12.00, rating: 4.7, reviews: 145,
        image: "/images/parts/stabilizer_link_rod.png",
        compatibleYears: [2016, 2023],
        description: "Genuine OEM stabilizer link rod. Eliminates rattling from the front suspension and keeps the car flat and stable during cornering.",
        inStock: true, condition: "New OEM/original part"
    },
    {
        id: 'part-19', name: "Used OEM Front Brake Caliper", category: "Mechanical / Engine Parts",
        price: 30.00, rating: 4.4, reviews: 67,
        image: "/images/parts/brake_caliper.png",
        compatibleYears: [2015, 2020],
        description: "Used original front brake caliper, fully functional without sticking or leaking. Ideal budget replacement for a seized or cracked caliper.",
        inStock: true, condition: "Used original part"
    },
    {
        id: 'part-20', name: "Nissan Power Steering Fluid (1L)", category: "Mechanical / Engine Parts",
        price: 9.33, rating: 4.9, reviews: 520,
        image: "/images/parts/power_steering_fluid.png",
        compatibleYears: [2015, 2018],
        description: "1 Liter genuine Nissan factory power steering fluid. Prevents pump wear and maintains smooth, light steering response.",
        inStock: true, condition: "New OEM/original part"
    },
    {
        id: 'part-21', name: "Power Side Mirror Assembly (Altima)", category: "Mechanical / Engine Parts",
        price: 35.00, rating: 4.5, reviews: 110,
        image: "/images/parts/side_mirror.png",
        compatibleYears: [2019, 2025],
        description: "Aftermarket power-adjustable side mirror assembly in unpainted black. Plug-and-play connection with factory harness.",
        inStock: true, condition: "New aftermarket/commercial part", orderFromChina: true
    },
    {
        id: 'part-22', name: "Inner Fender Cover (Taiwan)", category: "Mechanical / Engine Parts",
        price: 3.00, rating: 4.3, reviews: 340,
        image: "/images/parts/fender_cover.png",
        compatibleYears: [2015, 2022],
        description: "Black plastic inner fender wheel well liner. Direct bolt-on replacement to protect the engine bay from water and road debris.",
        inStock: true, condition: "New aftermarket/commercial part", orderFromChina: true
    },
    {
        id: 'part-23', name: "Used Front Bumper Cover", category: "Mechanical / Engine Parts",
        price: 45.00, rating: 4.1, reviews: 28,
        image: "/images/parts/front_bumper_used.png",
        compatibleYears: [2019, 2022],
        description: "Original used front bumper cover in unpainted gray plastic. May have minor scuffs, perfect condition for a respray.",
        inStock: true, condition: "Used original part"
    },
    {
        id: 'part-24', name: "Windshield Wiper Corner Covers", category: "Mechanical / Engine Parts",
        price: 6.00, rating: 4.4, reviews: 85,
        image: "/images/parts/wiper_corner_covers.png",
        compatibleYears: [2015, 2018],
        description: "Small plastic cowl corner trim pieces that sit beside the windshield at the base of the wipers. Taiwan aftermarket replacement pair.",
        inStock: true, condition: "New aftermarket/commercial part"
    },
    {
        id: 'part-25', name: "Nissan Front Grille Emblem Badge", category: "Mechanical / Engine Parts",
        price: 15.00, rating: 4.8, reviews: 130,
        image: "/images/parts/nissan_front_emblem.png",
        compatibleYears: [2019, 2025],
        description: "Genuine OEM chrome Nissan N badge emblem for the front radiator grille. Direct clip-on fit with no drilling required.",
        inStock: true, condition: "New OEM/original part"
    },
    {
        id: 'part-26', name: "Used Trunk Lid / Tailgate", category: "Mechanical / Engine Parts",
        price: 75.00, rating: 4.5, reviews: 14,
        image: "/images/parts/trunk_lid_used.png",
        compatibleYears: [2016, 2018],
        description: "Used original metal trunk lid in straight condition with no major dents. Painted silver, ready for color-match if needed.",
        inStock: true, condition: "Used original part"
    },

    // Interior / Car Accessories and Parts
    {
        id: 'part-27', name: "Master Power Window Switch", category: "Interior / Car Accessories and Parts",
        price: 12.00, rating: 4.6, reviews: 310,
        image: "/images/parts/window_switch.png",
        compatibleYears: [2015, 2020],
        description: "Commercial grade driver-side master window control switch panel. All 4 window buttons included. Direct plug-in to factory harness.",
        inStock: true, condition: "New aftermarket/commercial part"
    },
    {
        id: 'part-28', name: "Used Factory OEM Radio Unit", category: "Interior / Car Accessories and Parts",
        price: 45.00, rating: 4.3, reviews: 55,
        image: "/images/parts/used_radio_unit.png",
        compatibleYears: [2015, 2018],
        description: "Original Nissan factory head unit radio extracted from a wrecked vehicle. Fully functional for stock radio replacement.",
        inStock: true, condition: "Used original part"
    },
    {
        id: 'part-29', name: "Transmission Control Module (TCM)", category: "Interior / Car Accessories and Parts",
        price: 100.00, rating: 4.7, reviews: 40,
        image: "/images/parts/transmission_computer.png",
        compatibleYears: [2016, 2018],
        description: "Used original Nissan Altima transmission computer (ECU/TCM). Requires VIN-specific reprogramming at a dealer. Fixes shifting faults.",
        inStock: true, condition: "Used original part"
    },
    {
        id: 'part-30', name: "Dashboard Center Trim Cover", category: "Interior / Car Accessories and Parts",
        price: 12.00, rating: 4.8, reviews: 120,
        image: "/images/parts/dashboard_trim_cover.png",
        compatibleYears: [2019, 2022],
        description: "Brand new OEM glossy plastic center dashboard trim panel. Snaps perfectly into factory mounts to replace cracked or sun-faded pieces.",
        inStock: true, condition: "New OEM/original part"
    },
    {
        id: 'part-31', name: "Overhead Console DVD Flip Screen", category: "Interior / Car Accessories and Parts",
        price: 170.00, rating: 4.5, reviews: 75,
        image: "/images/parts/overhead_dvd_screen.png",
        compatibleYears: [2015, 2025],
        description: "Aftermarket fold-down overhead DVD monitor for rear passengers. Includes remote control. Universal fit for most sedans.",
        inStock: true, condition: "New aftermarket/commercial part", orderFromChina: true
    },
    {
        id: 'part-32', name: "Used Complete Dashboard Assembly", category: "Interior / Car Accessories and Parts",
        price: 150.00, rating: 4.6, reviews: 20,
        image: "/images/parts/dashboard_assembly_used.png",
        compatibleYears: [2015, 2018],
        description: "Full used original dashboard assembly with all vents and trims intact. Ideal for replacing an airbag-deployed or cracked dash.",
        inStock: true, condition: "Used original part"
    },
    {
        id: 'part-33', name: "10-Inch Android Navigation Touchscreen", category: "Interior / Car Accessories and Parts",
        price: 110.00, rating: 4.5, reviews: 245,
        image: "/images/parts/aftermarket_android_screen.png",
        compatibleYears: [2015, 2018],
        description: "Aftermarket 10-inch Android display. Supports Apple CarPlay, Android Auto, GPS, and Bluetooth. Replaces the factory infotainment unit.",
        inStock: true, condition: "New aftermarket/commercial part", orderFromChina: true
    },
    {
        id: 'part-34', name: "OEM All-Weather Rubber Floor Mats", category: "Interior / Car Accessories and Parts",
        price: 48.00, rating: 4.9, reviews: 310,
        image: "/images/parts/oem_floor_mats.png",
        compatibleYears: [2019, 2025],
        description: "Genuine Nissan heavy-duty rubber floor mats with raised lips. Laser-measured fit to protect carpeting from mud, sand, and spills in Oman.",
        inStock: true, condition: "New OEM/original part"
    }
];
