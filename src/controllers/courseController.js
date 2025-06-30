import { Course, User } from '../models/index.js';

export const getAllCourses = async (req, res) => {
    const courses = await Course.findAll();
    res.json(courses);
};

export const addCourse = async (req, res) => {
    const course = await Course.create(req.body);
    res.status(201).json(course);
};

export const updateCourse = async (req, res) => {
    await Course.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Course updated' });
};

export const deleteCourse = async (req, res) => {
    await Course.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Course deleted' });
};

export const buyCourse = async (req, res) => {
    const { courseId } = req.body;
    const user = await User.findByPk(req.user.id);
    const course = await Course.findByPk(courseId);
    await user.addCourse(course);
    res.json({ message: 'Course purchased successfully' });
};

export const getUserCourses = async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        include: Course
    });
    res.json(user.Courses);
};

// In getAllCourses
const cachedCourses = await redisClient.get('courses');
if (cachedCourses) return res.json(JSON.parse(cachedCourses));

const courses = await Course.findAll();
await redisClient.set('courses', JSON.stringify(courses));
res.json(courses);
