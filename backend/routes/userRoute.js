import express from 'express';
import authRoute from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', authRoute);

router.post('/login', authRoute);

export default router;
