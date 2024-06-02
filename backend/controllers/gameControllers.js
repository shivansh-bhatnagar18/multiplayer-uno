// Implement the handler for `/events` endpoint. Refer to ARCHITECTURE.md for implementation details.
import { sendEventToClients } from '../eventRecipients';

// removed req,res from arguments of function causing eslint errors
export const sendEvents = async () => {
    //passing a dummy event
    sendEventToClients('game_id', {
        type: 'DRAW_CARD',
        playerId: 'player1',
        data: {
            card: {
                type: 'number',
                color: 'red',
                value: '1',
                id: 'string',
            },
        },
    });
};
