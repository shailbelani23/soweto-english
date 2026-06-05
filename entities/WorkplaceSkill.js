export const workplaceSkills = [
  {
    id: 'ws-1',
    name: 'Communication',
    description: 'Speaking clearly, listening well, and writing professionally.',
    icon: '🗣️',
    color: 'blue',
    subskills: [
      'Speaking to customers confidently',
      'Writing a professional email',
      'Listening without interrupting',
      'Giving and receiving feedback',
      'Using respectful language',
    ],
    relevantLessons: ['l-wb-2', 'l-tw-1', 'l-tw-2'],
  },
  {
    id: 'ws-2',
    name: 'Customer Service',
    description: 'Making guests feel valued, handling complaints, and resolving problems.',
    icon: '⭐',
    color: 'yellow',
    subskills: [
      'Greeting guests warmly',
      'Taking orders accurately',
      'Handling complaints calmly',
      'Knowing the menu',
      'Upselling naturally',
    ],
    relevantLessons: ['l-cs-1', 'l-cs-2', 'l-cs-3'],
  },
  {
    id: 'ws-3',
    name: 'Professionalism',
    description: 'Showing up, following through, and representing the business well.',
    icon: '💼',
    color: 'purple',
    subskills: [
      'Punctuality and reliability',
      'Personal presentation',
      'Managing your phone at work',
      'Owning your mistakes',
      'Handling pressure without showing it',
    ],
    relevantLessons: ['l-wb-1', 'l-wb-2'],
  },
  {
    id: 'ws-4',
    name: 'Teamwork',
    description: 'Supporting colleagues, sharing responsibility, and building trust.',
    icon: '🤝',
    color: 'green',
    subskills: [
      'Reading your team\'s needs',
      'Offering help proactively',
      'Handling conflict professionally',
      'Communicating under pressure',
      'Building trust over time',
    ],
    relevantLessons: ['l-tw-1', 'l-tw-2'],
  },
  {
    id: 'ws-5',
    name: 'Problem Solving',
    description: 'Staying calm, thinking fast, and finding solutions when things go wrong.',
    icon: '🧠',
    color: 'orange',
    subskills: [
      'Staying calm under pressure',
      'Identifying the real problem',
      'Thinking of options quickly',
      'Knowing when to escalate',
      'Following up on solutions',
    ],
    relevantLessons: ['l-ps-1', 'l-ps-2'],
  },
  {
    id: 'ws-6',
    name: 'Safety Awareness',
    description: 'Keeping yourself, your team, and your customers safe.',
    icon: '🛡️',
    color: 'red',
    subskills: [
      'Food hygiene rules',
      'Preventing slips and falls',
      'Reporting hazards',
      'Emergency procedures',
      'Safe food temperature rules',
    ],
    relevantLessons: ['l-sf-1', 'l-sf-2'],
  },
]

export class WorkplaceSkill {
  static getAll() {
    return workplaceSkills
  }

  static getById(id) {
    return workplaceSkills.find(s => s.id === id)
  }
}
