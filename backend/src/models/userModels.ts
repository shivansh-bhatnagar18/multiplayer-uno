import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    _id: mongoose.Types.ObjectId;
    comparePassword(password: string): Promise<boolean>;
    generateToken(): Promise<string>;
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function (next) {
    const user = this as IUser;
    if (!user.isModified('password')) {
        return next();
    }

    try {
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        next();
    } catch (error) {
        next(error as Error);
    }
});

userSchema.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function (): Promise<string> {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '30d',
            }
        );
    } catch (error) {
        console.error(error);
        throw new Error('Token generation failed');
    }
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
