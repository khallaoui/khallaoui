'use server';

/**
 * @fileOverview Suggests relevant projects and experience based on user interests.
 *
 * - suggestRelevantProjects - A function that suggests relevant projects.
 * - SuggestRelevantProjectsInput - The input type for the suggestRelevantProjects function.
 * - SuggestRelevantProjectsOutput - The return type for the suggestRelevantProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantProjectsInputSchema = z.object({
  areasOfInterest: z
    .string()
    .describe('A comma separated list of areas the user is interested in.'),
});
export type SuggestRelevantProjectsInput = z.infer<
  typeof SuggestRelevantProjectsInputSchema
>;

const SuggestRelevantProjectsOutputSchema = z.object({
  relevantProjects: z
    .string()
    .describe(
      'A list of relevant project names or descriptions to showcase, tailored to the users areas of interest.'
    ),
  relevantExperience: z
    .string()
    .describe(
      'A list of relevant experiences or roles to showcase, tailored to the users areas of interest.'
    ),
});
export type SuggestRelevantProjectsOutput = z.infer<
  typeof SuggestRelevantProjectsOutputSchema
>;

export async function suggestRelevantProjects(
  input: SuggestRelevantProjectsInput
): Promise<SuggestRelevantProjectsOutput> {
  return suggestRelevantProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantProjectsPrompt',
  input: {schema: SuggestRelevantProjectsInputSchema},
  output: {schema: SuggestRelevantProjectsOutputSchema},
  prompt: `You are a helpful portfolio assistant. A user has expressed interest in the following areas: {{{areasOfInterest}}}. Based on these interests, suggest which projects and experiences from my portfolio I should highlight to them. Return results as comma separated lists.

Example:
areasOfInterest: AI, Machine Learning
relevantProjects: Project A (AI-powered chatbot), Project B (Machine Learning model for image recognition)
relevantExperience: AI Research Intern at Company X, Machine Learning Engineer at Company Y`,
});

const suggestRelevantProjectsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantProjectsFlow',
    inputSchema: SuggestRelevantProjectsInputSchema,
    outputSchema: SuggestRelevantProjectsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
