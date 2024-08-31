import { getTotalExpensesByCategory, getTotalExpensesByMonth, getRemainingBudgetByCategory, getTotalUserExpenses } from './expenseController';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import User from '../models/User';
import mongoose from 'mongoose';

jest.mock('../models/Transaction');
jest.mock('../models/Category');
jest.mock('../models/User');

describe('Expense Controller', () => {
  describe('getTotalExpensesByCategory', () => {
    it('should return total expenses by category', async () => {
      const req = { user: { id: 'userId' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const expenses = [{ _id: 'catId', totalAmount: 200 }];

      Transaction.aggregate.mockResolvedValue(expenses);

      await getTotalExpensesByCategory(req, res);

      expect(res.json).toHaveBeenCalledWith({ totalExpensesByCategory: expenses });
    });

    it('should handle errors during aggregation', async () => {
      const req = { user: { id: 'userId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Transaction.aggregate.mockRejectedValue(new Error('Aggregation error'));

      await getTotalExpensesByCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Aggregation error' });
    });
  });

  describe('getTotalExpensesByMonth', () => {
    it('should return total expenses by month', async () => {
      const req = { user: { id: 'userId' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const expenses = [{ _id: 9, totalAmount: 300 }];

      Transaction.aggregate.mockResolvedValue(expenses);

      await getTotalExpensesByMonth(req, res);

      expect(res.json).toHaveBeenCalledWith({ totalExpensesByMonth: expenses });
    });

    it('should handle errors during aggregation', async () => {
      const req = { user: { id: 'userId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Transaction.aggregate.mockRejectedValue(new Error('Aggregation error'));

      await getTotalExpensesByMonth(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Aggregation error' });
    });
  });

  describe('getRemainingBudgetByCategory', () => {
    it('should return remaining budget by category', async () => {
      const req = { user: { id: 'userId' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const budgets = [{ name: 'Category1', remainingBudget: 150 }];

      Category.find.mockResolvedValue(budgets);

      await getRemainingBudgetByCategory(req, res);

      expect(res.json).toHaveBeenCalledWith({ remainingBudgetByCategory: budgets });
    });

    it('should handle errors during retrieval', async () => {
      const req = { user: { id: 'userId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Category.find.mockRejectedValue(new Error('Retrieval error'));

      await getRemainingBudgetByCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Retrieval error' });
    });
  });

  describe('getTotalUserExpenses', () => {
    it('should return total user expenses and salary', async () => {
      const req = { user: { id: 'userId' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const expenses = [{ _id: 'userId', totalAmount: 500 }];
      const user = { salary: 1000 };

      Transaction.aggregate.mockResolvedValue(expenses);
      User.findById.mockResolvedValue(user);

      await getTotalUserExpenses(req, res);

      expect(res.json).toHaveBeenCalledWith({ totalUserExpenses: expenses[0], salary: user.salary });
    });

    it('should handle errors when no expenses are found', async () => {
      const req = { user: { id: 'userId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Transaction.aggregate.mockResolvedValue([]);

      await getTotalUserExpenses(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'No expenses found for this user' });
    });

    it('should handle errors when user is not found', async () => {
      const req = { user: { id: 'userId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const expenses = [{ _id: 'userId', totalAmount: 500 }];

      Transaction.aggregate.mockResolvedValue(expenses);
      User.findById.mockResolvedValue(null);

      await getTotalUserExpenses(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });
});