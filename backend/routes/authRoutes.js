import express from 'express';
import protect from '../middlewares/authMiddleware.js'; 
import { register, login, getUser, updateSalary } from '../controllers/authController.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', protect, getUser);
router.put('/salary', protect, updateSalary);

export default router;