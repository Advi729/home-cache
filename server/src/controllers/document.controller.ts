import { Request, Response } from "express";
import fs from "fs/promises";

import { HomeDocument } from "../models/Document.js";
import { extractPdfText } from "../services/documents/textExtractor.js";

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
console.log('in ctrller req.file: ', req.file);
    const extractedText = await extractPdfText(req.file.path);
    console.log('exttext: ', extractedText);

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

    res.status(201).json({
      success: true,
      message: "Document uploaded successfully.",
      data: {
        ...document,
        id: document._id,
        name: document.name,
        type: document.type,
        size: document.size,
        extractedTextLength: extractedText.length,
        // createdAt: document.createdAt,
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