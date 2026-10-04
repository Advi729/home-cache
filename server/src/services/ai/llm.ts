import { hf } from "./huggingface.js";

const MODEL = "google/gemma-2-2b-it:featherless-ai";

interface GenerateAnswerParams {
  question: string;
  context: string;
}

export const generateAnswer = async ({
  question,
  context,
}: GenerateAnswerParams): Promise<string> => {
  const prompt = `
You are HomeCache, a private household memory assistant.

Your job is to help a household remember information stored
in its documents.

RULES:

1. Use only the supplied household memory.
2. Never invent information.
3. If the answer isn't supported by the memory, say so.
4. When possible, mention the relevant document.
5. Be concise and practical.
6. Preserve exact dates, amounts, product names, and warranty
   periods from the source.
7. Do not claim that you remember something unless it exists
   in the supplied memory.


HOUSEHOLD MEMORY:
${context}

USER QUESTION:
${question}

ANSWER:
`.trim();

  const response = await hf.chatCompletion({
    model: MODEL,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 300,
    temperature: 0.2,
  });

  return response.choices[0]?.message?.content?.trim() ?? "";
};