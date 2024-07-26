import Transaction from '../models/Transaction.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

// Total Expenses by Category
export const getTotalExpensesByCategory = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const totalExpensesByCategory = await Transaction.aggregate([
      { $match: { user: userId } }, // Assurez-vous que l'ID utilisateur est correct
      {
        $group: {
          _id: "$category", // Regrouper par catégorie
          totalAmount: { $sum: "$amount" } // Calculer le total des montants
        }
      }
    ]);

    console.log('Total Expenses by Category (Without Lookup):', totalExpensesByCategory);

    res.json({ totalExpensesByCategory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Total Expenses by Month
export const getTotalExpensesByMonth = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const totalExpensesByMonth = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: { $month: "$date" },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    res.json({ totalExpensesByMonth });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remaining Budget by Category
export const getRemainingBudgetByCategory = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const remainingBudgetByCategory = await Category.find({ user: userId }).select('name remainingBudget');
    res.json({ remainingBudgetByCategory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Total User Expenses
export const getTotalUserExpenses = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const userExpenses = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$user",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    if (userExpenses.length === 0) {
      return res.status(400).json({ error: "No expenses found for this user" });
    }

    const user = await User.findById(userId).select('salary');

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    res.json({ totalUserExpenses: userExpenses[0], salary: user.salary });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
