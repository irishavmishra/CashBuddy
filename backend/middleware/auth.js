import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

import { User } from "../models/model.user.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({
      msg: "Login Please",
    });
  }

  try {
    const verify = jwt.verify(authHeader, SECRET_KEY);
    req.userId = verify.userId;
    const user = await User.findOne({ _id: verify.userId });

    next();
  } catch (err) {
    return res.status(403).json({
      msg: "Login Please",
    });
  }
};

export default authMiddleware;
