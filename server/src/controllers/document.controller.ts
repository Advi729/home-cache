import { Request, Response } from "express";
// import fs from "fs/promises";

import { HomeDocument } from "../models/Document.js";
import { extractPdfText } from "../services/documents/textExtractor.js";

import { ingestDocument } from "../services/rag/ingestDocument.js";
import { processDocument } from "../services/documents/processDocument.js";

export const uploadDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    res.status(400).json({
      success: false,
      message: "Please upload a PDF document.",
    });

    return;
  }

  let document;

  try {
    /*
     * Create the document immediately.
     * Its initial status is "processing".
     */
    document = await HomeDocument.create({
      name: req.file.originalname,
      originalName: req.file.originalname,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
      type: req.body.type || "other",
      status: "processing",
      extractedText: "",
    });

   const processedDocument =
    await processDocument(
      document._id.toString()
    );

    res.status(201).json({
      success: true,
      message:
        "Document uploaded and indexed successfully.",
      data: {
        id: processedDocument._id,
        name: processedDocument.name,
        type: processedDocument.type,
        status: processedDocument.status,
        size: processedDocument.size,
        chunkCount: processedDocument.chunkCount,
        processedAt:
          processedDocument.processedAt,
        createdAt:
          processedDocument.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "Document processing failed:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Document uploaded, but processing failed.",
      data: {
        id: document?._id,
        status: "failed",
      },
    });
  };
}

// Retrieve multiple documents
export const getDocuments = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const documents = await HomeDocument.find()
      .select(
        "name originalName type status errorMessage size chunkCount processedAt createdAt"
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error("Get documents error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch documents.",
    });
  }
};

// Retrieve single document
export const getDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const document = await HomeDocument.findById(
      req.params.id
    ).select("-extractedText");

    if (!document) {
      res.status(404).json({
        success: false,
        message: "Document not found.",
      });

      return;
    }

    res.json({
      success: true,
      data: document,
    });
  } catch (error) {
    console.error("Get document error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch document.",
    });
  }
};

// Retry document upload
export const retryDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const document =
      await processDocument(String(req.params.id));

    res.json({
      success: true,
      message:
        "Document processed successfully.",
      data: {
        id: document._id,
        status: document.status,
        chunkCount: document.chunkCount,
        processedAt:
          document.processedAt,
      },
    });
  } catch (error) {
    console.error(
      "Document retry failed:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Document processing failed again.",
    });
  }
};