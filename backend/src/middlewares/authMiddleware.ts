import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/userModel';
import { NextFunction, Request, Response } from 'express';

export interface AuthRequest extends Request {
    user: IUser;
}

export const verifyToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken: string = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({ error: 'Access token is required' });
        }

        const { _id } = jwt.verify(
            accessToken,
            process.env.JWT_SECRET as string
        ) as { _id: string };

        const user: IUser | null = await User.findOne({ _id });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            error: (error as Error)?.message || 'Invalid access token',
        });
    }
};
