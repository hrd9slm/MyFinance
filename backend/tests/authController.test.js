import { register, login, getUser, updateSalary } from '../controllers/authController';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const mockRequest = (body, user) => ({
  body,
  user,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  res.send = jest.fn().mockReturnThis();
  return res;
};

describe('Auth Controller', () => {
  describe('register', () => {
    it('should register a user and return a token', async () => {
      const req = mockRequest({ name: 'salma salma', email: 'salma@example.com', password: 'password123', salary: 50000 });
      const res = mockResponse();
      const user = { _id: '123', name: 'salma salma', email: 'salma@example.com', salary: 50000 };

      User.create.mockResolvedValue(user);
      bcrypt.genSalt.mockResolvedValue('salt');
      bcrypt.hash.mockResolvedValue('hashedPassword');
      jwt.sign.mockReturnValue('token');

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ token: 'token' });
    });

    it('should handle errors during registration', async () => {
      const req = mockRequest({ name: 'salma salma', email: 'salma@example.com', password: 'password123' });
      const res = mockResponse();

      User.create.mockRejectedValue(new Error('salary is not defined'));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'salary is not defined' });
    });
  });

   describe('login', () => {
     it('should login a user and return a token', async () => {
       const req = mockRequest({ email: 'salma@example.com', password: 'password123' });
       const res = mockResponse();
       const user = { _id: '123', email: 'salma@example.com', password: 'hashedPassword' };

       User.findOne.mockResolvedValue(user);
       bcrypt.compare.mockResolvedValue(true);
       jwt.sign.mockReturnValue('token');

       await login(req, res);

       expect(res.json).toHaveBeenCalledWith({ token: 'token' });
     });

     it('should handle invalid credentials', async () => {
       const req = mockRequest({ email: 'salma@example.com', password: 'wrongpassword' });
       const res = mockResponse();

       User.findOne.mockResolvedValue(null);

       await login(req, res);

       expect(res.status).toHaveBeenCalledWith(401);
       expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
     });
   });

  //  describe('getUser', () => {
  //    it('should return user data', async () => {
  //      const req = mockRequest({}, '123');
  //      const res = mockResponse();
  //      const user = { _id: '123', name: 'salma salma', email: 'salma@example.com' };

  //      User.findById.mockResolvedValue(user);

  //      await getUser(req, res);

  //      expect(res.json).toHaveBeenCalledWith(user);
  //    });

  //    it('should handle errors when user is not found', async () => {
  //      const req = mockRequest({}, '123');
  //      const res = mockResponse();

  //      User.findById.mockRejectedValue(new Error('User not found'));

  //      await getUser(req, res);

  //      expect(res.status).toHaveBeenCalledWith(500);
  //      expect(res.send).toHaveBeenCalledWith('Server error');
  //    });
  //  });

  // describe('updateSalary', () => {
  //   it('should update user salary', async () => {
  //     const req = mockRequest({ salary: 50000 }, { id: '123' });
  //     const res = mockResponse();
  //     const user = { _id: '123', salary: 40000, save: jest.fn().mockResolvedValue(true) };

  //     User.findById.mockResolvedValue(user);

  //     await updateSalary(req, res);

  //     expect(user.salary).toBe(50000);
  //     expect(res.json).toHaveBeenCalledWith(user);
  //   });

  //   it('should handle errors when user is not found', async () => {
  //     const req = mockRequest({ salary: 50000 }, { id: '123' });
  //     const res = mockResponse();

  //     User.findById.mockResolvedValue(null);

  //     await updateSalary(req, res);

  //     expect(res.status).toHaveBeenCalledWith(404);
  //     expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  //   });
  // });
});