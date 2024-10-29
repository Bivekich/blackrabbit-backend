import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/UserModels.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Не авторизован, недействительный токен");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Не авторизован, токен отсутствует");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Вы не авторизованы как администратор");
  }
};

export { generateToken, protect, admin };
