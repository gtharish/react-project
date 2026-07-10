import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import ConnectTo from "./db.js";
import authRoute from "./routes/auth.js";
import notesRoute from "./routes/notes.js";

const result = dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "react-project-8mi05ydid-team-jarvish.vercel.app",
    ],
  })
);;
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
      console.log(process.env.MONGO_URL);
      console.log(result);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

start();