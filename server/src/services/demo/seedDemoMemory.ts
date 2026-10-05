import { HomeDocument } from "../../models/Document.js";
import { DocumentChunk } from "../../models/DocumentChunk.js";
import { demoDocuments } from "../../data/demoMemory.js";
import { ingestDocument } from "../rag/ingestDocument.js";

export const seedDemoMemory = async () => {
  const existingDemoDocuments =
    await HomeDocument.find({
      "metadata.demo": true,
    });

  /*
   * Demo memory is already completely available.
   */
  if (
    existingDemoDocuments.length ===
    demoDocuments.length &&
    existingDemoDocuments.every(
      (document) =>
        document.status === "ready"
    )
  ) {
    return {
      seeded: false,
      documents: existingDemoDocuments,
    };
  }

  /*
   * Remove incomplete demo data so we can
   * safely rebuild the demo memory.
   */
  if (existingDemoDocuments.length > 0) {
    const documentIds =
      existingDemoDocuments.map(
        (document) => document._id
      );

    await DocumentChunk.deleteMany({
      documentId: {
        $in: documentIds,
      },
    });

    await HomeDocument.deleteMany({
      _id: {
        $in: documentIds,
      },
    });
  }

  const createdDocuments = [];

  for (const demo of demoDocuments) {
    const document = await HomeDocument.create({
      name: demo.name,
      originalName: demo.name,

      /*
       * Demo documents do not have a physical file.
       */
      mimeType: "text/plain",

      size: Buffer.byteLength(
        demo.content,
        "utf8"
      ),

      type: demo.type,

      status: "processing",

      extractedText: demo.content,

      metadata: {
        demo: true,
      },
    });

    try {
      const chunkCount =
        await ingestDocument(
          document._id,
          demo.content
        );

      document.status = "ready";
      document.chunkCount = chunkCount;
      document.processedAt = new Date();

      await document.save();

      createdDocuments.push(document);
    } catch (error) {
      document.status = "failed";

      document.errorMessage =
        error instanceof Error
          ? error.message
          : "Demo ingestion failed.";

      await document.save();

      throw error;
    }
  }

  return {
    seeded: true,
    documents: createdDocuments,
  };
};