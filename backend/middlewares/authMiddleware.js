import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token:', token); // Add this line
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded:', decoded); // Add this line
      req.user = await User.findById(decoded.id).select('-password');
      console.log('User:', req.user); // Add this line
      if (!req.user) {
        return res.status(404).json({ error: 'User not found' });
      }
      next();
    } catch (error) {
      console.error('Error:', error); // Improved logging
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }
};

export default protect;