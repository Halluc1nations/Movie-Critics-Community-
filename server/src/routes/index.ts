import { Router } from 'express';
import reviewRoutes from './api/index.js'; 


const router = Router();
router.use('/api', reviewRoutes);

export default router;