import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categoryController';
import Category from '../models/Category';

jest.mock('../models/Category');

const mockRequest = (body, user) => ({
  body,
  user,
  params: {},
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe('Category Controller', () => {
  describe('createCategory', () => {
    it('should create a category', async () => {
      const req = mockRequest({ name: 'Groceries', budget: 500 }, { id: 'userId' });
      const res = mockResponse();
      const category = { _id: 'catId', name: 'Groceries', budget: 500, user: 'userId' };

      Category.create.mockResolvedValue(category);

      await createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(category);
    });

    it('should handle errors during category creation', async () => {
      const req = mockRequest({ name: 'Groceries', budget: 500 }, { id: 'userId' });
      const res = mockResponse();

      Category.create.mockRejectedValue(new Error('Error creating category'));

      await createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error creating category' });
    });
  });

  describe('getCategories', () => {
    it('should return categories', async () => {
      const req = mockRequest({}, { id: 'userId' });
      const res = mockResponse();
      const categories = [{ _id: 'catId', name: 'Groceries', budget: 500 }];

      Category.find.mockResolvedValue(categories);

      await getCategories(req, res);

      expect(res.json).toHaveBeenCalledWith(categories);
    });

    it('should handle errors when fetching categories fails', async () => {
      const req = mockRequest({}, { id: 'userId' });
      const res = mockResponse();

      Category.find.mockRejectedValue(new Error('Error fetching categories'));

      await getCategories(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching categories' });
    });
  });

  describe('updateCategory', () => {
    it('should update a category', async () => {
      const req = mockRequest({ name: 'Utilities', budget: 300 }, { id: 'userId' });
      req.params.id = 'catId';
      const res = mockResponse();
      const updatedCategory = { _id: 'catId', name: 'Utilities', budget: 300 };

      Category.findByIdAndUpdate.mockResolvedValue(updatedCategory);

      await updateCategory(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedCategory);
    });

    it('should handle errors when category is not found', async () => {
      const req = mockRequest({ name: 'Utilities', budget: 300 }, { id: 'userId' });
      req.params.id = 'catId';
      const res = mockResponse();

      Category.findByIdAndUpdate.mockResolvedValue(null);

      await updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Category not found' });
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      const req = mockRequest({}, { id: 'userId' });
      req.params.id = 'catId';
      const res = mockResponse();
      const deletedCategory = { _id: 'catId', name: 'Groceries', budget: 500 };

      Category.findByIdAndDelete.mockResolvedValue(deletedCategory);

      await deleteCategory(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Category deleted successfully' });
    });

    it('should handle errors when category is not found', async () => {
      const req = mockRequest({}, { id: 'userId' });
      req.params.id = 'catId';
      const res = mockResponse();

      Category.findByIdAndDelete.mockResolvedValue(null);

      await deleteCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Category not found' });
    });
  });
});