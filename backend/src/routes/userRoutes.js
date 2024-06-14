import express from 'express';
import {
    loginUser,
    registerUser,
    verifyUser,
} from '../controllers/userController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/verify').post(verifyToken, verifyUser);

export default router;
