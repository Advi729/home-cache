import { Types } from "mongoose";

import { DocumentChunk } from "../../models/DocumentChunk.js";
import { chunkText } from "./chunker.js";
import { generateEmbedding } from "./embeddings.js";

export const ingestDocument = async (
  documentId: Types.ObjectId,
  text: string
): Promise<number> => {
  const chunks = chunkText(text);

  if (chunks.length === 0) {
    throw new Error(
      "Document does not contain readable text."
    );
  }

  const documents = [];

  for (let index = 0; index < chunks.length; index++) {
    const content = chunks[index];

    const embedding =
      await generateEmbedding(content!);

    documents.push({
      documentId,
      content,
      embedding,
      chunkIndex: index,
    });
  }

  await DocumentChunk.insertMany(documents);

  return documents.length;
};