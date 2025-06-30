import express from 'express';
import {
    getAllCourses,
    addCourse,
    updateCourse,
    deleteCourse,
    buyCourse,
    getUserCourses
} from '../controllers/courseController.js';

import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCourses);
router.post('/', authenticateUser, addCourse);
router.put('/:id', authenticateUser, updateCourse);
router.delete('/:id', authenticateUser, deleteCourse);
router.post('/buy', authenticateUser, buyCourse);
router.get('/my-courses', authenticateUser, getUserCourses);

export default router;
