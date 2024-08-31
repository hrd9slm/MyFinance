import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from './transactionController';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import User from '../models/User';

jest.mock('../models/Transaction');
jest.mock('../models/Category');
jest.mock('../models/User');

describe('Transaction Controller', () => {
  describe('createTransaction', () => {
    it('should create a transaction and update category and user', async () => {
      const req = { body: { category: 'catId', amount: 100, date: '2024-09-01', description: 'Test' }, user: { id: 'userId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const category = { _id: 'catId', remainingBudget: 500, save: jest.fn() };
      const user = { _id: 'userId', remainingSalary: 1000, save: jest.fn() };
      const transaction = { _id: 'transId', ...req.body, user: req.user.id };

      Category.findById.mockResolvedValue(category);
      User.findById.mockResolvedValue(user);
      Transaction.create.mockResolvedValue(transaction);

      await createTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(transaction);
      expect(category.save).toHaveBeenCalled();
      expect(user.save).toHaveBeenCalled();
    });

    it('should handle errors when category is not found', async () => {
      const req = { body: { category: 'catId', amount: 100, date: '2024-09-01', description: 'Test' }, user: { id: 'userId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Category.findById.mockResolvedValue(null);

      await createTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Category not found' });
    });
  });

  describe('getTransactions', () => {
    it('should return transactions for a user', async () => {
      const req = { user: { id: 'userId' } };
      const res = { json: jest.fn() };
      const transactions = [{ _id: 'transId', category: 'catId', amount: 100 }];

      Transaction.find.mockResolvedValue(transactions);

      await getTransactions(req, res);

      expect(res.json).toHaveBeenCalledWith(transactions);
    });

    it('should handle errors when fetching transactions fails', async () => {
      const req = { user: { id: 'userId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Transaction.find.mockRejectedValue(new Error('Error fetching transactions'));

      await getTransactions(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching transactions' });
    });
  });

  describe('updateTransaction', () => {
    it('should update a transaction and adjust category and user', async () => {
      const req = { params: { id: 'transId' }, body: { category: 'newCatId', amount: 150, date: '2024-09-01', description: 'Updated' }, user: { id: 'userId' } };
      const res = { json: jest.fn() };
      const transaction = { _id: 'transId', category: 'catId', amount: 100, save: jest.fn() };
      const user = { _id: 'userId', remainingSalary: 1000, save: jest.fn() };
      const originalCategory = { _id: 'catId', remainingBudget: 500, save: jest.fn() };
      const newCategory = { _id: 'newCatId', remainingBudget: 300, save: jest.fn() };

      Transaction.findById.mockResolvedValue(transaction);
      User.findById.mockResolvedValue(user);
      Category.findById.mockImplementation(id => {
        if (id === 'catId') return originalCategory;
        if (id === 'newCatId') return newCategory;
        return null;
      });

      await updateTransaction(req, res);

      expect(res.json).toHaveBeenCalledWith(transaction);
      expect(transaction.save).toHaveBeenCalled();
      expect(user.save).toHaveBeenCalled();
      expect(originalCategory.save).toHaveBeenCalled();
      expect(newCategory.save).toHaveBeenCalled();
    });

    it('should handle errors when transaction is not found', async () => {
      const req = { params: { id: 'transId' }, body: { category: 'newCatId', amount: 150, date: '2024-09-01', description: 'Updated' }, user: { id: 'userId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Transaction.findById.mockResolvedValue(null);

      await updateTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Transaction not found' });
    });
  });

  describe('deleteTransaction', () => {
    it('should delete a transaction and update category and user', async () => {
      const req = { params: { id: 'transId' }, user: { id: 'userId' } };
      const res = { json: jest.fn() };
      const transaction = { _id: 'transId', category: 'catId', amount: 100 };
      const category = { _id: 'catId', remainingBudget: 500, save: jest.fn() };
      const user = { _id: 'userId', remainingSalary: 1000, save: jest.fn() };

      Transaction.findById.mockResolvedValue(transaction);
      Category.findById.mockResolvedValue(category);
      User.findById.mockResolvedValue(user);
      Transaction.findByIdAndDelete.mockResolvedValue(true);

      await deleteTransaction(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Transaction deleted successfully' });
      expect(category.save).toHaveBeenCalled();
      expect(user.save).toHaveBeenCalled();
    });

    it('should handle errors when transaction is not found', async () => {
      const req = { params: { id: 'transId' }, user: { id: 'userId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Transaction.findById.mockResolvedValue(null);

      await deleteTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Transaction not found' });
    });
  });
});