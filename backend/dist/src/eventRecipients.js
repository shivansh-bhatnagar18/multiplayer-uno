"use strict";
// this module is responsible for handling the clients currently connected to the server.
// It stores the clients in a Map object, where the key is the client id and the value is the
// client's http response object.
// When sending an event, we first push the event to a queue. We need to use a queue because it
// is possible that the client hasn't sent the next polling request yet, i.e, we don't have a response
// object for that client yet. When the client sends the next polling request, we will send the events
// from the queue to the client.
Object.defineProperty(exports, "__esModule", { value: true });
exports.doSendEvent = exports.scheduleSend = exports.getClient = exports.removeClient = exports.addClient = void 0;
const clients = new Map();
const eventQueue = new Map();
function addClient(clientId, res) {
    // todo: We can immediately send any events that are in the queue.
    clients.set(clientId, res);
    eventQueue.set(clientId, []);
}
exports.addClient = addClient;
function removeClient(clientId) {
    clients.delete(clientId);
    eventQueue.delete(clientId);
}
exports.removeClient = removeClient;
function getClient(clientId) {
    return clients.get(clientId);
}
exports.getClient = getClient;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function scheduleSend(clientId, event) {
    //todo: Enqueue the event for sending.
}
exports.scheduleSend = scheduleSend;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doSendEvent(clientId) {
    //todo: Send all the events in the queue to the client, only if the response object is available.
}
exports.doSendEvent = doSendEvent;
