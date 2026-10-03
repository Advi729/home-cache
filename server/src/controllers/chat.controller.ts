import { Request, Response } from "express";

import { retrieveRelevantChunks } from "../services/rag/retriever.js";

export const searchMemory = async (
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
      question
    );

    res.json({
      success: true,
      data: chunks,
    });
  } catch (error) {
    console.error(
      "Memory search error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to search memory.",
    });
  }
};