import express from 'express';
import { addClient } from '../eventRecipients';
import handleEvent from '../controllers/gameControllers';

const router = express.Router();

router.get('/events', (req, res) => {
    addClient('user_id', res);
});

router.post('/events', handleEvent);

export default router;
