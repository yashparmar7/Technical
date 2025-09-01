import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import recordRouter from "./routes/records.js";
import path from "path";

import { connectDB } from "./lib/db_connect.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", recordRouter);

const { PORT } = process.env;
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
