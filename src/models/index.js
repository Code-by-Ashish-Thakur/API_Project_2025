import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../db/connection.js';
import userModel from './userModel.js';

const User = userModel(sequelize, DataTypes);
export { User };
