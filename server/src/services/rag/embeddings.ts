import { hf } from "../ai/huggingface.js";

const EMBEDDING_MODEL = "BAAI/bge-small-en-v1.5";

export const generateEmbedding = async (
  text: string
): Promise<number[]> => {
  const result = await hf.featureExtraction({
    model: EMBEDDING_MODEL,
    inputs: text,
  });

  if (!Array.isArray(result)) {
    throw new Error("Unexpected embedding response.");
  }

  if (
    result.length > 0 &&
    Array.isArray(result[0])
  ) {
    return result[0] as number[];
  }

  return result as number[];
};