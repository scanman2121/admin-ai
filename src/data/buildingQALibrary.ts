export interface QAEntry {
    question: string
    answer: string
    category: string
    keywords: string[] // For fuzzy matching
}

export const buildingQALibrary: QAEntry[] = [
    // Building Basics & Access
    {
        question: "What time does the building open?",
        answer: "The building is open Monday–Friday from 6:00 AM to 8:00 PM.",
        category: "Building Basics & Access",
        keywords: ["open", "opening", "hours", "time", "when", "building"]
    },
    {
        question: "What time does the building close?",
        answer: "The exterior doors lock at 8:00 PM, but tenants with mobile access can still enter after hours.",
        category: "Building Basics & Access",
        keywords: ["close", "closing", "lock", "hours", "time", "when"]
    },
    {
        question: "How do I set up mobile access?",
        answer: "Just open the app's \"Mobile Access\" section and tap \"Activate.\" Your phone becomes your badge instantly.",
        category: "Building Basics & Access",
        keywords: ["mobile", "access", "badge", "phone", "setup", "activate", "app"]
    },
    {
        question: "How do I get a visitor pass?",
        answer: "Go to \"Visitors\" in the app, enter your guest's name, and send them the digital pass.",
        category: "Building Basics & Access",
        keywords: ["visitor", "pass", "guest", "invite", "visitor pass"]
    },
    {
        question: "Where do I pick up visitor badges?",
        answer: "Visitors can check in at the lobby desk using the QR code from their invite.",
        category: "Building Basics & Access",
        keywords: ["visitor", "badge", "pick up", "lobby", "check in", "qr code"]
    },
    {
        question: "How do I request after-hours access?",
        answer: "Tap \"Support\" → \"Access Request,\" choose your date and time, and building management will approve it.",
        category: "Building Basics & Access",
        keywords: ["after hours", "after-hours", "access", "request", "late", "evening"]
    },
    
    // Amenities
    {
        question: "What time does the gym open?",
        answer: "The fitness center is open from 5:00 AM to 10:00 PM daily.",
        category: "Amenities",
        keywords: ["gym", "fitness", "center", "open", "hours", "time"]
    },
    {
        question: "Is the gym busy right now?",
        answer: "The app shows real-time occupancy. Right now, it's lightly used.",
        category: "Amenities",
        keywords: ["gym", "busy", "crowded", "occupancy", "full", "capacity"]
    },
    {
        question: "How do I reserve a conference room?",
        answer: "Go to \"Spaces,\" browse available rooms, and tap the time slot you want.",
        category: "Amenities",
        keywords: ["conference", "room", "reserve", "book", "meeting", "space"]
    },
    {
        question: "Are towels provided in the gym?",
        answer: "Yes — fresh towels are available near the entrance.",
        category: "Amenities",
        keywords: ["towels", "gym", "fitness", "provided", "available"]
    },
    {
        question: "Where is the tenant lounge?",
        answer: "It's on the 3rd floor, next to the café and outdoor terrace.",
        category: "Amenities",
        keywords: ["lounge", "tenant", "where", "location", "floor"]
    },
    {
        question: "What amenities are in the building?",
        answer: "Gym, meeting rooms, lounge, rooftop terrace, bike storage, EV charging, and marketplace.",
        category: "Amenities",
        keywords: ["amenities", "what", "features", "facilities", "available"]
    },
    
    // Parking & Transportation
    {
        question: "How much is monthly parking?",
        answer: "Monthly parking starts at $185 per month.",
        category: "Parking & Transportation",
        keywords: ["parking", "monthly", "cost", "price", "how much", "fee"]
    },
    {
        question: "How do I register my vehicle?",
        answer: "Go to \"Parking\" in the app and add your license plate — it's automatic recognition.",
        category: "Parking & Transportation",
        keywords: ["register", "vehicle", "car", "license plate", "parking"]
    },
    {
        question: "Is guest parking available?",
        answer: "Yes — limited guest spots can be reserved in advance in the app.",
        category: "Parking & Transportation",
        keywords: ["guest", "parking", "visitor", "available", "spots"]
    },
    {
        question: "Where is the bike room?",
        answer: "The bike room is in the P1 level adjacent to the elevator bank.",
        category: "Parking & Transportation",
        keywords: ["bike", "bicycle", "room", "storage", "where", "location"]
    },
    {
        question: "What are the EV charging rates?",
        answer: "Charging is $0.25 per kWh, billed through your monthly parking.",
        category: "Parking & Transportation",
        keywords: ["ev", "electric", "charging", "rates", "cost", "price"]
    },
    
    // Food, Retail & Perks
    {
        question: "Which restaurants are open today?",
        answer: "The café is open 7:00 AM–3:00 PM, and the marketplace is open 24/7.",
        category: "Food, Retail & Perks",
        keywords: ["restaurants", "café", "cafe", "open", "today", "food"]
    },
    {
        question: "What time does the café close?",
        answer: "The café closes at 3:00 PM.",
        category: "Food, Retail & Perks",
        keywords: ["café", "cafe", "close", "closing", "time", "hours"]
    },
    {
        question: "Do tenants get any discounts?",
        answer: "Yes — show your app at participating retailers for 10–20% off.",
        category: "Food, Retail & Perks",
        keywords: ["discounts", "discount", "tenants", "retailers", "perks"]
    },
    {
        question: "How do I redeem loyalty points?",
        answer: "Points automatically apply at checkout in the marketplace or café.",
        category: "Food, Retail & Perks",
        keywords: ["loyalty", "points", "redeem", "rewards", "checkout"]
    },
    
    // Community & Events
    {
        question: "What events are happening this week?",
        answer: "A yoga class on Wednesday at noon, a coffee social Thursday morning, and a tasting pop-up on Friday.",
        category: "Community & Events",
        keywords: ["events", "this week", "happening", "schedule", "calendar"]
    },
    {
        question: "How do I RSVP for an event?",
        answer: "Tap the event inside the app and hit \"RSVP.\" You'll receive a confirmation instantly.",
        category: "Community & Events",
        keywords: ["rsvp", "event", "reserve", "sign up", "register"]
    },
    {
        question: "Where is the wellness class being held?",
        answer: "Classes take place in the multi-purpose studio on the 2nd floor.",
        category: "Community & Events",
        keywords: ["wellness", "class", "yoga", "where", "location", "studio"]
    },
    
    // Work Orders & Services
    {
        question: "How do I submit a work order?",
        answer: "Tap \"Work Orders,\" describe the issue, and attach a photo if needed.",
        category: "Work Orders & Services",
        keywords: ["work order", "submit", "request", "maintenance", "repair"]
    },
    {
        question: "What's the status of my maintenance request?",
        answer: "Your request is in progress — the engineering team is scheduled for today.",
        category: "Work Orders & Services",
        keywords: ["status", "maintenance", "request", "work order", "progress"]
    },
    {
        question: "Can I request cleaning for my suite?",
        answer: "Yes — choose \"Janitorial Request\" under Work Orders.",
        category: "Work Orders & Services",
        keywords: ["cleaning", "janitorial", "suite", "request", "clean"]
    },
    {
        question: "How do I report a spill or safety issue?",
        answer: "Use \"Report an Issue\" and mark it as urgent. The onsite team is alerted immediately.",
        category: "Work Orders & Services",
        keywords: ["spill", "safety", "issue", "report", "urgent", "emergency"]
    },
    
    // Security & Policies
    {
        question: "How do I report a lost badge?",
        answer: "Open \"Support,\" choose \"Lost Badge,\" and security will deactivate it and issue a replacement.",
        category: "Security & Policies",
        keywords: ["lost", "badge", "report", "missing", "replace"]
    },
    {
        question: "What's the building's visitor policy?",
        answer: "Visitors must be pre-registered and show a QR code at check-in.",
        category: "Security & Policies",
        keywords: ["visitor", "policy", "rules", "guidelines", "check-in"]
    },
    {
        question: "Are pets allowed?",
        answer: "Pets aren't allowed in tenant spaces, but service animals are welcomed.",
        category: "Security & Policies",
        keywords: ["pets", "dogs", "animals", "allowed", "policy"]
    },
    {
        question: "Where is the Mother's Room?",
        answer: "It's located on the 4th floor near the restrooms and requires an access request in the app.",
        category: "Security & Policies",
        keywords: ["mother", "room", "nursing", "where", "location", "floor"]
    },
    
    // Wayfinding
    {
        question: "How do I get to Suite 1200?",
        answer: "Take the elevator to the 12th floor and turn right — signage will guide you.",
        category: "Wayfinding",
        keywords: ["suite", "how to get", "directions", "where", "find", "location"]
    },
    {
        question: "Where is the nearest restroom?",
        answer: "The nearest restrooms are just past the elevator lobby.",
        category: "Wayfinding",
        keywords: ["restroom", "bathroom", "nearest", "where", "location"]
    },
    {
        question: "Is there an accessible entrance?",
        answer: "Yes — the accessible entrance is on the west side, next to the parking garage walkway.",
        category: "Wayfinding",
        keywords: ["accessible", "entrance", "wheelchair", "ada", "handicap"]
    },
    
    // Smart Building Controls
    {
        question: "Can you lower the temperature in my suite?",
        answer: "Temperature has been adjusted — you should feel it within a few minutes.",
        category: "Smart Building Controls",
        keywords: ["temperature", "thermostat", "cool", "heat", "suite", "adjust"]
    },
    {
        question: "What's the air quality like today?",
        answer: "Air quality is excellent — CO₂ and particulate levels are well within healthy ranges.",
        category: "Smart Building Controls",
        keywords: ["air quality", "air", "quality", "today", "co2", "healthy"]
    },
    
    // Property & Contacts
    {
        question: "Who is the property manager?",
        answer: "The building is managed by the onsite property team, available Monday–Friday.",
        category: "Property & Contacts",
        keywords: ["property manager", "manager", "who", "contact", "management"]
    },
    {
        question: "How do I contact building management?",
        answer: "Use the \"Support\" tab — messages go straight to the management inbox.",
        category: "Property & Contacts",
        keywords: ["contact", "management", "building", "support", "help", "reach"]
    },
    {
        question: "Where can I find my lease documents?",
        answer: "If your company enabled document storage, you'll find them under \"My Workplace.\"",
        category: "Property & Contacts",
        keywords: ["lease", "documents", "find", "where", "storage", "files"]
    },
    {
        question: "Where can I find emergency exits?",
        answer: "Emergency exit maps are available under \"Safety\" in the app and posted on each floor.",
        category: "Property & Contacts",
        keywords: ["emergency", "exits", "safety", "maps", "where", "evacuation"]
    }
]

/**
 * Find the best matching Q&A entry for a user's question
 * Uses keyword matching and simple text similarity
 */
export function findMatchingAnswer(userQuestion: string): string | null {
    const normalizedQuestion = userQuestion.toLowerCase().trim()
    
    // If question is empty, return null
    if (!normalizedQuestion) return null
    
    // First, try exact match (case-insensitive)
    const exactMatch = buildingQALibrary.find(
        entry => entry.question.toLowerCase() === normalizedQuestion
    )
    if (exactMatch) return exactMatch.answer
    
    // Calculate scores based on keyword matches
    const scoredMatches = buildingQALibrary.map(entry => {
        let score = 0
        const questionWords = normalizedQuestion.split(/\s+/)
        
        // Check if question contains any keywords
        entry.keywords.forEach(keyword => {
            if (normalizedQuestion.includes(keyword.toLowerCase())) {
                score += 2
            }
        })
        
        // Check for word matches in the question
        questionWords.forEach(word => {
            if (entry.question.toLowerCase().includes(word) && word.length > 2) {
                score += 1
            }
        })
        
        return { entry, score }
    })
    
    // Sort by score and get the best match
    scoredMatches.sort((a, b) => b.score - a.score)
    const bestMatch = scoredMatches[0]
    
    // Return answer if score is high enough (at least 2 points)
    if (bestMatch && bestMatch.score >= 2) {
        return bestMatch.entry.answer
    }
    
    // If no good match found, return a helpful default response
    return "I'm here to help with building-related questions! Try asking about building hours, amenities, parking, events, work orders, or wayfinding. You can also ask me specific questions like 'What time does the building open?' or 'How do I reserve a conference room?'"
}

