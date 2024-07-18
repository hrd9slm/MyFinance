import express from 'express';
import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// router.route('/')
//   .post( createTransaction)
//   .get( getTransactions);

// router.route('/:id')
//   .put( updateTransaction)
//   .delete( deleteTransaction);

 router.route('/')
   .post(protect, createTransaction)
   .get( getTransactions);

 router.route('/:id')
   .put(protect, updateTransaction)
   .delete(protect, deleteTransaction);




export default router;
