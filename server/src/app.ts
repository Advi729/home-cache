import express from "express";
import cors from "cors";

import documentRoutes from "./routes/document.routes.js"
import chatRoutes from "./routes/chat.routes.js";
import demoRoutes from "./routes/demo.routes.js";

const app = express();

app.use(
  cors({
    origin: String(process.env.CLIENT_API_URL),
  })
);
app.use(express.json());


app.use("/documents", documentRoutes);

app.use("/chat", chatRoutes);

app.use("/demo", demoRoutes);



export default app;