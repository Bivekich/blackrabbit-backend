import express from "express";
import * as moviesController from "../controllers/MoviesController.js";
import { protect, admin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/import", moviesController.importMovies);
router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovieById);
router.get("/rated/top", moviesController.getTopRatedMovies);
router.get("/random/all", moviesController.getRandomMovies);
router.post("/:id/reviews", protect, moviesController.createMovieReview);
router.put("/:id", protect, admin, moviesController.updateMovie);
router.delete("/:id", protect, admin, moviesController.deleteMovie);
router.delete("/", protect, admin, moviesController.deleteAllMovies);
router.post("/", protect, admin, moviesController.createMovie);

export default router;
