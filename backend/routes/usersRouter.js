import express, { Router } from "express";
import { signupSchema, signinSchema } from "../schemas/user.schema.js";
import { User, Account } from "../models/model.user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authMiddleware from "../middleware/auth.js";
const userRouter = Router();
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

userRouter.use(express.json());

userRouter.post("/signup", async (req, res) => {
  const userInput = signupSchema.safeParse(req.body);

  // This check user input wrong or invalid they return before hitting the database
  if (!userInput.success) {
    return res.status(400).json({
      msg: "Invalid Input",
      errors: userInput.error.errors,
    });
  }

  //
  try {
    const { username, password, firstName, lastName } = userInput.data;
    const user = new User({
      username,
      password,
      firstName,
      lastName,
    });
    // checking in database acoding to usermodel is everything right then they save data in database
    const result = await user.save();
    const userId = user._id;
    const accout = new Account({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    await accout.save();

    // genrating token if user sucessfully verify(signin time) or save(signup time) in database
    const token = jwt.sign({ userId }, SECRET_KEY, {});

    // after sucessfully save data in database then they sendf this to user
    res.status(201).json({
      msg: "User Created Sucessfully",
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Wrong Input",
      error: error.message,
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const userInput = signinSchema.safeParse(req.body);

  // this is zod validation
  if (!userInput.success) {
    return res.status(400).json({
      msg: "Wrong User Credential",
      errors: userInput.error.errors,
    });
  }

  try {
    const { username, password } = userInput.data;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        msg: "Invalid Username",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        msg: "Invalid Password",
      });
    }
    const userId = user._id;
    const token = jwt.sign({ userId }, SECRET_KEY);
    res.status(200).json({
      msg: "Sucess User Login",
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "User Not Found",
      error: error.message,
    });
  }
});

userRouter.use(authMiddleware);

userRouter.get("/", (req, res) => {
  res.json({
    msg: "Good",
  });
});

//

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: filter,

            $options: "i", // 'i' for case-insensitive
          },
        },
      ],
    });

    res.json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(400).json({
      msg: "Hello error",
      error: error.message,
    });
  }
});

export { userRouter };
