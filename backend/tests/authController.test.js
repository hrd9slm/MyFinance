import { register, login, getUser, updateSalary } from './authController';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  describe('register', () => {
    it('should register a user and return a token', async () => {
      const req = { body: { name: 'John Doe', email: 'john@example.com', password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const user = { _id: '123', name: 'John Doe', email: 'john@example.com' };

      User.create.mockResolvedValue(user);
      bcrypt.genSalt.mockResolvedValue('salt');
      bcrypt.hash.mockResolvedValue('hashedPassword');
      jwt.sign.mockReturnValue('token');

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ token: 'token' });
    });

    it('should handle errors during registration', async () => {
      const req = { body: { name: 'John Doe', email: 'john@example.com', password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.create.mockRejectedValue(new Error('Error creating user'));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error creating user' });
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const req = { body: { email: 'john@example.com', password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const user = { _id: '123', email: 'john@example.com', password: 'hashedPassword' };

      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token');

      await login(req, res);

      expect(res.json).toHaveBeenCalledWith({ token: 'token' });
    });

    it('should handle invalid credentials', async () => {
      const req = { body: { email: 'john@example.com', password: 'wrongpassword' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findOne.mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });
  });

  describe('getUser', () => {
    it('should return user data', async () => {
      const req = { user: '123' };
      const res = { json: jest.fn() };
      const user = { _id: '123', name: 'John Doe', email: 'john@example.com' };

      User.findById.mockResolvedValue(user);

      await getUser(req, res);

      expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should handle errors when user is not found', async () => {
      const req = { user: '123' };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      User.findById.mockRejectedValue(new Error('User not found'));

      await getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Server error');
    });
  });

  describe('updateSalary', () => {
    it('should update user salary', async () => {
      const req = { user: { id: '123' }, body: { salary: 50000 } };
      const res = { json: jest.fn() };
      const user = { _id: '123', salary: 40000, save: jest.fn().mockResolvedValue(true) };

      User.findById.mockResolvedValue(user);

      await updateSalary(req, res);

      expect(user.salary).toBe(50000);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should handle errors when user is not found', async () => {
      const req = { user: { id: '123' }, body: { salary: 50000 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findById.mockResolvedValue(null);

      await updateSalary(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });
});