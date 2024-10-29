import asyncHandler from "express-async-handler";
import User from "../models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/auth.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("Пользователь уже зарегистрирован");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      image,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Неверные данные");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Неправильно введены почта или пароль");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, image } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.image = image || user.image;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("Пользователь не найден");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Администратор не может быть удален");
      }
      await user.deleteOne();
      res.json({ message: "Пользователь удален успешно" });
    } else {
      res.status(401);
      throw new Error("Пользователь не найден");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: "Пароль изменен успешно!" });
    } else {
      res.status(401);
      throw new Error("Неверный пароль");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getBoughtMovies = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("linkedMovies");
    if (user) {
      res.json(user.linkedMovies);
    } else {
      res.status(404);
      throw new Error("Пользователь не найден");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const addBoughtMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      if (user.linkedMovies.includes(movieId)) {
        res.status(400);
        throw new Error("Фильм уже куплен");
      }
      user.linkedMovies.push(movieId);
      await user.save();
      res.json(user.linkedMovies);
    } else {
      res.status(404);
      throw new Error("Фильм не найден");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(user.params.id);
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Администратор не может быть удален");
      }
      await user.deleteOne;
      res.json({ message: "Пользователь успешно удален" });
    } else {
      res.status(404);
      throw new Error("Пользователь не найден");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getBoughtMovies,
  addBoughtMovie,
  getUsers,
  deleteUser,
};
