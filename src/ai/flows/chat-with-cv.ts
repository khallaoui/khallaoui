'use server';

/**
 * @fileOverview A chatbot flow that answers questions based on CV data.
 *
 * - chatWithCv - A function that takes a question and returns an answer about the CV.
 * - ChatWithCvInput - The input type for the chatWithCv function.
 * - ChatWithCvOutput - The return type for the chatWithCv function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  personalData,
  experiences,
  education,
  skills,
  projects,
  certifications,
  hobbies,
  languages,
} from '@/lib/data';
import messagesEn from '../../../messages/en.json';
import messagesFr from '../../../messages/fr.json';

const ChatWithCvInputSchema = z.object({
  question: z.string().describe("The user's question about the CV."),
  locale: z.enum(['en', 'fr']).default('en'),
});
export type ChatWithCvInput = z.infer<typeof ChatWithCvInputSchema>;

const ChatWithCvOutputSchema = z.object({
  answer: z.string().describe("The answer to the user's question."),
});
export type ChatWithCvOutput = z.infer<typeof ChatWithCvOutputSchema>;

export async function chatWithCv(
  input: ChatWithCvInput
): Promise<ChatWithCvOutput> {
  return chatWithCvFlow(input);
}

const getCvContext = (locale: 'en' | 'fr') => {
  const t = locale === 'en' ? messagesEn : messagesFr;

  const cvContext = `
    CV of ${t.personalData.name}, ${t.personalData.headline}.
    Contact: ${t.personalData.contact.email}, ${t.personalData.contact.phone}, ${t.personalData.contact.address}.
    Socials: ${personalData.socials.map(s => `${s.name}: ${s.url}`).join(', ')}.
    About: ${t.personalData.about}.

    Experience:
    ${experiences
      .map(
        (exp, index) =>
          `- ${t.Experience.items[index].role} at ${exp.company} (${exp.duration}): ${t.Experience.items[index].description}`
      )
      .join('\n')}

    Education:
    ${education
      .map((edu, index) => `- ${t.Education.items[index].degree} from ${edu.institution} (${edu.duration})`)
      .join('\n')}

    Skills:
    ${skills
      .map(
        (cat, index) =>
          `- ${t.Skills.categories[index].title}: ${cat.skillNames.join(', ')}`
      )
      .join('\n')}
      
    Projects:
    ${projects
      .map(
        (proj, index) =>
          `- ${t.Projects.items[index].title}: ${t.Projects.items[index].description} (Tags: ${proj.tags.join(', ')})`
      )
      .join('\n')}

    Certifications:
    ${certifications.map((cert, index) => `- ${t.Certifications.items[index].title} from ${t.Certifications.items[index].issuer}`).join('\n')}

    Hobbies: ${t.Hobbies.hobbies.join(', ')}.
    
    Languages: ${t.Hobbies.languages.map(l => `${l.name} (${l.level})`).join(', ')}.
  `;
  return cvContext;
};


const prompt = ai.definePrompt({
  name: 'chatWithCvPrompt',
  input: {schema: ChatWithCvInputSchema},
  output: {schema: ChatWithCvOutputSchema},
  system: `You are a helpful AI assistant for a personal portfolio website. Your name is 'KineticBot'.
  You are chatting with a user who is interested in learning more about the person whose portfolio this is.
  Use the following CV information to answer the user's questions.
  The user is viewing the site in the language: {{{locale}}}. Respond in that language.
  Be friendly, concise, and helpful. If you don't know the answer from the context provided, say that you don't have that information.
  Do not make up information.
  
  CV Context:
  {{{cvContext}}}
  `,
  prompt: `The user asks: {{{question}}}`,
});

const chatWithCvFlow = ai.defineFlow(
  {
    name: 'chatWithCvFlow',
    inputSchema: ChatWithCvInputSchema,
    outputSchema: ChatWithCvOutputSchema,
  },
  async input => {
    const cvContext = getCvContext(input.locale);
    const {output} = await prompt({ ...input, cvContext });
    return output!;
  }
);
