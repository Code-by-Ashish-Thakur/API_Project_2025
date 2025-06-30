import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../db/connection.js';
import userModel from './userModel.js';
import courseModel from './courseModel.js';

const User = userModel(sequelize, DataTypes);
const Course = courseModel(sequelize, DataTypes);

// M:N relation
User.belongsToMany(Course, { through: 'UserCourses' });
Course.belongsToMany(User, { through: 'UserCourses' });

export { User, Course };
