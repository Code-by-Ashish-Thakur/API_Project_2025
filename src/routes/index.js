import express from 'express';
import authRoutes from './authRoutes.js';
import courseRoutes from './courseRoutes.js'; // ✅ Ye line add karo


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);


export default router;
