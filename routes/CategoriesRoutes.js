import express from "express";
import * as categoriesContollers from "../controllers/CategoriesController.js";
import { protect, admin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", categoriesContollers.getCategories);
router.post("/", protect, admin, categoriesContollers.createCategory);
router.put("/:id", protect, admin, categoriesContollers.updateCategory);
router.delete("/:id", protect, admin, categoriesContollers.deleteCategory);

export default router;
