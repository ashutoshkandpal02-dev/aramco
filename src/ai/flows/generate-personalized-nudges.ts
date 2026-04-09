'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating personalized follow-up nudges.
 *
 * - generatePersonalizedNudges - A function that generates personalized nudges based on user commitments and timeline.
 * - GenerateNudgesInput - The input type for the generatePersonalizedNudges function.
 * - GenerateNudgesOutput - The return type for the generatePersonalizedNudges function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateNudgesInputSchema = z.object({
  commitments: z.array(z.string()).describe('An array of the user\'s action plan commitments.'),
  timeline: z.enum(['1 week', '2 weeks', '1 month']).describe('The user\'s chosen timeline for the action plan.'),
  language: z.enum(['en', 'ar']).optional().default('en').describe('The language for the nudge messages.'),
});
export type GenerateNudgesInput = z.infer<typeof GenerateNudgesInputSchema>;

const GenerateNudgesOutputSchema = z.object({
  day1Nudge: z.string().describe('A personalized, encouraging nudge message for Day 1.'),
  day3Nudge: z.string().describe('A personalized, encouraging nudge message for Day 3.'),
  day7Nudge: z.string().describe('A personalized, encouraging nudge message for Day 7.'),
});
export type GenerateNudgesOutput = z.infer<typeof GenerateNudgesOutputSchema>;

export async function generatePersonalizedNudges(input: GenerateNudgesInput): Promise<GenerateNudgesOutput> {
  return generatePersonalizedNudgesFlow(input);
}

const generateNudgesPrompt = ai.definePrompt({
  name: 'generateNudgesPrompt',
  input: { schema: GenerateNudgesInputSchema },
  output: { schema: GenerateNudgesOutputSchema },
  prompt: `You are an AI assistant designed to provide encouraging, personalized follow-up nudges for users based on their action plans.

The user has committed to the following actions:
{{#each commitments}}
- {{{this}}}
{{/each}}

Their chosen timeline for these commitments is: {{{timeline}}}.

{{#if (eq language "ar")}}
Please respond entirely in Arabic (العربية). Generate three personalized, friendly, and encouraging follow-up nudge messages in Arabic, tailored to the user's specific commitments and timeline. Use a positive and supportive tone.
{{else}}
Please generate three personalized, friendly, and encouraging follow-up nudge messages in English, tailored to the user's specific commitments and timeline. Use a positive and supportive tone.
{{/if}}

1.  **Day 1 Nudge**: A message for the day after they submit their plan, encouraging them to make a positive start.
2.  **Day 3 Check-in**: A message for three days after submission, checking in on their progress and offering support.
3.  **Day 7 Reinforcement**: A message for seven days after submission, reinforcing their efforts and encouraging continued progress.

Output a JSON object with keys 'day1Nudge', 'day3Nudge', and 'day7Nudge'.`,
});

const generatePersonalizedNudgesFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedNudgesFlow',
    inputSchema: GenerateNudgesInputSchema,
    outputSchema: GenerateNudgesOutputSchema,
  },
  async (input) => {
    const { output } = await generateNudgesPrompt(input);
    return output!;
  },
);
