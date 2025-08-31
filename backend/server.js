import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import recordRouter from "./routes/records.js";

import { connectDB } from "./lib/db_connect.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/record", recordRouter);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
