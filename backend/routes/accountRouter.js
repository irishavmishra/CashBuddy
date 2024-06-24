import express from "express";
import authMiddleware from "../middleware/auth.js";
import mongoose from "mongoose";
import { Account } from "../models/model.user.js";

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

accountRouter.post(
  "/transfer",
  express.json(),
  authMiddleware,
  async (req, res) => {
    const session = await mongoose.startSession();
    console.log(req.body);
    session.startTransaction();
    const { amount, to } = req.body;
    const account = await Account.findOne({
      userId: req.userId,
    });

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid Account",
      });
    }
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.json({
      message: "Transfer sucessful",
    });
  }
);

export { accountRouter };
