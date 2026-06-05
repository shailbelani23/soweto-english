export const INTERVIEW_CATEGORIES = {
  INTRODUCTION: 'Introduction',
  EXPERIENCE: 'Experience & Background',
  CUSTOMER_SERVICE: 'Customer Service',
  TEAMWORK: 'Teamwork',
  PROBLEM_SOLVING: 'Problem Solving',
  MOTIVATION: 'Motivation & Goals',
  SITUATIONAL: 'Situational',
}

export const interviewQuestions = [
  {
    id: 'iq-1',
    category: INTERVIEW_CATEGORIES.INTRODUCTION,
    question: 'Tell me about yourself.',
    difficulty: 'beginner',
    tip: 'Keep it to about 60 seconds. Cover who you are, one thing you are proud of, and why you are here.',
    exampleAnswer:
      'My name is Thando. I grew up in Soweto and finished matric last year. I have been helping at my aunt\'s catering business on weekends for two years, so I know how to keep customers happy even when things are busy. I am here because I want to build a real career in hospitality.',
    followUps: [
      'What did you do after finishing school?',
      'What keeps you busy when you are not working?',
    ],
    keywords: ['name', 'background', 'experience', 'why here'],
  },
  {
    id: 'iq-2',
    category: INTERVIEW_CATEGORIES.MOTIVATION,
    question: 'Why do you want to work here?',
    difficulty: 'beginner',
    tip: 'Show you know something specific about the place. Connect it to your own goals.',
    exampleAnswer:
      'I have visited this restaurant before and I was impressed by how the staff made every table feel important. I want to work somewhere that takes service seriously. I am also looking to grow — I would love to become a supervisor one day, and I believe a place like this teaches you the right habits from the start.',
    followUps: [
      'What do you know about our business?',
      'Why hospitality specifically?',
    ],
    keywords: ['research', 'ambition', 'fit', 'growth'],
  },
  {
    id: 'iq-3',
    category: INTERVIEW_CATEGORIES.CUSTOMER_SERVICE,
    question: 'A customer is angry because their food took too long. What do you do?',
    difficulty: 'beginner',
    tip: 'Stay calm. Listen fully before speaking. Apologize sincerely. Offer a solution. Never argue.',
    exampleAnswer:
      'I would stay calm and make eye contact — not in an aggressive way, but to show I am listening. I would let the customer finish speaking without interrupting. Then I would say: "I am so sorry for the wait. That is not the experience we want for you." I would check with the kitchen immediately and give the customer an honest update. If the food was going to take much longer, I would speak to my manager about what we could offer to make it right.',
    followUps: [
      'What if the customer started shouting?',
      'What if the delay was the kitchen\'s fault?',
    ],
    keywords: ['calm', 'listen', 'apologize', 'solution', 'escalate'],
  },
  {
    id: 'iq-4',
    category: INTERVIEW_CATEGORIES.EXPERIENCE,
    question: 'Do you have any experience in hospitality or customer-facing work?',
    difficulty: 'beginner',
    tip: 'Any experience counts — school tuck shop, church events, helping family. Be honest and specific.',
    exampleAnswer:
      'I have not worked in a formal restaurant, but I have plenty of relevant experience. I helped serve at three large family events — the biggest had over 80 guests. I also volunteered at my church\'s food stall every Sunday for a year. I learned how to stay organised under pressure, keep track of orders, and always put a smile on my face even when I was tired.',
    followUps: [
      'What was the hardest part of that work?',
      'What would you do differently now?',
    ],
    keywords: ['volunteering', 'transferable skills', 'honesty', 'specifics'],
  },
  {
    id: 'iq-5',
    category: INTERVIEW_CATEGORIES.TEAMWORK,
    question: 'Tell me about a time you worked well as part of a team.',
    difficulty: 'intermediate',
    tip: 'Use the STAR method: Situation → Task → Action → Result. Make it a real story.',
    exampleAnswer:
      'At my cousin\'s wedding, the catering team was short one person on the day. Situation: we had 90 guests and only three of us on the floor. Task: we needed to serve a three-course meal smoothly and quickly. Action: I immediately suggested we split the room into zones and check in with each other every ten minutes. I also helped the slowest section when mine was clear. Result: every guest was served on time, and the family told us it was the smoothest event they had ever hosted.',
    followUps: [
      'What would you do if a team member was not contributing?',
      'How do you handle conflict within a team?',
    ],
    keywords: ['STAR', 'cooperation', 'initiative', 'communication'],
  },
  {
    id: 'iq-6',
    category: INTERVIEW_CATEGORIES.TEAMWORK,
    question: 'A colleague is not pulling their weight during a busy shift. What do you do?',
    difficulty: 'intermediate',
    tip: 'Do not complain about colleagues. Show you handle it professionally — first check in, then escalate only if needed.',
    exampleAnswer:
      'I would first check if they were struggling with something — maybe they felt overwhelmed or did not know what to do next. I might say: "Hey, can I give you a hand? I have finished my tables." If it became a pattern affecting the whole team, I would have a quiet, private conversation with them after the shift. I would only go to a manager if the issue continued and was affecting the customer experience.',
    followUps: [
      'What if the colleague got defensive?',
      'Have you ever been in this situation before?',
    ],
    keywords: ['empathy', 'private conversation', 'escalation', 'professionalism'],
  },
  {
    id: 'iq-7',
    category: INTERVIEW_CATEGORIES.PROBLEM_SOLVING,
    question: 'How do you stay calm and focused when the restaurant is very busy?',
    difficulty: 'intermediate',
    tip: 'Show self-awareness and practical habits. Employers want to know you will not panic.',
    exampleAnswer:
      'I focus on one table at a time instead of looking at everything at once — that helps me avoid feeling overwhelmed. Before I approach a table, I take a quick breath so my energy is calm and friendly. I also communicate clearly with my team: if I am falling behind, I will say so, and I do the same for them. And I remind myself that a rush is temporary — it always slows down.',
    followUps: [
      'What is the busiest situation you have been in?',
      'How do you prioritise tasks when everything feels urgent?',
    ],
    keywords: ['focus', 'breathing', 'communication', 'perspective'],
  },
  {
    id: 'iq-8',
    category: INTERVIEW_CATEGORIES.SITUATIONAL,
    question: 'You notice a colleague taking food from the kitchen without paying. What do you do?',
    difficulty: 'intermediate',
    tip: 'This tests your integrity. Be honest — do not say you would ignore it.',
    exampleAnswer:
      'That is a difficult situation because I do not want to get a colleague in trouble. But I also know that if it is not addressed, it hurts the business and ultimately everyone\'s jobs. I would first speak to the colleague privately: "I saw what happened — I am not going to pretend I did not. Can you please sort it out with the manager?" If they refused, I would report it to a manager quietly and professionally. Doing nothing is not an option for me.',
    followUps: [
      'What if the colleague was a good friend of yours?',
      'What if management did not act on your report?',
    ],
    keywords: ['integrity', 'honesty', 'professionalism', 'courage'],
  },
  {
    id: 'iq-9',
    category: INTERVIEW_CATEGORIES.MOTIVATION,
    question: 'Where do you see yourself in two years?',
    difficulty: 'beginner',
    tip: 'Show ambition without being unrealistic. Tie your answer back to this job.',
    exampleAnswer:
      'In two years I want to be a senior waiter or team leader. I want to understand every part of how this restaurant works — not just the floor, but how orders are managed, how shifts are planned, how the kitchen communicates with front of house. That knowledge would make me a better team member today, and a good supervisor in the future.',
    followUps: [
      'Why do you want to move into a leadership role?',
      'What are you doing now to prepare for that?',
    ],
    keywords: ['ambition', 'growth', 'leadership', 'realistic'],
  },
  {
    id: 'iq-10',
    category: INTERVIEW_CATEGORIES.EXPERIENCE,
    question: 'What is your greatest strength, and how does it help you in this role?',
    difficulty: 'beginner',
    tip: 'Pick ONE real strength. Connect it directly to what the job needs. Give a small example.',
    exampleAnswer:
      'My greatest strength is that I make people feel comfortable very quickly. I smile easily, I ask questions, and I pay attention to what people say. In hospitality, that matters from the first second a guest walks in. A customer who feels welcomed is more relaxed, more patient, and more likely to come back.',
    followUps: [
      'Give me an example of when that strength helped you.',
      'Can you think of a time your strength became a weakness?',
    ],
    keywords: ['self-awareness', 'relevance', 'example', 'confidence'],
  },
  {
    id: 'iq-11',
    category: INTERVIEW_CATEGORIES.EXPERIENCE,
    question: 'What is one area you are actively working to improve?',
    difficulty: 'beginner',
    tip: 'Be honest about a real weakness — but always show you are doing something about it.',
    exampleAnswer:
      'I sometimes try to handle everything myself instead of asking for help early enough. I am working on that by reminding myself that asking for help is not weakness — it is teamwork. I have started practising saying "Can I get a hand with this?" earlier in the process, and it has made a real difference in how smoothly things go.',
    followUps: [
      'How long have you been aware of this?',
      'What progress have you made so far?',
    ],
    keywords: ['honesty', 'growth mindset', 'self-improvement', 'action'],
  },
  {
    id: 'iq-12',
    category: INTERVIEW_CATEGORIES.SITUATIONAL,
    question: 'A customer asks you a question about the menu that you do not know the answer to. What do you do?',
    difficulty: 'beginner',
    tip: 'Never guess or make something up. Honesty and quick action is the right response.',
    exampleAnswer:
      'I would be honest immediately: "Great question — let me find out for you right now." I would check with the kitchen or a more experienced colleague, then come back quickly with the right answer. I would never guess or say something I am not sure about, especially around allergens or ingredients, because that can cause real harm.',
    followUps: [
      'What if the customer was in a hurry?',
      'What if nobody around you knew the answer either?',
    ],
    keywords: ['honesty', 'initiative', 'allergens', 'knowledge'],
  },
  {
    id: 'iq-13',
    category: INTERVIEW_CATEGORIES.CUSTOMER_SERVICE,
    question: 'How do you greet a guest who walks into the restaurant?',
    difficulty: 'beginner',
    tip: 'First impressions are everything. Show warmth, eye contact, and action within 30 seconds.',
    exampleAnswer:
      'The moment a guest walks in, I make eye contact and smile — even if I am busy with another table. Within 30 seconds I would approach them and say something like: "Good evening, welcome! Have you been here before?" If I genuinely cannot get there in 30 seconds, I would catch their eye and mouth "I will be right with you" so they know they have been seen. Nobody should stand at the door feeling invisible.',
    followUps: [
      'What if the restaurant is completely full?',
      'How do you handle a walk-in when there are no available tables?',
    ],
    keywords: ['first impression', 'eye contact', 'warmth', 'acknowledgement'],
  },
  {
    id: 'iq-14',
    category: INTERVIEW_CATEGORIES.SITUATIONAL,
    question: 'You spill a drink on a customer. What do you do?',
    difficulty: 'beginner',
    tip: 'React fast, apologize genuinely, and take action. Do not make excuses.',
    exampleAnswer:
      'First I would apologize immediately and sincerely: "I am so sorry — that was completely my fault." I would grab clean napkins or a cloth right away and help them clean up. I would check if they need anything — a replacement drink, time to recover, or to speak to a manager. Then I would follow up with my manager to see if we should offer anything extra to make it right, like a complimentary dessert.',
    followUps: [
      'How would you feel after that happened?',
      'What would you do to make sure it does not happen again?',
    ],
    keywords: ['accountability', 'apology', 'fast action', 'recovery'],
  },
  {
    id: 'iq-15',
    category: INTERVIEW_CATEGORIES.MOTIVATION,
    question: 'Are you comfortable working evenings, weekends, and public holidays?',
    difficulty: 'beginner',
    tip: 'Be honest. If you have real constraints, state them clearly and professionally.',
    exampleAnswer:
      'Yes, absolutely. I understand that hospitality works when people want to enjoy themselves — evenings, weekends, and holidays are our busiest and most important times. I am fully available and I see working those shifts not as a sacrifice but as part of what makes this industry exciting.',
    followUps: [
      'Do you have any commitments we should know about?',
      'How do you feel about short-notice shift changes?',
    ],
    keywords: ['availability', 'commitment', 'flexibility', 'honesty'],
  },
]

export class InterviewQuestion {
  static getAll() {
    return interviewQuestions
  }

  static getByCategory(category) {
    return interviewQuestions.filter(q => q.category === category)
  }

  static getByDifficulty(difficulty) {
    return interviewQuestions.filter(q => q.difficulty === difficulty)
  }

  static getById(id) {
    return interviewQuestions.find(q => q.id === id)
  }

  static getRandom(count = 5) {
    const shuffled = [...interviewQuestions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  static getCategories() {
    return Object.values(INTERVIEW_CATEGORIES)
  }
}
