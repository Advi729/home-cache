import { DocumentChunk } from "../../models/DocumentChunk.js";
import { generateEmbedding } from "./embeddings.js";

export interface RetrievedChunk {
  content: string;
  documentId: string;
  chunkIndex: number;
  score: number;
  documentName?: string;
}

export const retrieveRelevantChunks = async (
  query: string,
  limit = 5
): Promise<RetrievedChunk[]> => {
  const queryEmbedding = await generateEmbedding(query);

  const results = await DocumentChunk.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 50,
        limit,
      },
    },

    {
      $lookup: {
        from: "homedocuments",
        localField: "documentId",
        foreignField: "_id",
        as: "document",
      },
    },

    {
      $unwind: {
        path: "$document",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $project: {
        _id: 0,
        content: 1,
        documentId: 1,
        chunkIndex: 1,

        score: {
          $meta: "vectorSearchScore",
        },

        documentName: "$document.name",
      },
    },
  ]);

  return results;
};