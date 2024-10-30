import Categories from "../models/CategoriesModels.js";
import asyncHandler from "express-async-handler";

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Categories.find({});
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  try {
    const category = new Categories({ title });
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (category) {
      category.title = req.body.title;
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Категория не найдена" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Categories.findByIdAndDelete(req.params.id);
    if (category) {
      res.json({ message: "Категория удалена" });
    } else {
      res.status(404).json({ message: "Категория не найдена" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
