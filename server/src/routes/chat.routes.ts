import { Router } from "express";

import {
  chat,
} from "../controllers/chat.controller.js";

const router = Router();

// Search the relevant document
router.post("/", chat);

export default router;