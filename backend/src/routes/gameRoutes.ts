import express from 'express';
import { addClient } from '../eventRecipients';
import { handleGameEvent } from '../controllers/gameControllers';
import { AuthRequest, verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();
router.use(verifyToken);

router.get('/events', function (req: AuthRequest, res) {
    const clientId = req.user.id as string;
    // note: we might need to use a different client id if the user is allowed to have multiple clients
    // ie, the user is allowed to play multiple games on multiple devices at the same time
    addClient(clientId, res);
});

router.post('/events', handleGameEvent);

export default router;
