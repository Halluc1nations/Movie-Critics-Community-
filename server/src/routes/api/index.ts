import { Router } from 'express';
import { reviews } from './Reviews-routes.js';
import { profileRouter } from './profiles-routes.js';

const router = Router();



router.use('/reviews', reviewsRouter);
router.use('/profile', profileRouter);

export default router;

