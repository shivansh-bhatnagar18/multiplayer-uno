// this module is responsible for back and forth communication between the frontend and the backend
// using the long polling mechanism

// todo: extract the event types from the backend and use them here
import * as types from './../../backend/src/types';

const GAME_EVENTS = {
    DRAW_CARD: 'DRAW_CARD',
    THROW_CARD: 'THROW_CARD',
    JOIN_GAME: 'JOIN_GAME',
    LEAVE_GAME: 'LEAVE_GAME',
    STATE_SYNC: 'STATE_SYNC',
    ANNOUNCE_UNO: 'ANNOUNCE_UNO',
};

let authCreds: { jwt: string; playerId: string } | null = null;
let polling = false;

let gameEventsDispatcher: (event: types.AppEvent) => void = () => {};

export function setGameEventsDispatcher(
    dispatcher: (event: types.AppEvent) => void
) {
    gameEventsDispatcher = dispatcher;
}
let abortController: AbortController | null = null;
async function poll() {
    if (!authCreds) {
        throw new Error('Auth credentials not set');
    }
    if (abortController) {
        abortController.abort();
    }
    abortController = new AbortController();
    console.log('Polling');
    const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/game/events`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authCreds.jwt,
            },
            signal: abortController.signal,
        }
    );
    if (!res.ok) {
        throw new Error((await res.json()).error);
    }
    const data: { events: types.AppEvent[] } = await res.json();
    console.log('Received event:', data);
    for (const event of data.events) {
        if (GAME_EVENTS[event.type]) {
            // it is a game event
            gameEventsDispatcher(event);
        } else {
            console.log('No handler for event type: ', event.type);
        }
    }
}

function pollLoop() {
    poll()
        .then(() => {
            pollLoop();
        })
        .catch((e) => {
            if (!polling) {
                console.log('Polling stopped - interrupted current poll');
                return;
            }
            console.error('Error polling:', e);
            setTimeout(() => {
                console.log('Retrying polling');
                pollLoop();
            }, 5000);
        });
}

export function setAuthCreds(jwt: string, playerId: string) {
    authCreds = { jwt, playerId };
}

export function startPolling() {
    if (!authCreds) {
        throw new Error('Auth credentials not set');
    }
    polling = true;
    pollLoop();
}

export function stopPolling() {
    polling = false;
    if (abortController) {
        abortController.abort();
    }
}

export function triggerEvent(event: Omit<types.AppEvent, 'playerId'>) {
    if (!authCreds) {
        throw new Error('Auth credentials not set');
    }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/game/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authCreds.jwt,
        },
        body: JSON.stringify({
            type: event.type,
            playerId: authCreds.playerId,
            data: event.data,
        }),
    }).catch((e) => {
        console.error('Error triggering event:', e);
    });
}
