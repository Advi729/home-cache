import { Request, Response } from "express";
import fs from "fs/promises";

import { HomeDocument } from "../models/Document.js";
import { extractPdfText } from "../services/documents/textExtractor.js";

import { ingestDocument } from "../services/rag/ingestDocument.js";

export const uploadDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Please upload a PDF document.",
      });

      return;
    }

    const extractedText = await extractPdfText(req.file.path);

    if (!extractedText) {
      await fs.unlink(req.file.path);

      res.status(400).json({
        success: false,
        message:
          "No readable text was found in the PDF. Scanned PDFs will be supported later.",
      });

      return;
    }

    const document = await HomeDocument.create({
      name: req.file.originalname,
      originalName: req.file.originalname,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
      type: req.body.type || "other",
      extractedText,
    });

    const chunkCount = await ingestDocument(
      document._id,
      extractedText
    );

    res.status(201).json({
      success: true,
      message: "Document uploaded and indexed successfully.",
      data: {
        id: document._id,
        name: document.name,
        type: document.type,
        size: document.size,
        extractedTextLength: extractedText.length,
        chunkCount,
        createdAt: document.createdAt,
      },
    });
  } catch (error) {
    console.error("Document upload error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to process document.",
    });
  }
};

// Retrieve multiple documents
export const getDocuments = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const documents = await HomeDocument.find()
      .select("-extractedText")
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