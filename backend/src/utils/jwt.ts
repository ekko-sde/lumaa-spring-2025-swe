import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Access denied' });
        return; 
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) {
            res.status(403).json({ error: 'Invalid token' });
            return; 
        }
        (req as any).userId = (user as any).userId;
        next();
    });
};
