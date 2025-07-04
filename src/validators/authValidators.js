import { body } from 'express-validator';

export const authValidationRules = () => [
    body('email').isEmail(),
    body('password').isLength({ min: 4 })
];
