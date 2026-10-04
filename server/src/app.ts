import express from "express";
import cors from "cors";

import documentRoutes from "./routes/document.routes.js"
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());


app.use("/api/documents", documentRoutes);

app.use("/api/chat", chatRoutes);



export default app;