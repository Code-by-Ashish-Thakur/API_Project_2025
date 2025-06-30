import express from 'express';
import { getAllUsers, updateUser } from '../controllers/userController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateUser, getAllUsers);
router.put('/:id', authenticateUser, updateUser);

export default router;
