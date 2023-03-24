import "./config.js";
import express from "express";
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRouter.js";
import vanRouter from "./routes/vanRouter.js";
import cors from "cors";
// import data from "./data.json" assert { type: "json" }
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 5000;

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "../dist")));

// middleware
app.use(express.json());
app.use(cors());

// POST - LOGIN
app.use("/api/v1/auth", authRouter);

app.use("/api", vanRouter);

const start = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log("Server ist listening on PORT:", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
