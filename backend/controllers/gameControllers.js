// Implement the handler for `/events` endpoint. Refer to ARCHITECTURE.md for implementation details.
import { sendEventToClients } from '../eventRecipients';

export const sendEvents = async (req, res) => {
    sendEventToClients('gameId', {
        type: 'DRAW_CARD',
        player: 'player1',
        data: {
            cardID: 'red-5',
        },
    });
};
