import express from "express";
import {
  addBoughtMovie,
  changeUserPassword,
  deleteUser,
  deleteUserProfile,
  getBoughtMovies,
  getUsers,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/UserController.js";
import { protect, admin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/bought", protect, getBoughtMovies);
router.post("/bought", protect, addBoughtMovie);
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router;
