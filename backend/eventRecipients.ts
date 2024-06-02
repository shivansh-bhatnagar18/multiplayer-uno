// this module is responsible for handling the clients currently connected to the server.
// It stores the clients in a Map object, where the key is the client's user_id and the value is the client's http response object.

import { Response } from 'express';

const clients = new Map<string, Response>();

export function addClient(userId: string, res: Response) {
    clients.set(userId, res);
}

export function removeClient(userId: string) {
    clients.delete(userId);
}

export function getClient(userId: string) {
    return clients.get(userId);
}
