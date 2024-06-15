import { Request, Response } from 'express';
import { catchError, ControllerFunction } from '../utils';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/userModel';
import { Types } from 'mongoose';
import { AuthRequest } from '../middlewares/authMiddleware';

const getUserToken = (_id: string | Types.ObjectId): string => {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET as string, {
        expiresIn: '28d',
    });
    return token;
};

const cookieOptions = {
    httpOnly: true,
    secure: true,
};

const registerUser: ControllerFunction = catchError(
    async (req: Request, res: Response): Promise<void> => {
        const { username, password }: IUser = req.body;

        if ([username, password].some((field) => field?.trim() === '')) {
            throw new Error('All fields are required');
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const user = await User.create({
            username,
            password,
        });

        const createdUser = await User.findById(user._id).select('-password');

        if (!createdUser) {
            throw new Error('Failed to create user');
        }

        const token = getUserToken(user.id);
        res.status(201).cookie('accessToken', token, cookieOptions).json({
            message: 'Sign up successful',
            user: createdUser,
            token,
        });
    }
);

const loginUser: ControllerFunction = catchError(
    async (req: Request, res: Response): Promise<void> => {
        const { username, password }: IUser = req.body;

        if (!username) {
            throw new Error('Username is required');
        }

        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new Error('Invalid credentials');
        }

        const token: string = getUserToken(user.id);

        const loggedInUser = await User.findById(user._id).select('-password');

        res.status(200).cookie('accessToken', token, cookieOptions).json({
            message: 'Login successful',
            user: loggedInUser,
            token,
        });
    }
);

const verifyUser: ControllerFunction = catchError(
    async (req: AuthRequest, res: Response): Promise<void> => {
        const user = req.user as IUser;
        req.user.activeGameId = null;
        await req.user.save();
        res.status(200).json({ user });
    }
);

export { registerUser, loginUser, verifyUser };
