import { Router } from "express";

import { getDocument, getDocuments, uploadDocument } from "../controllers/document.controller.js";
import { uploadDocument as upload } from "../config/upload.js";

const router = Router();

// Retrieve all documents
router.get("/", getDocuments);

// Upload document
router.post("/", upload.single("document"), uploadDocument);

// Retrieve single document
router.get("/:id", getDocument);

export default router;