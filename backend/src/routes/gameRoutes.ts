import express from 'express';
import {
    handleGameCreate,
    handleGameJoin,
} from '../controllers/gameControllers';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();
router.use(verifyToken);

router.post('/join', handleGameJoin);
router.post('/create', handleGameCreate);

export default router;
