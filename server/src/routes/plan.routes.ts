import { Router } from 'express';
import * as planController from '../controllers/plan.controller';
import * as planValidation from '../controllers/plan.validation';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth.middleware';
import { aiLimiter } from '../middleware/rateLimiter';

const router = Router();

// All plan routes are protected
router.use(requireAuth);

router.post('/', aiLimiter, validate(planValidation.generatePlanSchema), planController.generatePlan);
router.get('/', planController.getPlans);
router.get('/:id', validate(planValidation.planIdParamSchema), planController.getPlanById);
router.delete('/:id', validate(planValidation.planIdParamSchema), planController.deletePlan);
router.patch('/:id/label', validate(planValidation.updatePlanLabelSchema), planController.updatePlanLabel);

export default router;
