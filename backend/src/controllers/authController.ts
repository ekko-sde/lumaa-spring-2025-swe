import { Request, Response } from 'express';
import { createUser, findUserByUsername } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        const user = await createUser(username, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        const user = await findUserByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ error: 'Invalid credentials' });
            return; 
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
