import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    activeGameId: string | null;
    isPasswordCorrect: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        activeGameId: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next: NextFunction): Promise<void> {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export { User };
