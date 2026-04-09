export const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    text: "Which of the following is the most effective way to provide constructive feedback?",
    options: [
      "Focus on personality traits rather than specific behaviors.",
      "Be specific, timely, and focus on observable actions.",
      "Wait until the annual review to discuss all issues at once.",
      "Avoid direct feedback to maintain a positive atmosphere."
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "When managing a high-priority project with a tight deadline, what is the best approach to ensure team alignment?",
    options: [
      "Set individual goals and let team members work independently.",
      "Conduct daily 15-minute stand-up meetings to address blockers.",
      "Email the project plan once and assume everyone understands it.",
      "Micro-manage every task to guarantee quality control."
    ],
    correctAnswer: 1
  }
];

export const SCENARIO_DATA = {
  title: "Scenario: The Conflict Resolution",
  description: "Your team has two members who are disagreeing on the technical architecture of a new feature. This is delaying the project. How do you intervene?",
  options: [
    {
      id: 'a',
      title: "Facilitate a Workshop",
      description: "Host a technical brainstorming session where both sides present their pros and cons objectively.",
      feedback: "Great choice! This fosters collaboration and data-driven decision making."
    },
    {
      id: 'b',
      title: "Make the Executive Decision",
      description: "Review both proposals privately and dictate which one to follow to save time.",
      feedback: "While fast, this might lead to resentment and lower team buy-in for the chosen path."
    },
    {
      id: 'c',
      title: "Assign a Third-Party Lead",
      description: "Ask a senior engineer from another team to mediate and make the final choice.",
      feedback: "Neutral mediation is helpful, but might undermine your authority as a team leader."
    }
  ]
};