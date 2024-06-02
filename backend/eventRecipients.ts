// this module is responsible for handling the clients currently connected to the server.
// It stores the clients in a Map object, where the key is the client's user_id and the value is the client's http response object.

import { Response } from 'express';

// Create a new Map to store clients
const clients = new Map<string, { gameId: string; res: Response }>();

// Function to add a client to the Map
export function addClient(userId: string, gameId: string, res: Response) {
    clients.set(userId, { gameId, res });
}

export function removeClient(userId: string) {
    clients.delete(userId);
}

export function getClient(userId: string) {
    return clients.get(userId);
}

// Function to send an event to all clients for a specific gameId
export function sendEventToClients(gameId: string, event: GameEvent) {
    for (const clientInfo of clients.values()) {
        if (clientInfo.gameId === gameId) {
            clientInfo.res.json([event]);
        }
    }
}
