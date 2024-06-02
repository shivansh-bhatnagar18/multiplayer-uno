import express from 'express';
import { addClient } from '../eventRecipients';
import { sendEvents } from '../controllers/gameControllers';
const router = express.Router();

router.get('/events', (req, res) => {
    addClient('user_id', 'game_id', res);
});

router.route('/events').post(sendEvents);

// the post handler should retrieve the game the user is currently in, and update the game state.
// The request body contains the event data, as described in ARCHITECTURE.md
