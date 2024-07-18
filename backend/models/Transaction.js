import mongoose from "mongoose";
import Category from "./Category.js";

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
  },
  description: {
    type: String,
  },
});


const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
