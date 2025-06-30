import { body } from 'express-validator';

export const courseValidationRules = () => [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required')
];
