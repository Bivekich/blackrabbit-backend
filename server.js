import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouters from "./routes/UserRoutes.js";
import moviesRouters from "./routes/MoviesRoutes.js";
import categoriesRouters from "./routes/CategoriesRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB().then();

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/users", userRouters);
app.use("/api/movies", moviesRouters);
app.use("/api/categories", categoriesRouters);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const URL = process.env.SERVER_URL;

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${URL}:${PORT}`);
});
