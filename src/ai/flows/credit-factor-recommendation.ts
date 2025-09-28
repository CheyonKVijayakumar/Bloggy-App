'use server';

/**
 * @fileOverview An AI agent for recommending carbon credit factor values.
 *
 * - recommendCreditFactor - A function that recommends a credit factor based on blue carbon source type and market forces.
 * - CreditFactorRecommendationInput - The input type for the recommendCreditFactor function.
 * - CreditFactorRecommendationOutput - The return type for the recommendCreditFactor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreditFactorRecommendationInputSchema = z.object({
  blueCarbonSourceType: z
    .string()
    .describe('The type of blue carbon source (e.g., mangroves, seagrass beds, salt marshes).'),
  marketConditions: z
    .string()
    .describe('Description of current market conditions affecting carbon credit pricing.'),
  sequestrationAmount: z
    .number()
    .describe('The amount of carbon sequestration in tons of CO2 equivalent (tCO2e).'),
});
export type CreditFactorRecommendationInput = z.infer<
  typeof CreditFactorRecommendationInputSchema
>;

const CreditFactorRecommendationOutputSchema = z.object({
  recommendedFactor: z
    .number()
    .describe(
      'The recommended factor value for calculating carbon credits, based on blue carbon source type and market forces.'
    ),
  rationale: z
    .string()
    .describe(
      'The AI’s reasoning for the recommended factor, including how the blue carbon source type and market conditions influence the factor value.'
    ),
});
export type CreditFactorRecommendationOutput = z.infer<
  typeof CreditFactorRecommendationOutputSchema
>;

export async function recommendCreditFactor(
  input: CreditFactorRecommendationInput
): Promise<CreditFactorRecommendationOutput> {
  return recommendCreditFactorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'creditFactorRecommendationPrompt',
  input: {schema: CreditFactorRecommendationInputSchema},
  output: {schema: CreditFactorRecommendationOutputSchema},
  prompt: `You are an AI assistant that recommends a factor for calculating carbon credits based on the blue carbon source type, current market conditions, and sequestration amount.

  Given the following information, provide a recommended factor value and explain your reasoning:

  Blue Carbon Source Type: {{{blueCarbonSourceType}}}
  Market Conditions: {{{marketConditions}}}
  Sequestration Amount: {{{sequestrationAmount}}} tCO2e

  Consider the scarcity and ecological importance of the blue carbon source, as well as current market demand and pricing trends for carbon credits.  Justify how these factors influence the factor value you recommend.

  Ensure that the recommendation promotes fair market values for the carbon credits.
  `,
});

const recommendCreditFactorFlow = ai.defineFlow(
  {
    name: 'recommendCreditFactorFlow',
    inputSchema: CreditFactorRecommendationInputSchema,
    outputSchema: CreditFactorRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
