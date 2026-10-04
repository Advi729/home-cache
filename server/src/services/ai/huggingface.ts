import { InferenceClient } from "@huggingface/inference";

const token = process.env.HF_TOKEN;

if (!token) {
  throw new Error("HF_TOKEN is not configured.");
}

export const hf = new InferenceClient(token);

