import { Request, Response } from "express";

import { generateAnswer } from "../services/ai/llm.js";
import { buildContext } from "../services/rag/contextBuilder.js";
import {
  retrieveRelevantChunks,
} from "../services/rag/retriever.js";

export const chat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { question } = req.body;

    if (
      typeof question !== "string" ||
      !question.trim()
    ) {
      res.status(400).json({
        success: false,
        message: "A question is required.",
      });

      return;
    }

    const chunks = await retrieveRelevantChunks(
      question,
      5
    );

    if (chunks.length === 0) {
      res.json({
        success: true,
        data: {
          answer:
            "I couldn't find any relevant information in your household memory.",
          sources: [],
        },
      });

      return;
    }

    const context = buildContext(chunks);

    const answer = await generateAnswer({
      question,
      context,
    });

    const sources = chunks.map((chunk) => ({
      documentId: chunk.documentId,
      documentName: chunk.documentName,
      chunkIndex: chunk.chunkIndex,
      score: chunk.score,
    }));

    res.json({
      success: true,
      data: {
        answer,
        sources,
      },
    });
  } catch (error) {
    // console.error("Chat error:", error);
    console.error("Chat error:");
    console.dir(error, { depth: null });

    res.status(500).json({
      success: false,
      message: "Failed to generate an answer.",
    });
  }
};