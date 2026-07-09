import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import ConnectTo from "./db.js";
import authRoute from "./routes/auth.js";
import notesRoute from "./routes/notes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/auth", authRoute);
app.use("/api/auth", notesRoute);

const start = async () => {
  try {
    await ConnectTo();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

start();