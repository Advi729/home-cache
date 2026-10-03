import { Router } from "express";

import { uploadDocument } from "../controllers/document.controller.js";
import { uploadDocument as upload } from "../config/upload.js";

const router = Router();

router.post("/", upload.single("document"), uploadDocument);

export default router;