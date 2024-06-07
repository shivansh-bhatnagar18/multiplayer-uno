// this module is responsible for handling the clients currently connected to the server.
// It stores the clients in a Map object, where the key is the client id and the value is the
// client's http response object.
// When sending an event, we first push the event to a queue. We need to use a queue because it
// is possible that the client hasn't sent the next polling request yet, i.e, we don't have a response
// object for that client yet. When the client sends the next polling request, we will send the events
// from the queue to the client.

import { Response } from 'express';

type ClientId = string;

const clients = new Map<ClientId, Response>();
const eventQueue = new Map<ClientId, AppEvent[]>();

export function addClient(clientId: ClientId, res: Response) {
    // todo: We can immediately send any events that are in the queue.
    clients.set(clientId, res);
    eventQueue.set(clientId, []);
}

export function removeClient(clientId: ClientId) {
    clients.delete(clientId);
    eventQueue.delete(clientId);
}

export function getClient(clientId: ClientId) {
    return clients.get(clientId);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function scheduleSend(clientId: ClientId, event: AppEvent) {
    //todo: Enqueue the event for sending.
}

export function doSendEvents(clientId: ClientId) {
    const res = clients.get(clientId);
    const events = eventQueue.get(clientId) || [];

    if (res && events.length > 0) {
        res.json({ events });
        eventQueue.set(clientId, []);
        clients.delete(clientId);
    }
}
