const prompts = [
  "What made you smile today?",
  "What are you grateful for?",
  "What challenged you today?",
  "What's one thing you’re proud of?",
  "Describe your mood in one word.",
];

export function getRandomPrompt(): string {
  return prompts[Math.floor(Math.random() * prompts.length)];
}
