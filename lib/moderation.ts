// lib/moderation.ts

const bannedWords = [

  // Violence / crime
  "kill",
  "murder",
  "bomb",
  "terrorist",

  // Drugs
  "cocaine",
  "heroin",
  "meth",

  // Hate / abuse
  "racist",
  "hate",
  "abuse",

  // Sexual / adult
  "bikkini",
  "undress",
  "nude",
  "sex",
  "xxx",
];

export function containsBannedContent(text: string): string | null {
  const lower = text.toLowerCase();

  for (const word of bannedWords) {
    if (lower.includes(word)) {
      return word;
    }
  }

  return null;
}
