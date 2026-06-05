export const CATEGORIES = {
  WORKPLACE_BASICS: 'Workplace Basics',
  CUSTOMER_SERVICE: 'Customer Service',
  INTERVIEW_SKILLS: 'Interview Skills',
  SAFETY: 'Safety',
  TEAMWORK: 'Teamwork',
  PROBLEM_SOLVING: 'Problem Solving',
}

export const JOB_TRACKS = {
  HOSPITALITY: 'Hospitality',
}

export const LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
}

export const lessons = [
  // ─── WORKPLACE BASICS ───────────────────────────────────────────────────────
  {
    id: 'l-wb-1',
    title: 'Your First Day at Work',
    description: 'What to expect, how to prepare, and how to make a great first impression.',
    category: CATEGORIES.WORKPLACE_BASICS,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.BEGINNER,
    duration: 8,
    emoji: '🌅',
    steps: [
      {
        type: 'learn',
        title: 'Why the first day matters',
        content:
          'Your first day sets how your colleagues and managers see you for months. You cannot undo a bad first impression easily — but a great one stays with people. The goal is simple: show up prepared, be friendly, listen more than you speak, and ask good questions.',
      },
      {
        type: 'checklist',
        title: 'Before you arrive',
        items: [
          'Know the exact address and how long it takes to get there.',
          'Arrive 10–15 minutes early — not just on time.',
          'Wear your uniform or the agreed dress code, clean and ironed.',
          'Bring any documents they asked for (ID, bank details, certificates).',
          'Eat before you go — do not arrive hungry.',
          'Charge your phone the night before.',
        ],
      },
      {
        type: 'phrase',
        title: 'Useful phrases for your first day',
        phrases: [
          {
            phrase: 'Could you show me how this works?',
            meaning: 'Ask for help understanding a process. Shows you are engaged.',
          },
          {
            phrase: 'I want to make sure I do this right — can I check with you first?',
            meaning: 'Shows you care about quality and are not afraid to ask.',
          },
          {
            phrase: 'Thank you for taking the time to explain that.',
            meaning: 'Acknowledge when someone helps you — it builds goodwill.',
          },
          {
            phrase: 'Who should I speak to if I have a question during my shift?',
            meaning: 'A smart question that shows you are planning ahead.',
          },
        ],
      },
      {
        type: 'quiz',
        question: 'Your shift starts at 8am. What time should you arrive?',
        options: ['Exactly at 8am', '7:45am–7:50am', 'Whenever you are ready', '8:10am is fine'],
        correct: 1,
        explanation:
          'Arriving 10–15 minutes early shows respect for your employer\'s time and gives you a moment to settle before the shift starts.',
      },
    ],
  },
  {
    id: 'l-wb-2',
    title: 'How to Be Professional',
    description: 'Professionalism is not about being formal — it is about being reliable and respectful.',
    category: CATEGORIES.WORKPLACE_BASICS,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.BEGINNER,
    duration: 10,
    emoji: '⭐',
    steps: [
      {
        type: 'learn',
        title: 'What professionalism really means',
        content:
          'Professionalism is not about speaking in a formal accent or using complicated words. It is about three things: showing up when you say you will, doing what you say you will do, and treating people with respect — every single time. These three habits will take you further than any qualification.',
      },
      {
        type: 'checklist',
        title: 'Daily professional habits',
        items: [
          'Keep your phone on silent and out of sight during your shift.',
          'Address managers and senior staff respectfully.',
          'Never gossip about colleagues or customers.',
          'If you are going to be late or absent, call before your shift starts.',
          'Own your mistakes — do not make excuses or blame others.',
          'Leave personal problems at the door when you start your shift.',
        ],
      },
      {
        type: 'dialogue',
        title: 'Calling in sick — the professional way',
        scenario: 'You are unwell and cannot come in for your shift tomorrow morning.',
        lines: [
          { speaker: 'you', text: 'Good morning, this is Thando. I am calling to let you know I am unwell and unfortunately cannot come in for my shift today.' },
          { speaker: 'manager', text: 'Okay Thando, thank you for letting me know. How are you feeling?' },
          { speaker: 'you', text: 'I have a bad stomach — I did not want to risk affecting customers or my team. I expect to be fine by tomorrow.' },
          { speaker: 'manager', text: 'I appreciate you calling. Rest up and let me know if anything changes.' },
          { speaker: 'you', text: 'Thank you. I am sorry for the inconvenience. I will keep you updated.' },
        ],
      },
      {
        type: 'quiz',
        question: 'You realize you made an error on a customer\'s bill. What is the most professional response?',
        options: [
          'Hope the customer does not notice',
          'Tell a colleague and ask them to fix it',
          'Tell your manager immediately and correct it yourself',
          'Wait until the customer complains',
        ],
        correct: 2,
        explanation: 'Owning mistakes quickly and fixing them shows integrity. Hiding errors almost always makes things worse.',
      },
    ],
  },
  {
    id: 'l-wb-3',
    title: 'Understanding Your Payslip',
    description: 'Know what you are earning, what is deducted, and what your rights are.',
    category: CATEGORIES.WORKPLACE_BASICS,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.INTERMEDIATE,
    duration: 12,
    emoji: '💰',
    steps: [
      {
        type: 'learn',
        title: 'Every employee has a right to a payslip',
        content:
          'In South Africa, your employer is required by law to give you a written payslip every time you are paid. It must show your gross pay (what you earned before deductions), every deduction and what it is for, and your net pay (what lands in your account). If your employer does not give you a payslip, that is a violation of the Basic Conditions of Employment Act.',
      },
      {
        type: 'checklist',
        title: 'What to check on your payslip',
        items: [
          'Your name, ID number, and employee number are correct.',
          'The number of hours worked matches what you actually worked.',
          'Your hourly rate or salary matches what was agreed in your contract.',
          'UIF (Unemployment Insurance Fund) is being deducted — this protects you if you lose your job.',
          'You understand every line — if you do not, ask HR or your manager.',
          'Your bank details are correct so your payment goes to the right account.',
        ],
      },
      {
        type: 'phrase',
        title: 'How to ask about your payslip',
        phrases: [
          {
            phrase: 'I have a question about my payslip — when would be a good time to chat?',
            meaning: 'Ask politely, not in the middle of a rush. Shows respect for the manager\'s time.',
          },
          {
            phrase: 'This deduction here — can you help me understand what it is for?',
            meaning: 'Ask specifically. Vague questions get vague answers.',
          },
          {
            phrase: 'I think there may be an error with my hours. Can we check together?',
            meaning: 'Raise it professionally — "may be" is softer than "you got it wrong".',
          },
        ],
      },
      {
        type: 'quiz',
        question: 'Your payslip shows a deduction called "UIF". What does this mean?',
        options: [
          'A fine for being late',
          'A payment to the Unemployment Insurance Fund that protects you',
          'A fee paid to the recruitment agency',
          'A deduction for meals eaten at work',
        ],
        correct: 1,
        explanation: 'UIF is a legal deduction that builds up a fund you can claim from if you lose your job or take maternity leave.',
      },
    ],
  },

  // ─── CUSTOMER SERVICE ────────────────────────────────────────────────────────
  {
    id: 'l-cs-1',
    title: 'Taking a Food Order',
    description: 'Learn how to take orders politely, accurately, and efficiently.',
    category: CATEGORIES.CUSTOMER_SERVICE,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.BEGINNER,
    duration: 10,
    emoji: '🤝',
    steps: [
      {
        type: 'learn',
        title: 'Taking an order is more than writing things down',
        content:
          'When you take an order, the customer is trusting you with their experience. Mistakes mean unhappy customers, wasted food, and lost tips. Good order-taking is about listening carefully, confirming what you heard, and asking the right questions — like whether anyone at the table has allergies.',
      },
      {
        type: 'phrase',
        title: 'Essential order-taking phrases',
        phrases: [
          {
            phrase: 'Are you ready to order, or would you like a few more minutes?',
            meaning: 'Never rush a customer — but check in so they do not wait too long.',
          },
          {
            phrase: 'And how would you like your steak cooked?',
            meaning: 'Always ask about preferences for dishes that have options.',
          },
          {
            phrase: 'Does anyone at the table have any allergies I should know about?',
            meaning: 'Ask every table, every time. This is a safety question.',
          },
          {
            phrase: 'So that is one chicken burger with no onion, and one fish of the day. Is that correct?',
            meaning: 'Always read the order back before leaving the table.',
          },
          {
            phrase: 'I will put that in for you right away.',
            meaning: 'A confident close that reassures the customer.',
          },
        ],
      },
      {
        type: 'dialogue',
        title: 'Practice dialogue: taking a table\'s order',
        scenario: 'A couple is seated and ready to order.',
        lines: [
          { speaker: 'you', text: 'Good evening, are you ready to order?' },
          { speaker: 'guest', text: 'Yes please. I\'ll have the grilled chicken.' },
          { speaker: 'you', text: 'Perfect. Would you like that with chips or salad?' },
          { speaker: 'guest', text: 'Chips please.' },
          { speaker: 'you', text: 'Great. And for you?' },
          { speaker: 'guest2', text: 'I\'ll have the pasta. But I\'m actually lactose intolerant — is there dairy in the sauce?' },
          { speaker: 'you', text: 'That is a great question. Let me check with the kitchen right now to be sure.' },
          { speaker: 'you', text: 'I have confirmed — the sauce is cream-based, so it does contain dairy. We can do it with olive oil and garlic instead. Would that work?' },
          { speaker: 'guest2', text: 'Perfect, thank you for checking!' },
          { speaker: 'you', text: 'Of course. So that is grilled chicken with chips, and a pasta with olive oil and garlic. I\'ll get that started for you.' },
        ],
      },
      {
        type: 'quiz',
        question: 'A customer says "I\'ll have the soup." What should you do before walking away?',
        options: [
          'Go straight to the kitchen',
          'Ask if they want bread with it, confirm any allergies, and repeat the order back',
          'Write it down and move on',
          'Ask a colleague to take over',
        ],
        correct: 1,
        explanation: 'Always confirm preferences, check for allergies, and repeat the order back. It takes 15 seconds and prevents costly mistakes.',
      },
    ],
  },
  {
    id: 'l-cs-2',
    title: 'Greeting Guests with Confidence',
    description: 'The first 30 seconds decide whether a guest feels welcome or not.',
    category: CATEGORIES.CUSTOMER_SERVICE,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.BEGINNER,
    duration: 8,
    emoji: '😊',
    steps: [
      {
        type: 'learn',
        title: 'Why the greeting matters so much',
        content:
          'Research shows that customers decide how they feel about a place within the first 30 seconds of arriving. If they feel invisible or unwelcome at the door, that feeling stays with them all meal. A warm, quick, confident greeting sets up everything that follows — it costs nothing and makes a huge difference.',
      },
      {
        type: 'checklist',
        title: 'The perfect greeting checklist',
        items: [
          'Make eye contact within 10 seconds of a guest arriving.',
          'Smile — a real one, not a forced one.',
          'Approach within 30 seconds, even if you are busy.',
          'If you cannot get there, catch their eye and signal you see them.',
          'Use a warm, clear opening — not just "table for how many?"',
          'Offer to take a coat, bag, or pram if relevant.',
          'Walk them to their table — do not just point.',
        ],
      },
      {
        type: 'phrase',
        title: 'Strong greeting phrases',
        phrases: [
          {
            phrase: 'Good evening! Welcome — have you been with us before?',
            meaning: 'Warm and opens a conversation. Returning guests feel recognized.',
          },
          {
            phrase: 'Welcome in! I\'ll be right with you.',
            meaning: 'Acknowledges guests even when you\'re busy.',
          },
          {
            phrase: 'Good afternoon — lovely to have you. Will it be just the two of you today?',
            meaning: 'Friendly and moves things forward efficiently.',
          },
        ],
      },
      {
        type: 'quiz',
        question: 'You are carrying plates to a table when new guests walk in. What do you do?',
        options: [
          'Finish what you are doing and then greet them',
          'Shout a hello from across the room',
          'Make eye contact, smile, and mouth "I\'ll be right with you"',
          'Ask a colleague to greet them when they are free',
        ],
        correct: 2,
        explanation: 'Acknowledging guests immediately — even nonverbally — prevents them from feeling ignored. Guests understand you are busy; they just need to know they have been seen.',
      },
    ],
  },
  {
    id: 'l-cs-3',
    title: 'Handling Complaints Without Losing Your Cool',
    description: 'Turn unhappy customers into loyal ones with the right approach.',
    category: CATEGORIES.CUSTOMER_SERVICE,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.INTERMEDIATE,
    duration: 15,
    emoji: '🛡️',
    steps: [
      {
        type: 'learn',
        title: 'A complaint is a gift',
        content:
          'Most unhappy customers say nothing — they just never come back. When a customer complains, they are giving you a chance to fix the problem and keep them. Studies show that customers whose complaints are handled well are actually more loyal than customers who never had a problem at all. Your job is to turn the complaint into a recovery.',
      },
      {
        type: 'checklist',
        title: 'The HEARD method for handling complaints',
        items: [
          'H — Hear them out fully. Do not interrupt.',
          'E — Empathize. Acknowledge their frustration.',
          'A — Apologize sincerely, even if it was not your fault.',
          'R — Resolve the problem as quickly as possible.',
          'D — Diagnose and follow up — make sure the fix worked.',
        ],
      },
      {
        type: 'dialogue',
        title: 'Practice: handling a food complaint',
        scenario: 'A guest tells you their steak is overcooked.',
        lines: [
          { speaker: 'guest', text: 'Excuse me — I ordered medium rare and this is clearly well done. I am very disappointed.' },
          { speaker: 'you', text: 'I am so sorry about that. You are absolutely right — that is not what you ordered.' },
          { speaker: 'guest', text: 'I specifically said medium rare. It\'s ruined.' },
          { speaker: 'you', text: 'I completely understand your frustration. I would feel the same way. Can I take this back and have the kitchen prepare you a fresh one right away? I\'ll personally make sure it is right this time.' },
          { speaker: 'guest', text: 'Yes please. But I\'ve been waiting a while already.' },
          { speaker: 'you', text: 'You have — and I am sorry for that too. Let me speak with my manager about what we can do to make this up to you while you wait.' },
        ],
      },
      {
        type: 'quiz',
        question: 'A customer complains that their food is cold. Your first response should be:',
        options: [
          '"The kitchen has been very busy tonight."',
          '"I am sorry about that — let me fix this for you right now."',
          '"Are you sure? It came out just a few minutes ago."',
          '"Would you like to speak to the manager?"',
        ],
        correct: 1,
        explanation: 'Apologize first, act fast. Do not make excuses or question the customer\'s experience. They know if their food is cold.',
      },
    ],
  },

  // ─── INTERVIEW SKILLS ────────────────────────────────────────────────────────
  {
    id: 'l-is-1',
    title: 'The STAR Method: Telling Your Story',
    description: 'Answer any "tell me about a time when..." question with confidence.',
    category: CATEGORIES.INTERVIEW_SKILLS,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.BEGINNER,
    duration: 12,
    emoji: '⭐',
    steps: [
      {
        type: 'learn',
        title: 'What is the STAR method?',
        content:
          'STAR stands for Situation, Task, Action, Result. It is a simple formula for answering interview questions that ask about your past experience. Instead of rambling or being vague, you tell a focused story with a beginning, middle, and end. Interviewers love STAR answers because they are easy to follow and show real evidence of your skills.',
      },
      {
        type: 'checklist',
        title: 'STAR in practice',
        items: [
          'S — Situation: Briefly set the scene. Where were you? What was happening?',
          'T — Task: What was your specific role or responsibility in that situation?',
          'A — Action: What did YOU do? (Not "we" — focus on your own contribution.)',
          'R — Result: What happened because of your action? Numbers help ("served 80 guests", "reduced complaints by half").',
        ],
      },
      {
        type: 'phrase',
        title: 'STAR sentence starters',
        phrases: [
          {
            phrase: 'The situation was...',
            meaning: 'Opens with context — keep it to 1–2 sentences.',
          },
          {
            phrase: 'My specific role was to...',
            meaning: 'Clarifies what YOU were responsible for.',
          },
          {
            phrase: 'What I decided to do was...',
            meaning: 'Shows your thinking and initiative.',
          },
          {
            phrase: 'As a result...',
            meaning: 'Closes the story with a concrete outcome.',
          },
        ],
      },
      {
        type: 'quiz',
        question: 'In a STAR answer, what should the "Action" part focus on?',
        options: [
          'What the team decided together',
          'What your manager told you to do',
          'What YOU specifically did and why',
          'The overall outcome',
        ],
        correct: 2,
        explanation: 'The Action is about YOUR contribution — not your team\'s, not your manager\'s. Use "I" not "we" in this section.',
      },
    ],
  },
  {
    id: 'l-is-2',
    title: 'Dressing for the Interview',
    description: 'How to show up looking confident and appropriate for a hospitality role.',
    category: CATEGORIES.INTERVIEW_SKILLS,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.BEGINNER,
    duration: 8,
    emoji: '👔',
    steps: [
      {
        type: 'learn',
        title: 'Your appearance speaks before you do',
        content:
          'For a hospitality interview, you are essentially showing the employer how you would present yourself to their customers. You do not need expensive clothes — you need clean, well-fitting, and smart. Think: smart casual to smart. The safest choice is always slightly more formal than you think you need to be.',
      },
      {
        type: 'checklist',
        title: 'Interview appearance checklist',
        items: [
          'Clothes are clean, ironed, and not torn or faded.',
          'Shoes are clean — people notice dirty shoes.',
          'Hair is neat and out of your face.',
          'Nails are clean and not overly long.',
          'Perfume or cologne is subtle — not overpowering.',
          'No strong political or controversial logos or slogans.',
          'Your phone is on silent before you enter the building.',
        ],
      },
      {
        type: 'phrase',
        title: 'Phrases that show you thought about your appearance',
        phrases: [
          {
            phrase: 'I wanted to dress the way I would for your customers.',
            meaning: 'Shows you understand hospitality standards.',
          },
          {
            phrase: 'I know presentation matters in this industry.',
            meaning: 'Signals awareness of professional standards.',
          },
        ],
      },
      {
        type: 'quiz',
        question: 'You are interviewing at a casual family restaurant. What is the safest outfit choice?',
        options: [
          'Jeans and a branded hoodie',
          'Smart trousers or a skirt, a clean collared shirt or blouse',
          'A full suit',
          'Whatever you wore to school that day',
        ],
        correct: 1,
        explanation: 'Smart casual is almost always right for hospitality interviews. It shows effort without being overdressed.',
      },
    ],
  },
  {
    id: 'l-is-3',
    title: 'Body Language in Interviews',
    description: 'Half the interview is what your body says — learn to control it.',
    category: CATEGORIES.INTERVIEW_SKILLS,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.INTERMEDIATE,
    duration: 10,
    emoji: '🧍',
    steps: [
      {
        type: 'learn',
        title: 'What your body is saying right now',
        content:
          'Studies suggest that over 50% of how we communicate is through body language — posture, eye contact, facial expressions, gestures. In an interview, your body language either supports your words or contradicts them. A nervous candidate who sits hunched, avoids eye contact, and crosses their arms will seem untrustworthy even if their answers are perfect.',
      },
      {
        type: 'checklist',
        title: 'Positive body language habits',
        items: [
          'Sit up straight — not rigidly, but alert and engaged.',
          'Keep eye contact while speaking and while listening.',
          'Lean slightly forward to show interest — not backward or slouched.',
          'Keep your hands visible on the table or in your lap.',
          'Nod occasionally while the interviewer speaks.',
          'Smile genuinely when it is appropriate — not constantly.',
          'Do not fidget with your phone, pen, or hair.',
        ],
      },
      {
        type: 'quiz',
        question: 'You are nervous and your hands want to fidget. What is the best strategy?',
        options: [
          'Hold your phone under the table',
          'Clasp your hands together lightly on the table or in your lap',
          'Cross your arms to hide your hands',
          'Hold a pen and click it gently',
        ],
        correct: 1,
        explanation: 'Clasping your hands gives your nervous energy somewhere to go without being distracting. Clicking pens or crossing arms sends negative signals.',
      },
    ],
  },

  // ─── SAFETY ──────────────────────────────────────────────────────────────────
  {
    id: 'l-sf-1',
    title: 'Food Hygiene Basics',
    description: 'Keep customers safe and protect your job with proper food handling.',
    category: CATEGORIES.SAFETY,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.BEGINNER,
    duration: 10,
    emoji: '🧼',
    steps: [
      {
        type: 'learn',
        title: 'Food poisoning is more common than you think',
        content:
          'In South Africa, thousands of people get sick from food poisoning every year — and many cases happen in restaurants. As a hospitality worker, you are responsible for keeping food safe. Poor hygiene can cost a customer their health, cost the restaurant its licence, and cost you your job. The good news: the rules are simple and take almost no extra time.',
      },
      {
        type: 'checklist',
        title: 'Non-negotiable food hygiene rules',
        items: [
          'Wash your hands for at least 20 seconds before touching food, after touching raw meat, and after using the toilet.',
          'Never touch your face, hair, or phone while handling food.',
          'Keep raw meat, fish, and poultry away from ready-to-eat food.',
          'Keep cold food cold (below 5°C) and hot food hot (above 60°C).',
          'Report any illness — especially vomiting or diarrhoea — to your manager before starting your shift.',
          'Use separate chopping boards for raw meat and vegetables.',
          'Check expiry dates and report any expired stock immediately.',
        ],
      },
      {
        type: 'quiz',
        question: 'You woke up this morning with an upset stomach. What should you do?',
        options: [
          'Come in and see how you feel during the shift',
          'Take some medicine and not mention it',
          'Call your manager before your shift and explain — do not come in',
          'Come in but avoid handling food',
        ],
        correct: 2,
        explanation: 'Stomach illness can spread to customers through food. You are legally and ethically required to stay home and inform your manager. Most employers understand — they will appreciate your honesty.',
      },
    ],
  },
  {
    id: 'l-sf-2',
    title: 'Preventing Slips, Trips and Falls',
    description: 'The most common restaurant injury — and how to avoid it.',
    category: CATEGORIES.SAFETY,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.BEGINNER,
    duration: 8,
    emoji: '⚠️',
    steps: [
      {
        type: 'learn',
        title: 'Wet floors injure people every day',
        content:
          'Slips and falls are the most common injury in hospitality — for both staff and customers. A spill left unattended, a wet floor without a sign, or a cluttered walkway can put someone in hospital. As a staff member, you are responsible for the safety of everyone in your space. Spotting and fixing hazards is part of your job, not someone else\'s.',
      },
      {
        type: 'checklist',
        title: 'Safety habits on the floor',
        items: [
          'Wear non-slip shoes — this is not optional.',
          'When you see a spill, clean it immediately or put out a wet floor sign while you get help.',
          'Never leave boxes, bags, or trays in walkways.',
          'Walk, do not run — even during a rush.',
          'Report any broken equipment, loose flooring, or lighting issues to a manager.',
          'Know where the first aid kit and fire exits are on your first day.',
        ],
      },
      {
        type: 'quiz',
        question: 'You notice a spill on the floor but you are carrying plates to a table. What do you do?',
        options: [
          'Deliver the plates first, then come back to clean it',
          'Step over it and tell someone later',
          'Put down the plates safely, place a wet floor sign or clean the spill, then continue',
          'Call out to a colleague and keep walking',
        ],
        correct: 2,
        explanation: 'A spill must be dealt with immediately. If you cannot clean it in that moment, at minimum put out a sign. Someone could fall in the seconds you walk away.',
      },
    ],
  },

  // ─── TEAMWORK ────────────────────────────────────────────────────────────────
  {
    id: 'l-tw-1',
    title: 'Communicating with Your Team Under Pressure',
    description: 'How to stay connected and clear with your colleagues during a busy shift.',
    category: CATEGORIES.TEAMWORK,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.BEGINNER,
    duration: 10,
    emoji: '🗣️',
    steps: [
      {
        type: 'learn',
        title: 'A quiet team is a dangerous team',
        content:
          'During a busy shift, the teams that fall apart are usually the ones where nobody is communicating. People assume someone else is handling a table, a spill, or a complaint. Good team communication is short, clear, and frequent. You do not need to have a full conversation — a few words at the right moment can save the whole shift.',
      },
      {
        type: 'phrase',
        title: 'Quick team communication phrases',
        phrases: [
          {
            phrase: 'I\'ve got table 4 — can you take 6 and 7?',
            meaning: 'Dividing tables clearly prevents both tables from being ignored.',
          },
          {
            phrase: 'I\'m falling behind — can anyone help me?',
            meaning: 'Asking for help early is better than crashing later.',
          },
          {
            phrase: 'Table 2 has been waiting 15 minutes — can someone check?',
            meaning: 'Flagging a problem before it becomes a complaint.',
          },
          {
            phrase: 'Good job on that table — really smooth.',
            meaning: 'Encouragement builds team morale during hard shifts.',
          },
          {
            phrase: 'Heads up — there is a spill by the pass.',
            meaning: 'Safety call-out. Quick and specific.',
          },
        ],
      },
      {
        type: 'quiz',
        question: 'You notice your colleague looks overwhelmed. What is the best response?',
        options: [
          'Say nothing — they will ask if they need help',
          'Tell a manager they cannot cope',
          'Quickly finish your current task then say "Can I give you a hand?"',
          'Take over without asking',
        ],
        correct: 2,
        explanation: 'Offering help shows team spirit. Finishing your task first means you are not abandoning your own tables. Always ask — taking over without asking can feel undermining.',
      },
    ],
  },
  {
    id: 'l-tw-2',
    title: 'Giving and Receiving Feedback at Work',
    description: 'How to hear criticism without shutting down, and how to speak up constructively.',
    category: CATEGORIES.TEAMWORK,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.INTERMEDIATE,
    duration: 12,
    emoji: '🔄',
    steps: [
      {
        type: 'learn',
        title: 'Feedback is not personal — it is professional',
        content:
          'One of the hardest skills to develop at work is the ability to hear criticism and not take it personally. When a manager says "that order was wrong," they are not saying you are a bad person — they are saying the order was wrong. People who can receive feedback gracefully and act on it are the ones who get promoted. People who get defensive get stuck.',
      },
      {
        type: 'checklist',
        title: 'Receiving feedback well',
        items: [
          'Listen without interrupting or defending yourself.',
          'Breathe — your first emotional reaction is not always right.',
          'Ask a clarifying question: "Can you show me what I should do differently?"',
          'Say thank you — even when it stings.',
          'Act on the feedback. If you do not, you will hear it again.',
          'Do not hold a grudge. Move on quickly.',
        ],
      },
      {
        type: 'dialogue',
        title: 'Receiving feedback from a manager',
        scenario: 'Your manager pulls you aside after a shift.',
        lines: [
          { speaker: 'manager', text: 'Thando, I noticed a few of your tables were waiting too long for the bill tonight.' },
          { speaker: 'you', text: 'I hear that. I was managing a lot of tables at once — but I understand that is not an excuse for the customer.' },
          { speaker: 'manager', text: 'Exactly. When you are busy, you need to communicate with the team so someone can cover.' },
          { speaker: 'you', text: 'That is fair. Can I ask — what is the best way to signal I need backup when things get hectic?' },
          { speaker: 'manager', text: 'Just tell someone. Or use the kitchen runner. Do not try to hold everything alone.' },
          { speaker: 'you', text: 'Understood. I will do that next time. Thank you for telling me.' },
        ],
      },
      {
        type: 'quiz',
        question: 'Your manager criticises the way you set a table. Your first response should be:',
        options: [
          '"That is how I was trained."',
          '"Okay, sorry. How would you like it done?"',
          '"I disagree — the customer did not complain."',
          'Say nothing and walk away',
        ],
        correct: 1,
        explanation: 'Acknowledge, apologize briefly, and immediately ask for the correct way. This shows professionalism and a willingness to learn.',
      },
    ],
  },

  // ─── PROBLEM SOLVING ─────────────────────────────────────────────────────────
  {
    id: 'l-ps-1',
    title: 'Thinking on Your Feet',
    description: 'When things go wrong mid-shift — how to respond quickly and calmly.',
    category: CATEGORIES.PROBLEM_SOLVING,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.INTERMEDIATE,
    duration: 10,
    emoji: '🧠',
    steps: [
      {
        type: 'learn',
        title: 'In hospitality, things go wrong. Always.',
        content:
          'No shift is perfect. The kitchen runs out of something, a booking is double-confirmed, a table of twelve arrives unannounced. The difference between a good employee and a great one is not that they prevent problems — it is how fast and calmly they respond when problems happen. Panic is contagious. Calm is too.',
      },
      {
        type: 'checklist',
        title: 'A quick framework for solving problems on the spot',
        items: [
          '1. Pause for two seconds — react, do not panic.',
          '2. Identify what the actual problem is (not just the symptom).',
          '3. Think of two possible solutions.',
          '4. Pick the one that is best for the customer.',
          '5. Tell someone — your manager or teammate — what is happening.',
          '6. Act quickly and confidently.',
          '7. Follow up to make sure the solution worked.',
        ],
      },
      {
        type: 'phrase',
        title: 'Phrases to buy yourself a moment',
        phrases: [
          {
            phrase: 'Let me look into that for you right now.',
            meaning: 'Buys you a few minutes without making the customer feel dismissed.',
          },
          {
            phrase: 'I want to make sure I get this exactly right for you.',
            meaning: 'Frames your careful approach as dedication, not slowness.',
          },
          {
            phrase: 'I\'m going to get my manager involved because they can solve this faster than I can.',
            meaning: 'Escalating is not weakness. Know when a problem is above your level.',
          },
        ],
      },
      {
        type: 'quiz',
        question: 'The kitchen tells you they are out of the dish a customer just ordered. What do you do?',
        options: [
          'Wait and hope they do not notice',
          'Send the kitchen manager to explain',
          'Go to the customer immediately, apologize, and offer an alternative',
          'Give them someone else\'s order',
        ],
        correct: 2,
        explanation: 'Customers handle bad news much better when they hear it quickly and with an alternative. Waiting or hiding the problem always makes things worse.',
      },
    ],
  },
  {
    id: 'l-ps-2',
    title: 'When a Guest Is Truly Unhappy',
    description: 'Escalation, recovery, and turning the worst situations around.',
    category: CATEGORIES.PROBLEM_SOLVING,
    jobTrack: JOB_TRACKS.HOSPITALITY,
    level: LEVELS.INTERMEDIATE,
    duration: 15,
    emoji: '🔥',
    steps: [
      {
        type: 'learn',
        title: 'Some complaints need more than an apology',
        content:
          'Most complaints are fixed with a quick apology and a replacement dish. But occasionally a guest is genuinely very upset — maybe several things went wrong, or the same problem happened twice. These situations require a manager, a meaningful gesture, and exceptional patience. Your job in these moments is to stay calm, protect the relationship with the customer, and not take the anger personally.',
      },
      {
        type: 'checklist',
        title: 'Escalation checklist',
        items: [
          'Stay calm — your calm lowers the temperature of the interaction.',
          'Never argue, even if you believe the customer is wrong.',
          'Acknowledge the frustration: "I completely understand why you are upset."',
          'Involve your manager early — do not wait until the customer is shouting.',
          'The manager should introduce themselves by name.',
          'Offer something meaningful: a replacement, a discount, or a complimentary item.',
          'Follow up before the guest leaves to make sure the resolution worked.',
        ],
      },
      {
        type: 'quiz',
        question: 'A guest says: "This is the second time you have got my order wrong. I want to speak to the owner." What is your first response?',
        options: [
          '"The owner is not here right now."',
          '"I am so sorry — let me get my manager for you immediately."',
          '"I do not think it was wrong the first time."',
          '"Can I try to fix it for you first?"',
        ],
        correct: 1,
        explanation: 'When a guest requests to escalate, do not negotiate — get the manager immediately. Delaying or defending only makes things worse.',
      },
    ],
  },
]

export class Lesson {
  static getAll() {
    return lessons
  }

  static getByJobTrack(track) {
    return lessons.filter(l => l.jobTrack === track)
  }

  static getByCategory(category) {
    return lessons.filter(l => l.category === category)
  }

  static getByLevel(level) {
    return lessons.filter(l => l.level === level)
  }

  static getById(id) {
    return lessons.find(l => l.id === id)
  }

  static getCategories(track) {
    const filtered = track ? lessons.filter(l => l.jobTrack === track) : lessons
    return [...new Set(filtered.map(l => l.category))]
  }

  static getDailyLesson() {
    const beginnerLessons = lessons.filter(l => l.level === LEVELS.BEGINNER)
    const dayIndex = Math.floor(Date.now() / 86400000) % beginnerLessons.length
    return beginnerLessons[dayIndex]
  }
}
