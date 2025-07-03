import { body } from 'express-validator';

export const courseValidationRules = () => [
    body('title').notEmpty(),
    body('description').notEmpty()
];
