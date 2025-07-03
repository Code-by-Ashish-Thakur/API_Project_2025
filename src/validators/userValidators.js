import { body } from 'express-validator';

export const userValidationRules = () => [
    body('name').notEmpty(),
    body('email').isEmail()
];
