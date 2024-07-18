 import express from 'express';
 import {
   getTotalExpensesByCategory,
   getTotalExpensesByMonth,
   getRemainingBudgetByCategory,
   getTotalUserExpenses,
 } from '../controllers/statsController.js';
 import { protect } from '../middlewares/authMiddleware.js';

 const router = express.Router();

 router.get('/total-expenses-by-category', protect, getTotalExpensesByCategory);
 router.get('/total-expenses-by-month', protect, getTotalExpensesByMonth);
 router.get('/remaining-budget-by-category', protect, getRemainingBudgetByCategory);
 router.get('/total-user-expenses', protect, getTotalUserExpenses);

 export default router;