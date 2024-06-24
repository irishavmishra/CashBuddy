import express from "express";
import dotenv from "dotenv";
import "./db/db.js";
import cors from "cors";
dotenv.config();
import { router } from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

// Simple CORS configuration
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use("/api/v1", router);

app.listen(port, () => {
  console.log("App is listening on port", port);
});
