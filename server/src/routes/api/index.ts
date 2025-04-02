import { Router } from 'express';
import { reviewRouter } from './reviews-routes.js';
import { profileRouter } from './profiles-routes.js';

const router = Router();



router.use('/reviews', reviewRouter);
router.use('/profile', profileRouter);

export default router;

