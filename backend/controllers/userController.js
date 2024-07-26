import { set } from 'mongoose';
import User from '../models/User.js';

export const updateUserSalary = async (req, res) => {
  console.log(req.body);
  const { salary } = req.body;
  const { id: userId } = req.user;
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { salary } },
      { new: true }
    );
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, salary } = req.body;
    const user = req.user; // This should be set by the auth middleware

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.salary = salary || user.salary;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error:', error); // Improved logging
    res.status(500).json({ error: 'Server error' });
  }
};