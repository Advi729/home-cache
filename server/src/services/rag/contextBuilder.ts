import { RetrievedChunk } from "./retriever.js";

export const buildContext = (
  chunks: RetrievedChunk[]
): string => {
  return chunks
    .map(
      (chunk, index) => `
      SOURCE ${index + 1}
      Document: ${chunk.documentName ?? "Unknown document"}
      Chunk: ${chunk.chunkIndex}

      ${chunk.content}
      `.trim()
    )
    .join("\n\n---\n\n");
};