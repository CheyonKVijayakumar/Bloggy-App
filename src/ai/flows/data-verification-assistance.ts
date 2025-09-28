'use server';

/**
 * @fileOverview An AI agent that assists verifiers in identifying potential inaccuracies in uploaded data.
 *
 * - verifyDataAccuracy - A function that analyzes uploaded data and flags potential inaccuracies.
 * - VerifyDataAccuracyInput - The input type for the verifyDataAccuracy function.
 * - VerifyDataAccuracyOutput - The return type for the verifyDataAccuracy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyDataAccuracyInputSchema = z.object({
  projectId: z.number().describe('The ID of the project.'),
  recordId: z.number().describe('The ID of the data record to verify.'),
  dataHash: z.string().describe('The IPFS hash or verified data summary.'),
  sequestrationDelta: z
    .number()
    .describe('The change in carbon sequestration.'),
  projectDetails: z.string().describe('Details about the project.'),
});
export type VerifyDataAccuracyInput = z.infer<typeof VerifyDataAccuracyInputSchema>;

const VerifyDataAccuracyOutputSchema = z.object({
  flaggedInaccuracies: z
    .string()
    .describe(
      'A summary of potential inaccuracies flagged in the data, or a message indicating no inaccuracies were found.'
    ),
});
export type VerifyDataAccuracyOutput = z.infer<typeof VerifyDataAccuracyOutputSchema>;

export async function verifyDataAccuracy(
  input: VerifyDataAccuracyInput
): Promise<VerifyDataAccuracyOutput> {
  return verifyDataAccuracyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyDataAccuracyPrompt',
  input: {schema: VerifyDataAccuracyInputSchema},
  output: {schema: VerifyDataAccuracyOutputSchema},
  prompt: `You are an AI assistant that helps verifiers identify potential inaccuracies in carbon sequestration data.

  Analyze the following data and flag any potential inaccuracies or inconsistencies. Provide a detailed summary of your findings.

  Project Details: {{{projectDetails}}}
  Record ID: {{{recordId}}}
  Data Hash: {{{dataHash}}}
  Sequestration Delta: {{{sequestrationDelta}}}

  Respond with a summary of potential inaccuracies flagged in the data, or a message indicating no inaccuracies were found.
  `,
});

const verifyDataAccuracyFlow = ai.defineFlow(
  {
    name: 'verifyDataAccuracyFlow',
    inputSchema: VerifyDataAccuracyInputSchema,
    outputSchema: VerifyDataAccuracyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
