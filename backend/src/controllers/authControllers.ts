import { Request, Response } from 'express';
import User from '../models/userModels';
import { catchError } from '../utils';

export const register = catchError(
    async (req: Request, res: Response): Promise<void> => {
        const { username, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).json({ msg: 'Email Already Exists' });
            return;
        }

        const userCreated = new User({
            username,
            email,
            password,
        });

        await userCreated.save();

        res.status(201).json({
            msg: 'Registration Successful',
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    }
);

export const login = catchError(
    async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            res.status(400).json({ message: 'Invalid Credentials' });
            return;
        }

        const isPasswordMatch = await userExist.comparePassword(password);

        if (isPasswordMatch) {
            res.status(200).json({
                msg: 'Login Successful',
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ message: 'Invalid Email or Password' });
        }
    }
);
