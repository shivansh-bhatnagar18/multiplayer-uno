# Game rules
To be on the same page, we will be following [these rules](https://www.unorules.com/).

---


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
card, announcing UNO, etc., is represented as an event. The client sends these event messages to the server via POST at the `/events` endpoint.
endpoint, and the server sends these messages to all clients through the long polling system. The
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

When such a request reaches the server, the server updates the game state and sends the message to all clients (through the polling mechanism). The clients update their game state accordingly, and make the necessary changes to their UI and game state.

We should design the code paths such that it would be easy to switch to WebSockets in the upcoming weeks.

## Game Events
The following events will be handled by the game engine:
### `JOIN_GAME`
Sent by the client when a player joins the game. All the other clients should be notified about the new player, so that they can update their UI.
### `LEAVE_GAME`
Self explanatory.
### `START_GAME`
There needs to be some discussion on how we want to handle this. We can either start the game when all players have joined, or we can start the game when the host decides to start the game. We can also have a ready button for each player, and the game starts when all players are ready.
### `THROW_CARD`
Sent by the client when a player throws a card. The server will validate the move and update the game state accordingly.
### `DRAW_CARD`
Sent by the client when a player draws a card from the deck. 

### `ANNOUNCE_UNO`
Sent by the client when a player announces UNO. We expect a button to pop up when a player has only one card left. This should be handled by the client.
### `CHALLENGE_UNO`
Sent by the client when a player challenges another player's UNO.
### `DRAW_4_CHALLENGE`
Read about this in the game rules. This is related to `CHALLENGE_UNO` implementation wise.

Note that the server will always notify all the clients about the game events. The clients will update their game state and UI accordingly.

We will add more rules once these are implemented. 
The data pertaining to these events will be decided while working on the events.
All the game event handling functions can reside in a directory inside the `uno-game-engine` directory.

---

# API Structure
We will use express routers to group similar endpoints. The API structure will be as follows:

```
/api
	/v1
		/auth
			/login
			/register
		/game
			/create
			/join
			/leave
			/start
			/end
			/events
```
The routers will be defined in the `routes` directory. The controllers will be defined in the `controllers` directory. The controllers will handle the business logic and call the game engine functions to handle the game events. All the controller functions should be wrapped in the error handling higher order function.