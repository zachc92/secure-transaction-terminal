import { Router } from 'express';
import * as authController from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/sign-up', authController.handleUserSignup);
authRouter.post('/login', authController.handleUserLogin);
authRouter.post('/logout', authController.handleUserLogout);

// temporary method to check valid session cookie
authRouter.get('/profile', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return res.status(200).json({
            message: "Access granted! Secure cookie verified.",
            user: req.user
        });
    }
    return res.status(401).json({ error: "Access denied. Missing valid login session cookie." });
});

authRouter.get('/', authController.getUsers);

export { authRouter };