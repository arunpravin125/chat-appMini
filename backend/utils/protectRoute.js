import jwt from "jsonwebtoken";
import User from "../model/User.model.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(400).json({ error: "Unauthorized token" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(400).json({ error: "No token found" });
  }

  const user = await User.findById(decoded.userId).select("-password");

  req.user = user;
  next();
};
