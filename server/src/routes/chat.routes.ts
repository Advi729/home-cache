import { Router } from "express";

import { searchMemory } from "../controllers/chat.controller.js";

const router = Router();

// Search the relevant document
router.post("/search", searchMemory);

export default router;