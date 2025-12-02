import { Router } from 'express';
import { generateRecommendations } from './AI';

const router = Router();

router.post('/recommendations', generateRecommendations);

export default router;