"use strict";
// this module houses the handlers for various game events.
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEvent = exports.registerEventHandler = void 0;
const map = new Map();
function registerEventHandler(eventType, handler) {
    map.set(eventType, handler);
}
exports.registerEventHandler = registerEventHandler;
function handleEvent(game, event) {
    const handler = map.get(event.type);
    if (!handler) {
        return { type: 'ERROR', message: 'Invalid event type' };
    }
    return handler(game, event);
}
exports.handleEvent = handleEvent;
