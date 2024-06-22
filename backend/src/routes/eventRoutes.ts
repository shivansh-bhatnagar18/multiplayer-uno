import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware';
import {
    addEventClient,
    handleAppEvent,
} from '../controllers/eventControllers';

const router = express.Router();

router.use(verifyToken);

// router.use(() => console.log('in evts'));

router.route('/').get(addEventClient).post(handleAppEvent);

export default router;
