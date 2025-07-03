import { Course, User } from '../models/index.js';
import redisClient from '../../redis/redisClient.js'; // ✅ Redis import

export const getAllCourses = async (req, res) => {
    try {
        const cachedCourses = await redisClient.get('courses');
        if (cachedCourses) {
            return res.json(JSON.parse(cachedCourses)); // Cache hit
        }

        const courses = await Course.findAll(); // Fetch from DB
        await redisClient.set('courses', JSON.stringify(courses)); // Cache it
        res.json(courses);
    } catch (error) {
        console.error("Error in getAllCourses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const addCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        await redisClient.del('courses'); // 🧹 Invalidate cache
        res.status(201).json(course);
    } catch (error) {
        console.error("Error in addCourse:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateCourse = async (req, res) => {
    try {
        await Course.update(req.body, { where: { id: req.params.id } });
        await redisClient.del('courses'); // 🧹 Invalidate cache
        res.json({ message: 'Course updated' });
    } catch (error) {
        console.error("Error in updateCourse:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        await Course.destroy({ where: { id: req.params.id } });
        await redisClient.del('courses'); // 🧹 Invalidate cache
        res.json({ message: 'Course deleted' });
    } catch (error) {
        console.error("Error in deleteCourse:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const buyCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const user = await User.findByPk(req.user.id);
        const course = await Course.findByPk(courseId);
        await user.addCourse(course);
        res.json({ message: 'Course purchased successfully' });
    } catch (error) {
        console.error("Error in buyCourse:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getUserCourses = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            include: Course
        });
        res.json(user.Courses);
    } catch (error) {
        console.error("Error in getUserCourses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
