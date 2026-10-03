import express from "express";
import cors from "cors";

import documentRoutes from "./routes/document.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Home Cache API is running",
  });
});

app.use("/api/documents", documentRoutes);



export default app;