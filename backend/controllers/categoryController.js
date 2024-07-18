import Category from '../models/Category.js';

export const createCategory = async (req, res) => {
  const { name, budget } = req.body;
  try {
    const category = await Category.create({ name, budget, user: req.user.id });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    // const categories = await Category.find();
     const categories = await Category.find({ user: req.user.id });
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, budget } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, budget },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
