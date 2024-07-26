import express from 'express';
import { createCategory, getCategories,updateCategory ,deleteCategory} from '../controllers/categoryController.js';
import  protect  from '../middlewares/authMiddleware.js';


const router = express.Router();

router.route('/')
  .get(protect, getCategories)
  .post(protect, createCategory);

 router.route('/:id')
   .put(protect, updateCategory) 
   .delete(protect, deleteCategory); 




 
export default router;
