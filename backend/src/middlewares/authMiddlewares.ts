import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModels';

export interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export const authMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res
            .status(401)
            .json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            userId: string;
        };
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res
                .status(401)
                .json({ message: 'User not found, authorization denied' });
        }

        req.user = user as IUser;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: 'Invalid token, authorization denied',
        });
    }
};
