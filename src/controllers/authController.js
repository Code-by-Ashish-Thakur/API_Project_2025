import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: 'Email already exists' });

        const user = await User.create({ name, email, password });
        const token = generateToken(user);
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(500).json({ error: 'Signup failed', err });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || user.password !== password)
            return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Login failed', err });
    }
};
