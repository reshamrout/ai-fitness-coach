import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import * as authValidation from '../controllers/auth.validation';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', validate(authValidation.registerSchema), authController.register);
router.post('/login', validate(authValidation.loginSchema), authController.login);
router.post('/logout', authController.logout);
router.get('/verify-email', validate(authValidation.verifyEmailSchema), authController.verifyEmail);
router.post('/forgot-password', validate(authValidation.forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPasswordSchema), authController.resetPassword);
router.post('/refresh', authController.refresh);
router.get('/me', requireAuth, authController.getMe);

export default router;
