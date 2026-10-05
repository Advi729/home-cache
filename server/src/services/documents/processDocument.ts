import { HomeDocument } from "../../models/Document.js";
import { extractPdfText } from "./textExtractor.js";
import { ingestDocument } from "../rag/ingestDocument.js";
import { DocumentChunk } from "../../models/DocumentChunk.js";

export const processDocument = async (
  documentId: string 
) => {
  const document =
    await HomeDocument.findById(documentId);

  if (!document) {
    throw new Error("Document not found.");
  }

  if (!document.filePath) {
    throw new Error(
      "Document does not have an associated file."
    );
  }

  document.status = "processing";
  document.errorMessage = undefined;

  await document.save();

  try {
    const extractedText =
      await extractPdfText(document.filePath);

    if (!extractedText) {
      throw new Error(
        "No readable text was found in the PDF."
      );
    }

    document.extractedText = extractedText;

    /*
     * Remove previously generated chunks before
     * re-processing.
     */
    await DocumentChunk.deleteMany({
      documentId: document._id,
    });

    const chunkCount = await ingestDocument(
      document._id,
      extractedText
    );

    document.chunkCount = chunkCount;
    document.status = "ready";
    document.processedAt = new Date();
    document.errorMessage = undefined;

    await document.save();

    return document;
  } catch (error) {
    document.status = "failed";

    document.errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown processing error";

    await document.save();

    throw error;
  }
};