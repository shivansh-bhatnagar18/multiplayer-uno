import mongoose, { CallbackError, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { User } from '../types'; // Adjust the path as needed

const userSchema = new mongoose.Schema<User>(
    {
        name: {
            type: String,
            required: [true, 'Please provide your name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email address'],
            lowercase: true,
            validate: [
                {
                    validator: (value: string) => validator.isEmail(value),
                    msg: 'Please provide a valid email address!',
                },
            ],
        },
        picture: {
            type: String,
            default:
                'https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png',
        },
        password: {
            type: String,
            required: [true, 'Please Provide your password'],
            minLength: [
                6,
                'Please make sure your password is at least 6 characters long!',
            ],
            maxLength: [
                128,
                'Please make sure your password is at most 128 characters long!',
            ],
        },
    },
    {
        collection: 'users',
        timestamps: true,
    }
);

userSchema.pre<User>('save', async function (next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next();
    } catch (err) {
        next(err as CallbackError);
    }
});

const UserModel: Model<User> =
    mongoose.models.User || mongoose.model<User>('User', userSchema);

export default UserModel;
