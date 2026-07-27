import { Router } from 'express';
import * as authController from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/', authController.handleUserSignup);
authRouter.get('/', authController.getUsers);

export { authRouter };