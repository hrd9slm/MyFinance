import express from 'express';
import { updateUserSalary, updateUserProfile } from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

// router.get('/user', protect, getUser);
// router.put('/update-salary', protect, updateUserSalary);
router.route('/update-salary').put(protect, updateUserSalary);
router.put('/update-profile', protect, updateUserProfile);

export default router;
