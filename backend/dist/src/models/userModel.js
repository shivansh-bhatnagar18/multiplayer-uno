"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        unique: [true, 'This email address is already registered!!'],
        lowercase: true,
        validate: [
            {
                validator: (value) => validator_1.default.isEmail(value),
                msg: 'Please provide a valid email address!',
            },
        ],
    },
    picture: {
        type: String,
        default: 'https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png',
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
}, {
    collection: 'users',
    timestamps: true,
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (this.isNew) {
                const salt = yield bcrypt_1.default.genSalt(12);
                const hashedPassword = yield bcrypt_1.default.hash(this.password, salt);
                this.password = hashedPassword;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
const UserModel = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
exports.default = UserModel;
