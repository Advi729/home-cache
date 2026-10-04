import { Request, Response } from "express";
// import fs from "fs/promises";

import { HomeDocument } from "../models/Document.js";
import { extractPdfText } from "../services/documents/textExtractor.js";

import { ingestDocument } from "../services/rag/ingestDocument.js";

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
     * 1. Create the document immediately.
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

    /*
     * 2. Extract PDF text.
     */
    const extractedText = await extractPdfText(
      req.file.path
    );

    if (!extractedText) {
      await HomeDocument.findByIdAndUpdate(
        document._id,
        {
          status: "failed",
          errorMessage:
            "No readable text was found in the PDF.",
        }
      );

      // Keep the original file so it can be
      // reprocessed later using OCR.
      // await fs.unlink(req.file.path);

      res.status(400).json({
        success: false,
        message:
          "No readable text was found in the PDF.",
        data: {
          id: document._id,
          status: "failed",
        },
      });

      return;
    }

    /*
     * 3. Save extracted text.
     */
    document.extractedText = extractedText;

    await document.save();

    /*
     * 4. Generate chunks and embeddings.
     */
    const chunkCount = await ingestDocument(
      document._id,
      extractedText
    );

    /*
     * 5. Everything succeeded.
     */
    document.chunkCount = chunkCount;
    document.status = "ready";
    document.processedAt = new Date();

    await document.save();

    res.status(201).json({
      success: true,
      message:
        "Document uploaded and indexed successfully.",
      data: {
        id: document._id,
        name: document.name,
        type: document.type,
        status: document.status,
        size: document.size,
        extractedTextLength:
          extractedText.length,
        chunkCount,
        createdAt: document.createdAt,
      },
    });
  } catch (error) {
    console.error("Document processing error:", error);

    /*
     * If the document was already created,
     * mark it as failed rather than losing
     * the processing state.
     */
    if (document?._id) {
      await HomeDocument.findByIdAndUpdate(
        document._id,
        {
          status: "failed",
          errorMessage:
            error instanceof Error
              ? error.message
              : "Unknown processing error",
        }
      );
    }

    res.status(500).json({
      success: false,
      message:
        "Document uploaded, but processing failed.",
      data: document
        ? {
            id: document._id,
            status: "failed",
          }
        : undefined,
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