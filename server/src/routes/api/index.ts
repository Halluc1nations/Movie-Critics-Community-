import { Router } from 'express';
import { review } from './reviews-routes.js';

const router = Router();
router.use('/review', review);

export default router;