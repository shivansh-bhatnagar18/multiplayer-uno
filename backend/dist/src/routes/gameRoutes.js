"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventRecipients_1 = require("../eventRecipients");
const router = express_1.default.Router();
router.get('/events', (req, res) => {
    (0, eventRecipients_1.addClient)('user_id', res);
});
// the post handler should retrieve the game the user is currently in, and update the game state.
// The request body contains the event data, as described in ARCHITECTURE.md
