import { Router } from 'express';
import * as transactionController from '../controllers/transactionController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const transactionRouter = Router();

transactionRouter.post('/add-transaction', authMiddleware.isAuthenticated, authMiddleware.checkRole('clerk', 'manager'), transactionController.addTransaction)

export { transactionRouter };