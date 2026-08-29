import { Router } from 'express';
import * as aiController from '../controllers/ai.controller';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth.middleware';
import { aiLimiter } from '../middleware/rateLimiter';

const router = Router();

// Protect all AI routes
router.use(requireAuth);
// Apply strict rate limiting
router.use(aiLimiter);

router.post('/tts', validate(aiController.ttsSchema), aiController.generateTTS);
router.post('/image', validate(aiController.imageSchema), aiController.generateImage);
router.post('/chat', validate(aiController.chatSchema), aiController.chat);

export default router;
