import { Router } from 'express';
import * as progressController from '../controllers/progress.controller';
import * as progressValidation from '../controllers/progress.validation';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// All progress routes are protected
router.use(requireAuth);

router.post('/', validate(progressValidation.logProgressSchema), progressController.logProgress);
router.get('/', progressController.getProgressLogs);
router.patch('/:id', validate(progressValidation.progressIdParamSchema), validate(progressValidation.logProgressSchema), progressController.updateProgressLog);
router.delete('/:id', validate(progressValidation.progressIdParamSchema), progressController.deleteProgressLog);

export default router;
