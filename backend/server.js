import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

// app config

const app = express();
const port = process.env.PORT || 4000;

// Middleware configuration

app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// Api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/images", express.static("uploads"));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listen in port http://localhost:${port}`);
});
