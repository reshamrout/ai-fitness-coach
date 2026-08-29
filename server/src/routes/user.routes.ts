import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);

router.get('/profile', userController.getProfile);
router.patch('/profile', validate(userController.updateProfileSchema), userController.updateProfile);
router.delete('/me', userController.deleteAccount);

export default router;
