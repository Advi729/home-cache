import { Router } from "express";

import { getDocument, getDocuments, retryDocument, uploadDocument } from "../controllers/document.controller.js";
import { uploadDocument as upload } from "../config/upload.js";

const router = Router();

// Retrieve all documents
router.get("/", getDocuments);

// Upload document
router.post("/", upload.single("document"), uploadDocument);

// Retrieve single document
router.get("/:id", getDocument);

// Retry document upload
router.post("/:id/retry", upload.single("document"), retryDocument);

export default router;