# Communication between the client and the server

Apart from the initial request-response exchange for initial setup,
the client and server communicate using a simple message-based
protocol to communicate game events. The client sends messages to
the server, and the server sends messages to the client. The
messages are JSON objects.

We will be using
[long polling](https://javascript.info/long-polling) to keep the
game state in sync across all clients. We may switch to WebSockets
in the future.

On the server side, we are storing the ongoing game state in memory (managed by `gameStore.js`), and the server is responsible for updating the game state and sending the game state to all clients. We can later shift to redis and mongodb.

## Long polling
Simply put, long polling is a technique where the client sends a request to the server, and the server holds the request until there is new information to send. When the server has new information, it sends the response to the client, and the client immediately sends another request. This way, the client always has the latest information.

# Protocol for transmitting game events

Each action by the player, like drawing a card from deck, throwing a
card, announcing UNO, etc., is represented as a message. The client
sends these messages to the server via POST at the `/events`
endpoint, and the server sends these messages to all clients. The
format of the message is:

```json
{
	"type": "DRAW_CARD",
	"player": "player1",
	"data": {
		"cardID": "red-5"
	}
}
```
Other possible values for `type` are `THROW_CARD`, `ANNOUNCE_UNO`, etc.

When such a request reaches the server, the server updates the game state and sends the message to all clients (through the polling mechanism). The clients update their game state accordingly, and make the necessary changes to their UI and game state.

