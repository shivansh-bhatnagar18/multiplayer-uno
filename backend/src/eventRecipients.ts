// this module is responsible for handling the clients currently connected to the server.
// It stores the clients in a Map object, where the key is the client id and the value is the
// client's http response object.
// When sending an event, we first push the event to a queue. We need to use a queue because it
// is possible that the client hasn't sent the next polling request yet, i.e, we don't have a response
// object for that client yet. When the client sends the next polling request, we will send the events
// from the queue to the client.

import { Response } from 'express';
import { AppEvent } from './types';

type ClientId = string;

const clients = new Map<ClientId, Response>();
const eventQueue = new Map<ClientId, AppEvent[]>();

export function addClient(clientId: ClientId, res: Response) {
    // if there are new events for this client, we will send them immediately
    // else we will withhold the response object until there are new events
    clients.set(clientId, res);
    doSendEvents(clientId);
}

export function removeClient(clientId: ClientId) {
    clients.delete(clientId);
    eventQueue.delete(clientId);
}

export function getClient(clientId: ClientId) {
    return clients.get(clientId);
}

export function getAllClients(): ClientId[] {
    return Array.from(clients.keys());
}

export function enqueueForSend(clientId: ClientId, event: AppEvent) {
    if (!eventQueue.has(clientId)) {
        // this is most probably not going to happen, as a polling request is expected
        // to be made before any app event is sent to the client, but better safe than sorry
        eventQueue.set(clientId, [event]);
    } else {
        eventQueue.get(clientId)?.push(event);
    }
    // send the events immediately if the client is waiting
    doSendEvents(clientId);
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
