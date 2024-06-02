import express from 'express';
import { addClient } from '../eventRecipients';
const router = express.Router();

router.get('/events', (req, res) => {
    addClient('user_id', res);
});

// the post handler should retrieve the game the user is currently in, and update the game state.
// The request body contains the event data, as described in ARCHITECTURE.md
