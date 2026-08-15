// Centralized Mock Data for WorkForceU India

export const SKILL_LEVELS = [
  { level: 0, title: "Untrained", description: "Entry-level novice with no formal technical training." },
  { level: 1, title: "Trainee", description: "Enrolled in structured digital coursework & basic workshops." },
  { level: 2, title: "Assistant", description: "Completed digital training, undergoing verified on-site apprenticeship." },
  { level: 3, title: "Skilled Worker", description: "Certified tradesperson capable of independent job execution." },
  { level: 4, title: "Senior Worker", description: "Experienced specialist with proven track record & quality rating." },
  { level: 5, title: "Supervisor", description: "Team leader authorized to supervise crews & verify trainee logs." },
  { level: 6, title: "Contractor", description: "Master professional managing multi-trade projects & large crews." },
];

export const SERVICE_CATEGORIES = [
  { id: "electrician", name: "Electrician", icon: "Zap", count: "3,420 Workers", baseRate: "₹650/day", description: "Conduit wiring, switchboards, MCBs, heavy appliances, single & 3-phase." },
  { id: "mason", name: "Mason", icon: "BrickWall", count: "4,180 Workers", baseRate: "₹750/day", description: "Brickwork, plastering, tile laying, RCC slab casting, stone masonry." },
  { id: "plumber", name: "Plumber", icon: "Wrench", count: "2,890 Workers", baseRate: "₹600/day", description: "PPR/CPVC piping, sanitary fittings, pump installations, leak detection." },
  { id: "painter", name: "Painter", icon: "Paintbrush", count: "2,150 Workers", baseRate: "₹600/day", description: "Interior emulsion, exterior weatherproof coats, wood polish, waterproofing." },
  { id: "carpenter", name: "Carpenter", icon: "Hammer", count: "1,940 Workers", baseRate: "₹800/day", description: "Modular cabinetry, doors, window frames, custom wooden furniture." },
  { id: "driver", name: "Driver", icon: "Car", count: "3,100 Workers", baseRate: "₹700/day", description: "Commercial transport, heavy machinery, private transit, verified licenses." },
  { id: "labourer", name: "General Labourer", icon: "HardHat", count: "6,800 Workers", baseRate: "₹500/day", description: "Material handling, site clearing, digging, scaffolding assistance." },
  { id: "contractor", name: "Project Contractor", icon: "Users", count: "890 Contractors", baseRate: "₹2,500/day", description: "Turnkey project management, crew deployment, blueprint compliance." },
];

export const MOCK_WORKERS = [
  {
    id: "w-101",
    name: "Rameshwar Sharma",
    trade: "Electrician",
    level: 4,
    levelTitle: "Senior Worker",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces&q=80",
    verified: true,
    rating: 4.88,
    reviewsCount: 142,
    jobsCompleted: 310,
    experienceYears: 7,
    dailyRate: 950,
    hourlyRate: 150,
    location: "Bengaluru, Karnataka",
    availability: "Available Today",
    isAvailable: true,
    phone: "+91 98451 23890",
    bio: "Senior licensed residential & industrial electrician with 7+ years of experience across South Bengaluru. Specialized in 3-phase wiring, smart home automation, and distribution board troubleshooting.",
    skills: ["3-Phase Power Systems", "DB Dressing & Inverter Setup", "Conduit Concealed Piping", "Fault Diagnostics", "Safety Compliance"],
    apprenticeshipHours: 320,
    certifications: [
      { name: "National Trade Certificate (NTC) - Electrician", issuer: "NCVT India", year: "2019", verified: true },
      { name: "WorkForceU Level 4 Senior Certification", issuer: "WorkForceU India", year: "2024", verified: true },
      { name: "Industrial High-Voltage Safety Protocol", issuer: "NSDC", year: "2022", verified: true }
    ],
    jobHistory: [
      { title: "Complete Villa Rewiring & DB Setup", client: "Vikram Malhotra", date: "Jan 2026", duration: "4 days", rating: 5 },
      { title: "Commercial Office Floor Lighting Fitout", client: "Nexus Workspaces", date: "Dec 2025", duration: "8 days", rating: 4.9 },
      { title: "Solar Inverter & Battery Grid Connection", client: "Pooja Reddy", date: "Nov 2025", duration: "1 day", rating: 5 }
    ],
    reviews: [
      { author: "Vikram Malhotra", date: "18 Jan 2026", rating: 5, comment: "Rameshwar was extremely punctual, professional and carried proper safety equipment. Completed all conduit wiring flawlessly." },
      { author: "Suresh Gupta", date: "02 Jan 2026", rating: 4.8, comment: "Quick fault identification in our kitchen circuit breaker. Fixed within 2 hours. Very reasonable charges." }
    ]
  },
  {
    id: "w-102",
    name: "Mohammad Arif",
    trade: "Mason",
    level: 5,
    levelTitle: "Supervisor",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces&q=80",
    verified: true,
    rating: 4.92,
    reviewsCount: 189,
    jobsCompleted: 450,
    experienceYears: 11,
    dailyRate: 1400,
    hourlyRate: 200,
    location: "Delhi NCR (Noida/South Delhi)",
    availability: "Available Tomorrow",
    isAvailable: true,
    phone: "+91 98110 44921",
    bio: "Master mason and site supervisor with over a decade of hands-on structural construction expertise. Has led 15+ building crews for residential bungalows and commercial complexes.",
    skills: ["RCC Slab Casting", "Brickwork & Plastering Alignment", "Granite & Italian Marble Laying", "Foundation Waterproofing", "Crew Management"],
    apprenticeshipHours: 400,
    certifications: [
      { name: "Master Masonry & Structural Safety", issuer: "CSDCI", year: "2018", verified: true },
      { name: "WorkForceU Level 5 Supervisor License", issuer: "WorkForceU India", year: "2023", verified: true }
    ],
    jobHistory: [
      { title: "G+2 Residential Boundary & Brickwork", client: "Anand Singhania", date: "Feb 2026", duration: "14 days", rating: 5 },
      { title: "Italian Marble Flooring (3,200 sq.ft)", client: "Kunal Verma", date: "Jan 2026", duration: "10 days", rating: 4.9 }
    ],
    reviews: [
      { author: "Anand Singhania", date: "05 Feb 2026", rating: 5, comment: "Arif supervised 6 masons with outstanding precision. Wall plumb lines were 100% straight and site was cleaned every evening." }
    ]
  },
  {
    id: "w-103",
    name: "Deepak Chauhan",
    trade: "Plumber",
    level: 3,
    levelTitle: "Skilled Worker",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop&crop=faces&q=80",
    verified: true,
    rating: 4.75,
    reviewsCount: 88,
    jobsCompleted: 195,
    experienceYears: 4,
    dailyRate: 750,
    hourlyRate: 120,
    location: "Mumbai (Andheri / Bandra)",
    availability: "Available Today",
    isAvailable: true,
    phone: "+91 97690 12837",
    bio: "Certified plumber specializing in high-pressure CPVC/PPR pipeline fittings, sanitary fixtures, diverters, and overhead water tank booster systems.",
    skills: ["CPVC & PPR Hot/Cold Piping", "Concealed Diverters & Wall Mixers", "Water Tank & Pressure Booster Pumps", "Drainage Slope Laying"],
    apprenticeshipHours: 300,
    certifications: [
      { name: "ITI Plumbing Trade Certificate", issuer: "DGT Maharashtra", year: "2021", verified: true },
      { name: "WorkForce Level 3 Skilled Plumber", issuer: "WorkForceU India", year: "2024", verified: true }
    ],
    jobHistory: [
      { title: "Master Bathroom Concealed Diverter Installation", client: "Sneha Kapadia", date: "Jan 2026", duration: "2 days", rating: 4.8 },
      { title: "Apartment Water Line Overhaul", client: "Green Meadows CHS", date: "Dec 2025", duration: "3 days", rating: 4.7 }
    ],
    reviews: [
      { author: "Sneha Kapadia", date: "14 Jan 2026", rating: 5, comment: "Super neat work. Replaced all old corroded GI pipes with modern CPVC without damaging bathroom tiles unnecessarily." }
    ]
  },
  {
    id: "w-104",
    name: "Sunil Kumar Das",
    trade: "Painter",
    level: 3,
    levelTitle: "Skilled Worker",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=faces&q=80",
    verified: true,
    rating: 4.80,
    reviewsCount: 96,
    jobsCompleted: 220,
    experienceYears: 5,
    dailyRate: 700,
    hourlyRate: 110,
    location: "Kolkata (Salt Lake / New Town)",
    availability: "Available This Week",
    isAvailable: true,
    phone: "+91 98301 77654",
    bio: "Skilled surface preparation and texture painting expert. Experienced in putty scraping, primer application, waterproofing, and duco polish.",
    skills: ["Wall Putty & Surface Leveling", "Royale Luxury Emulsion & Texture", "Exterior Damp-Proof Coating", "PU & Melamine Wood Polish"],
    apprenticeshipHours: 300,
    certifications: [
      { name: "WorkForce Level 3 Certified Painter", issuer: "WorkForce India", year: "2023", verified: true }
    ],
    jobHistory: [
      { title: "3BHK Full Interior Painting & Texture Wall", client: "Debashis Sen", date: "Feb 2026", duration: "6 days", rating: 5 }
    ],
    reviews: [
      { author: "Debashis Sen", date: "04 Feb 2026", rating: 5, comment: "Smooth finish and very fast masking of furniture. No paint splatters on floors." }
    ]
  },
  {
    id: "w-105",
    name: "Gurpreet Singh",
    trade: "Carpenter",
    level: 4,
    levelTitle: "Senior Worker",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=faces&q=80",
    verified: true,
    rating: 4.90,
    reviewsCount: 115,
    jobsCompleted: 260,
    experienceYears: 8,
    dailyRate: 1100,
    hourlyRate: 180,
    location: "Chandigarh / Mohali",
    availability: "Available Tomorrow",
    isAvailable: true,
    phone: "+91 98722 55431",
    bio: "Artisan carpenter and modular kitchen installer. Skilled with CNC cut boards, soft-close hydraulic hardware, veneers, and custom teakwood carving.",
    skills: ["Modular Kitchen Assembly", "Veneer & Laminate Pressing", "Hydraulic Soft-Close Hinges", "Solid Teak Door Frames"],
    apprenticeshipHours: 350,
    certifications: [
      { name: "Furniture & Fittings Guild Certificate", issuer: "FFSC India", year: "2020", verified: true },
      { name: "WorkForceU Level 4 Senior Carpenter", issuer: "WorkForceU India", year: "2024", verified: true }
    ],
    jobHistory: [
      { title: "Complete Modular Kitchen & Wardrobe Setup", client: "Jaspreet Kaur", date: "Jan 2026", duration: "7 days", rating: 5 }
    ],
    reviews: [
      { author: "Jaspreet Kaur", date: "22 Jan 2026", rating: 5, comment: "Exceptional accuracy and precision alignments for all soft-close drawers." }
    ]
  },
  {
    id: "w-106",
    name: "Ajay Devendra Rao",
    trade: "Contractor",
    level: 6,
    levelTitle: "Contractor",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&h=300&fit=crop&crop=faces&q=80",
    verified: true,
    rating: 4.96,
    reviewsCount: 240,
    jobsCompleted: 580,
    experienceYears: 15,
    dailyRate: 3000,
    hourlyRate: 400,
    location: "Hyderabad (Gachibowli / Madhapur)",
    availability: "Available Today",
    isAvailable: true,
    phone: "+91 99887 76655",
    bio: "Licensed civil works contractor heading dynamic multi-trade crews across Telangana. Manages end-to-end site logistics, safety protocols, and milestone deliveries.",
    skills: ["Turnkey Civil Execution", "Multi-trade Crew Orchestration", "Site Safety Management", "Govt Building Code Compliance", "Material Optimization"],
    apprenticeshipHours: 500,
    certifications: [
      { name: "Registered Class-A Civil Contractor", issuer: "Govt of Telangana", year: "2016", verified: true },
      { name: "WorkForceU Level 6 Master Contractor", issuer: "WorkForce India", year: "2023", verified: true }
    ],
    jobHistory: [
      { title: "Commercial IT Park Cafeteria Fitout", client: "Cyient Tech Park", date: "Jan 2026", duration: "25 days", rating: 5 }
    ],
    reviews: [
      { author: "G. Venkatesh", date: "29 Jan 2026", rating: 5, comment: "Ajay organized 20 workers seamlessly and finished the turnkey floor renovation 3 days ahead of deadline." }
    ]
  },
  {
    id: "w-107",
    name: "Mukesh Yadav",
    trade: "Driver",
    level: 3,
    levelTitle: "Skilled Worker",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces&q=80",
    verified: true,
    rating: 4.82,
    reviewsCount: 78,
    jobsCompleted: 340,
    experienceYears: 6,
    dailyRate: 800,
    hourlyRate: 120,
    location: "Delhi NCR (Gurugram / West Delhi)",
    availability: "Available Today",
    isAvailable: true,
    phone: "+91 98188 33219",
    bio: "Experienced heavy and commercial transport driver with valid commercial badge. Safe driving record across interstate highway routes.",
    skills: ["Heavy Transport Vehicle (HTV)", "Commercial Transit Protocols", "Preventive Vehicle Maintenance", "GPS Route Navigation"],
    apprenticeshipHours: 300,
    certifications: [
      { name: "Commercial Heavy Transport License", issuer: "Delhi Transport Authority", year: "2019", verified: true },
      { name: "WorkForce Certified Driver Level 3", issuer: "WorkForce India", year: "2024", verified: true }
    ],
    jobHistory: [
      { title: "Interstate Construction Material Transit", client: "Shree Ram Infratech", date: "Feb 2026", duration: "3 days", rating: 5 }
    ],
    reviews: [
      { author: "Manoj Bansal", date: "06 Feb 2026", rating: 4.8, comment: "Very cautious driver and arrived exactly on time for loading." }
    ]
  },
  {
    id: "w-108",
    name: "Bablu Paswan",
    trade: "Trainee (Assistant)",
    level: 2,
    levelTitle: "Assistant",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=faces&q=80",
    verified: true,
    rating: 4.65,
    reviewsCount: 24,
    jobsCompleted: 45,
    experienceYears: 1,
    dailyRate: 550,
    hourlyRate: 80,
    location: "Pune (Hinjewadi / Kothrud)",
    availability: "Available Today",
    isAvailable: true,
    phone: "+91 91234 56780",
    bio: "Hardworking trainee electrical assistant completing practical apprenticeship under Supervisor guidance. Has cleared digital safety exam with 92%.",
    skills: ["Basic Wire Stripping & Jointing", "Conduit Channel Cutting", "Multimeter Voltage Testing", "Site Safety Setup"],
    apprenticeshipHours: 210,
    certifications: [
      { name: "Digital Electrical Safety Module Pass", issuer: "WorkForce India", year: "2025", verified: true }
    ],
    jobHistory: [
      { title: "Apartment Rewiring Assistance (Under Supervisor)", client: "Rameshwar Sharma", date: "Jan 2026", duration: "5 days", rating: 4.8 }
    ],
    reviews: [
      { author: "Rameshwar Sharma (Lead Pro)", date: "15 Jan 2026", rating: 5, comment: "Bablu is fast, eager to learn, and always adheres to safety standards." }
    ]
  }
];

export const MOCK_BOOKINGS = [
  {
    id: "BK-8091",
    workerId: "w-101",
    workerName: "Raj Sharma",
    workerTrade: "Electrician",
    workerLevel: "Level 4 (Senior)",
    workerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces&q=80",//
    customerName: "Pooja ",
    jobTitle: "Main Distribution Board Replacement & Load Balancing",
    jobDescription: "Replace 32A outdated fuse board with modern 63A 4-pole MCB box and distribute heavy AC loads evenly.",
    date: "2026-08-12",
    timeSlot: "09:30 AM - 01:30 PM",
    duration: "4 Hours",
    price: 1200,
    location: "Indiranagar, Bengaluru, KA 560038",
    status: "Accepted",
    paymentStatus: "Escrow Secured",
    rating: null
  },
  {
    id: "BK-8084",
    workerId: "w-102",
    workerName: "Arif",
    workerTrade: "Mason",
    workerLevel: "Level 5 (Supervisor)",
    workerPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces&q=80",
    customerName: "Aditya",
    jobTitle: "Boundary Wall Rebuilding & Cement Plastering",
    jobDescription: "Construct 45 ft long brick wall with RCC pillar reinforcement and smooth waterproof plaster finish.",
    date: "2026-08-15",
    timeSlot: "08:00 AM - 05:00 PM",
    duration: "Full Day (8 Hrs)",
    price: 2800,
    location: "Sector 50, Noida, UP 201301",
    status: "Pending",
    paymentStatus: "Pending Authorization",
    rating: null
  },
  {
    id: "BK-8072",
    workerId: "w-103",
    workerName: "Deepak Chauhan",
    workerTrade: "Plumber",
    workerLevel: "Level 3 (Skilled)",
    workerPhoto: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop&crop=faces&q=80",
    customerName: "Kunal Verma",
    jobTitle: "Overhead Water Tank 1HP Booster Pump Fitting",
    jobDescription: "Install automatic pressure sensor booster pump and check line pressure in 3 bathrooms.",
    date: "2026-08-09",
    timeSlot: "11:00 AM - 02:00 PM",
    duration: "3 Hours",
    price: 950,
    location: "Bandra West, Mumbai, MH 400050",
    status: "In Progress",
    paymentStatus: "Escrow Secured",
    rating: null
  },
  {
    id: "BK-8060",
    workerId: "w-104",
    workerName: "Sunil",
    workerTrade: "Painter",
    workerLevel: "Level 3 (Skilled)",
    workerPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=faces&q=80",
    customerName: "Meera",
    jobTitle: "Living Room Feature Wall Accent Stencil & Texture",
    jobDescription: "Apply 2 coats primer, textured royal finish and metallic gold highlights on 12x10 living room wall.",
    date: "2026-08-04",
    timeSlot: "10:00 AM - 06:00 PM",
    duration: "Full Day",
    price: 1400,
    location: "Salt Lake Sector II, Kolkata, WB 700091",
    status: "Completed",
    paymentStatus: "Paid",
    rating: 5
  },
  {
    id: "BK-8051",
    workerId: "w-105",
    workerName: "Gurpreet",
    workerTrade: "Carpenter",
    workerLevel: "Level 4 (Senior)",
    workerPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=faces&q=80",
    customerName: "Harsh",
    jobTitle: "Custom Soft-Close Wardrobe Sliding Shutter Fixes",
    jobDescription: "Realign top-hung sliding tracks and replace hydraulic dampers for 8-ft wardrobe.",
    date: "2026-08-01",
    timeSlot: "02:00 PM - 05:00 PM",
    duration: "3 Hours",
    price: 1100,
    location: "Phase 7, Mohali, PB 160062",
    status: "Completed",
    paymentStatus: "Paid",
    rating: 4.8
  }
];

export const TEAM_PRESETS = [
  {
    id: "preset-house-construction",
    name: "House Construction Crew",
    description: "Full-scale building crew for civil framework, brickwork, and initial piping.",
    defaultDurationDays: 14,
    roles: [
      { trade: "Contractor", level: 6, title: "Project Contractor", count: 1, dailyRate: 2500 },
      { trade: "Mason", level: 5, title: "Lead Mason (Supervisor)", count: 2, dailyRate: 1400 },
      { trade: "Labourer", level: 1, title: "General Labourers", count: 5, dailyRate: 500 },
      { trade: "Electrician", level: 4, title: "Conduit Electrician", count: 1, dailyRate: 950 },
      { trade: "Plumber", level: 3, title: "Drainage Plumber", count: 1, dailyRate: 750 }
    ]
  },
  {
    id: "preset-residential-interior",
    name: "Interior Renovation Crew",
    description: "Complete team for modular carpentry, interior painting, and lighting fitouts.",
    defaultDurationDays: 7,
    roles: [
      { trade: "Supervisor", level: 5, title: "Interior Supervisor", count: 1, dailyRate: 1800 },
      { trade: "Carpenter", level: 4, title: "Modular Carpenters", count: 2, dailyRate: 1100 },
      { trade: "Painter", level: 3, title: "Emulsion Painters", count: 3, dailyRate: 700 },
      { trade: "Electrician", level: 3, title: "Lighting Electrician", count: 1, dailyRate: 750 },
      { trade: "Labourer", level: 1, title: "Site Assistants", count: 2, dailyRate: 500 }
    ]
  },
  {
    id: "preset-commercial-fitout",
    name: "Commercial Electrical Fit-out",
    description: "Heavy-duty 3-phase wiring, cable trays, panel boards and server room cabling.",
    defaultDurationDays: 5,
    roles: [
      { trade: "Supervisor", level: 5, title: "Electrical Supervisor", count: 1, dailyRate: 1800 },
      { trade: "Electrician", level: 4, title: "Senior Electricians", count: 3, dailyRate: 950 },
      { trade: "Assistant", level: 2, title: "Trainee Wiremen", count: 3, dailyRate: 550 }
    ]
  }
];

export const AVAILABLE_ROLES_CATALOG = [
  { trade: "Contractor", level: 6, title: "Project Contractor", dailyRate: 2500 },
  { trade: "Supervisor", level: 5, title: "Trade Supervisor", dailyRate: 1800 },
  { trade: "Mason", level: 4, title: "Senior Mason", dailyRate: 1200 },
  { trade: "Electrician", level: 4, title: "Senior Electrician", dailyRate: 950 },
  { trade: "Carpenter", level: 4, title: "Senior Carpenter", dailyRate: 1100 },
  { trade: "Plumber", level: 3, title: "Skilled Plumber", dailyRate: 750 },
  { trade: "Painter", level: 3, title: "Skilled Painter", dailyRate: 700 },
  { trade: "Driver", level: 3, title: "Commercial Driver", dailyRate: 800 },
  { trade: "Assistant", level: 2, title: "Trainee Assistant", dailyRate: 550 },
  { trade: "Labourer", level: 1, title: "General Labourer", dailyRate: 500 },
];

export const TRAINING_MODULES = [
  {
    id: "mod-1",
    title: "Electrical Wiring Basics & Safety Protocols",
    trade: "Electrician",
    levelTarget: 2,
    duration: "4 Hours (6 Lessons)",
    progress: 100,
    status: "Completed",
    thumbnail: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80",
    description: "Learn Indian Standard IS 732 wiring rules, phase-neutral-earth color coding, insulation resistance, and single-phase domestic layouts.",
    lessons: [
      { id: "l1", title: "Indian Color Coding Standards (Red/Yellow/Blue/Black/Green)", duration: "25 min", completed: true },
      { id: "l2", title: "Conduit Sizing & Wire Gauge Selection (1.5 sq mm vs 4.0 sq mm)", duration: "40 min", completed: true },
      { id: "l3", title: "Earthing vs Neutral: Differences and Safety Grounding", duration: "35 min", completed: true },
      { id: "l4", title: "MCB, ELCB & RCCB Tripping Mechanisms", duration: "45 min", completed: true },
      { id: "l5", title: "Practical Wire Stripping & Crimping Techniques", duration: "35 min", completed: true },
      { id: "l6", title: "Module 1 Review & Safety Verification Checklist", duration: "30 min", completed: true }
    ]
  },
  {
    id: "mod-2",
    title: "Workplace Safety & Hazard Protection (OSHA Norms)",
    trade: "General Construction",
    levelTarget: 2,
    duration: "3 Hours (5 Lessons)",
    progress: 75,
    status: "In Progress",
    thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80",
    description: "Essential PPE standards, working at heights, electrical lock-out tag-out (LOTO), scaffold stability, and fire extinguisher operations.",
    lessons: [
      { id: "l7", title: "PPE Checklist: Helmets, Steel-Toe Boots & Insulated Gloves", duration: "30 min", completed: true },
      { id: "l8", title: "Ladder & Scaffolding Safety at Heights (>2 Meters)", duration: "40 min", completed: true },
      { id: "l9", title: "Electrical Isolation & Lock-Out Tag-Out (LOTO) Procedures", duration: "35 min", completed: true },
      { id: "l10", title: "First Aid for Burns, Shocks & Structural Cuts", duration: "35 min", completed: false },
      { id: "l11", title: "Site Hazard Hazard Identification Practical Test", duration: "30 min", completed: false }
    ]
  },
  {
    id: "mod-3",
    title: "Hand & Power Tools Masterclass",
    trade: "Multi-trade",
    levelTarget: 2,
    duration: "5 Hours (7 Lessons)",
    progress: 30,
    status: "In Progress",
    thumbnail: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&q=80",
    description: "Rotary hammers, angle grinders, pipe threading dies, multimeters, and laser levels: maintenance and safe operation.",
    lessons: [
      { id: "l12", title: "Rotary Hammer & SDS Bit Selection for Concrete Drilling", duration: "45 min", completed: true },
      { id: "l13", title: "Angle Grinder Blade Types: Cutting, Grinding & Polishing", duration: "40 min", completed: true },
      { id: "l14", title: "Digital Multimeter Operations: Voltage, Continuity & Amperage", duration: "50 min", completed: false },
      { id: "l15", title: "Laser Level & Plumb-bob Precision Alignment", duration: "40 min", completed: false },
      { id: "l16", title: "Pipe Threading & Sealant Tape Application", duration: "40 min", completed: false },
      { id: "l17", title: "Tool Battery Care & Torque Clutch Settings", duration: "35 min", completed: false },
      { id: "l18", title: "Tool Maintenance Logbook Protocols", duration: "30 min", completed: false }
    ]
  },
  {
    id: "mod-4",
    title: "Switchboard & Distribution Board (DB) Fitting",
    trade: "Electrician",
    levelTarget: 3,
    duration: "6 Hours (8 Lessons)",
    progress: 0,
    status: "Not Started",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80",
    description: "Concealed metal box anchoring, modular grid plates, 2-way staircase switches, fan speed regulators, and heavy AC socket wiring.",
    lessons: [
      { id: "l19", title: "Concealed Box Grouting & Level Balancing", duration: "45 min", completed: false },
      { id: "l20", title: "Modular Switch & Socket Snapping Mechanics", duration: "35 min", completed: false },
      { id: "l21", title: "Staircase 2-Way Switch Circuit Wiring", duration: "45 min", completed: false },
      { id: "l22", title: "16A Power Socket with Indicator & Fuse", duration: "40 min", completed: false },
      { id: "l23", title: "Main DB Incomer Busbar & Neutral Link Balancing", duration: "60 min", completed: false }
    ]
  },
  {
    id: "mod-5",
    title: "Blueprint Reading & Circuit Schematics",
    trade: "Electrician",
    levelTarget: 3,
    duration: "4.5 Hours (6 Lessons)",
    progress: 0,
    status: "Not Started",
    thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=80",
    description: "Architectural drawings, conduit path symbols, load calculation schedules, and single line diagrams (SLD).",
    lessons: [
      { id: "l24", title: "Architectural Floor Plan Electrical Legend & Symbols", duration: "40 min", completed: false },
      { id: "l25", title: "Single Line Diagram (SLD) Tracing", duration: "50 min", completed: false },
      { id: "l26", title: "Conduit Routing & Ceiling Slab Point Coordinates", duration: "45 min", completed: false }
    ]
  }
];

export const MOCK_QUIZ = {
  id: "quiz-elec-l2",
  title: "Level 2 Certification Exam — Electrical Fundamentals & Site Safety",
  trade: "Electrician",
  totalQuestions: 5,
  passingScore: 80, // 4 out of 5
  timeLimitMinutes: 10,
  questions: [
    {
      id: 1,
      question: "According to standard Indian Electrical Code (IS 732), what is the mandatory wire insulation color used for Earth / Grounding connection?",
      options: [
        "Solid Red or Brown",
        "Solid Black or Blue",
        "Solid Green or Green with Yellow Stripe",
        "Solid White or Grey"
      ],
      correctAnswer: 2,
      explanation: "Green or Green with a Yellow stripe is universally designated as the Protective Earth conductor in Indian electrical installations."
    },
    {
      id: 2,
      question: "What is the primary function of a Residual Current Circuit Breaker (RCCB) installed in a domestic switchboard?",
      options: [
        "To protect devices against high voltage lightning strikes",
        "To instantly trip and disconnect power when current leakage to ground is detected, preventing fatal electric shocks",
        "To increase current flow when heavy appliances like air conditioners turn on",
        "To measure total electrical units consumed per month for billing"
      ],
      correctAnswer: 1,
      explanation: "An RCCB continuously senses current balance between Phase and Neutral. A mismatch (leakage to ground) above 30mA immediately trips the switch to prevent human electrocution."
    },
    {
      id: 3,
      question: "Which copper wire cross-sectional gauge is standard for connecting heavy residential loads such as 1.5 Ton ACs or 25L Geysers?",
      options: [
        "1.0 sq mm (0.5 mm diameter)",
        "1.5 sq mm",
        "4.0 sq mm (or minimum 2.5 sq mm with 16A/20A MCB)",
        "0.75 sq mm"
      ],
      correctAnswer: 2,
      explanation: "Heavy inductive and heating loads exceeding 1500W–2500W require minimum 4.0 sq mm (or heavy-duty 2.5 sq mm) to prevent overheating and fire hazard."
    },
    {
      id: 4,
      question: "Before performing any wiring maintenance or MCB replacement, what is the mandatory safety step an electrician must follow?",
      options: [
        "Turn off only the local bedroom wall switch",
        "Isolate the Main Incomer Isolator, apply Lock-Out Tag-Out (LOTO), and verify zero voltage with an insulated tester/multimeter",
        "Wear rubber slippers and touch the neutral wire with bare fingers to check",
        "Pour water on the earth pit before switching off"
      ],
      correctAnswer: 1,
      explanation: "Complete isolation at the main breaker plus physical zero-voltage verification with a certified tester is mandatory before touching any live conductor."
    },
    {
      id: 5,
      question: "In a 2-way staircase lighting switch circuit, how many traveler wires run between the two SPDT (Single Pole Double Throw) switches?",
      options: [
        "1 Wire",
        "2 Traveler Wires",
        "4 Wires",
        "Zero wires (wireless only)"
      ],
      correctAnswer: 1,
      explanation: "A standard two-way staircase switching configuration utilizes two traveler wires connecting terminal 1 to 1 and terminal 2 to 2 between both switches."
    }
  ]
};

export const MOCK_APPRENTICESHIP_LOGS = [
  {
    id: "log-501",
    date: "2026-08-08",
    jobTitle: "Apartment Sub-Main DB Installation & Conduit Dressing",
    supervisorName: "Mohammad Arif",
    supervisorLevel: "Level 5 Supervisor",
    supervisorId: "w-102",
    trade: "Electrical / Masonry Assistance",
    hours: 8,
    status: "Approved",
    remarks: "Bablu cut conduit wall grooves with laser precision and assisted in pulling 4 sq mm cables.",
    signedAt: "2026-08-08 18:30"
  },
  {
    id: "log-502",
    date: "2026-08-07",
    jobTitle: "Phase Balancing & Neutral Link Termination at Office Site",
    supervisorName: "Rameshwar Sharma",
    supervisorLevel: "Level 4 Senior",
    supervisorId: "w-101",
    trade: "Electrician",
    hours: 8,
    status: "Approved",
    remarks: "Good understanding of 3-phase color codes. Handled crimping and heat-shrink sleeves safely.",
    signedAt: "2026-08-07 19:15"
  },
  {
    id: "log-503",
    date: "2026-08-05",
    jobTitle: "Earthing Pit Copper Plate & Bentonite Compound Filling",
    supervisorName: "Rameshwar Sharma",
    supervisorLevel: "Level 4 Senior",
    supervisorId: "w-101",
    trade: "Electrician",
    hours: 6,
    status: "Approved",
    remarks: "Excavated 3-meter deep earthing pit and measured earth resistance at 1.8 Ohms with earth tester.",
    signedAt: "2026-08-05 17:00"
  },
  {
    id: "log-504",
    date: "2026-08-04",
    jobTitle: "Concealed Switchboard 12-Module Box Wall Alignment",
    supervisorName: "Mohammad Arif",
    supervisorLevel: "Level 5 Supervisor",
    supervisorId: "w-102",
    trade: "Electrical Assistance",
    hours: 8,
    status: "Pending Approval",
    remarks: "Installed 4 metal boxes with spirit level alignment. Awaiting supervisor inspection tomorrow.",
    signedAt: null
  },
  {
    id: "log-505",
    date: "2026-08-03",
    jobTitle: "Emergency Generator Backup Interlock Switch Wiring",
    supervisorName: "Rameshwar Sharma",
    supervisorLevel: "Level 4 Senior",
    supervisorId: "w-101",
    trade: "Electrician",
    hours: 8,
    status: "Pending Approval",
    remarks: "Assisted in 63A manual changeover switch connections for residential backup generator.",
    signedAt: null
  }
];

export const MOCK_TRAINEE_PROFILE = {
  id: "tr-901",
  name: "Bablu Paswan",
  phone: "+91 91234 56780",
  email: "bablu.paswan@WorkForce.in",
  photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=faces&q=80",
  trade: "Electrician",
  currentLevel: 1,
  currentLevelTitle: "Trainee",
  targetLevel: 2,
  targetLevelTitle: "Assistant",
  verificationStatus: "Verified Trainee",
  subscriptionStatus: "Active Pro Learner (Govt Subsidy PMKVY)",
  subscriptionExpiry: "31 Dec 2026",
  completedHours: 240,
  requiredHours: 300,
  approvedHours: 210,
  pendingHours: 30,
  overallProgress: 80, // %
  quizPassed: true,
  quizScore: 80, // %
  certifications: [
    { id: "cert-01", name: "Foundation in Domestic Electrical Safety", date: "15 Jan 2026", issuer: "WorkForce India", certNo: "WF-EL-2026-9018", status: "Verified" },
    { id: "cert-02", name: "National Apprenticeship Training Enrollment", date: "02 Feb 2026", issuer: "NSDC Skill India", certNo: "NATS-DL-88219", status: "Verified" }
  ]
};

export const MOCK_CERTIFICATION_REQUESTS = [
  {
    id: "req-101",
    traineeId: "tr-901",
    traineeName: "awani",
    traineePhoto: "",
    trade: "Electrician",
    currentLevel: 1,
    currentLevelTitle: "Trainee",
    requestedLevel: 2,
    requestedLevelTitle: "Assistant",
    testScore: 80,
    apprenticeshipHoursLogged: 240,
    supervisorRecommendation: "Rameshwar Sharma (Level 4 Senior Worker)",
    submittedDate: "2026-08-08",
    status: "Pending",
    portfolioNotes: "Completed 5 digital modules, passed Level 2 safety examination, and logged 240 verified on-site hours."
  },
  {
    id: "req-102",
    traineeId: "tr-902",
    traineeName: "Gopal Krishna Murthy",
    traineePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces&q=80",
    trade: "Plumber",
    currentLevel: 2,
    currentLevelTitle: "Assistant",
    requestedLevel: 3,
    requestedLevelTitle: "Skilled Worker",
    testScore: 92,
    apprenticeshipHoursLogged: 320,
    supervisorRecommendation: "Deepak Chauhan (Level 3)",
    submittedDate: "2026-08-07",
    status: "Pending",
    portfolioNotes: "Demonstrated master proficiency in concealed shower diverters and pressure booster pump wiring."
  },
  {
    id: "req-103",
    traineeId: "tr-903",
    traineeName: "Rajeshwar Pandey",
    traineePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces&q=80",
    trade: "Mason",
    currentLevel: 3,
    currentLevelTitle: "Skilled Worker",
    requestedLevel: 4,
    requestedLevelTitle: "Senior Worker",
    testScore: 88,
    apprenticeshipHoursLogged: 450,
    supervisorRecommendation: "Mohammad Arif (Level 5 Supervisor)",
    submittedDate: "2026-08-06",
    status: "Pending",
    portfolioNotes: "Successfully led 3 residential slab casting projects with zero defects reported over 12 months."
  },
  {
    id: "req-104",
    traineeId: "tr-904",
    traineeName: "Satish Varma",
    traineePhoto: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop&crop=faces&q=80",
    trade: "Carpenter",
    currentLevel: 2,
    currentLevelTitle: "Assistant",
    requestedLevel: 3,
    requestedLevelTitle: "Skilled Worker",
    testScore: 74,
    apprenticeshipHoursLogged: 290,
    supervisorRecommendation: "Gurpreet Singh (Level 4 Senior)",
    submittedDate: "2026-08-04",
    status: "Approved",
    portfolioNotes: "Approved upon re-examination of soft-close kitchen hardware alignment."
  }
];

export const MOCK_ADMIN_STATS = {
  totalUsers: 14280,
  activeWorkers: 8650,
  activeCustomers: 4920,
  activeTrainees: 710,
  pendingCertifications: 19,
  pendingVerifications: 34,
  activeBookings: 428,
  completedJobsTotal: 28950,
  totalPlatformVolume: "₹1.48 Cr",
  growthRate: "+18.4% this month",
  recentUsers: [
    { name: "Kavita Nair", role: "Customer", location: "Kochi, Kerala", joined: "10 mins ago", status: "Active" },
    { name: "Santosh Yadav", role: "Professional (Mason)", location: "Varanasi, UP", joined: "25 mins ago", status: "Pending Verification" },
    { name: "Amitabh Sen", role: "Trainee (Electrician)", location: "Patna, Bihar", joined: "1 hour ago", status: "Active" },
    { name: "BuildCorp Infrastructure", role: "Customer (Enterprise)", location: "Hyderabad, TS", joined: "3 hours ago", status: "Active" },
    { name: "Virender Chahal", role: "Professional (Driver)", location: "Hisar, Haryana", joined: "5 hours ago", status: "Active" }
  ],
  auditActivity: [
    { action: "Level 4 Senior Upgrade Approved", user: "Gurpreet Singh (Carpenter)", admin: "Admin Ravi", time: "12 mins ago" },
    { action: "Govt PMKVY Trainee Batch Synchronized", user: "42 Trainees Enrolled", admin: "System", time: "45 mins ago" },
    { action: "Escrow Payout Released", user: "BK-8060 to Sunil Kumar Das", admin: "Finance Admin", time: "2 hours ago" },
    { action: "Aadhaar e-KYC Verification Completed", user: "Rameshwar Sharma", admin: "KYC Agent #4", time: "3 hours ago" }
  ]
};
