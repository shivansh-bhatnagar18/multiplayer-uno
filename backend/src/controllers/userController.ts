import { Request, Response } from 'express';
import { catchError, ControllerFunction } from '../utils';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/userModel';
import { Types } from 'mongoose';

const getUserToken = (_id: string | Types.ObjectId): string => {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET as string, {
        expiresIn: '28d',
    });
    return token;
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

        res.status(201).send({
            message: 'User created successfully',
            createdUser,
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

        const token: string = getUserToken((user as IUser)._id as string);

        const loggedInUser = await User.findById(user._id).select('-password');

        const options = {
            httpOnly: true,
            secure: true,
        };

        res.status(200).cookie('accessToken', token, options).json({
            token,
            user: loggedInUser,
        });
    }
);

export { registerUser, loginUser };
