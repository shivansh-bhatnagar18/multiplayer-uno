# Multiplayer UNO Game using MERN Stack

## Overview

This project is a multiplayer UNO game built using the MERN
(MongoDB, Express, React, Node.js) stack. UNO is a classic card game
where players aim to be the first to empty their hand of cards by
matching the card in the discard pile by color, number, or symbol.

## Features

-   **Real-time Multiplayer game**: Players can join rooms and play
    against each other in real-time.
-   **Chat**: Players can chat with each other in the game room. The
    messages can be reacted and replied to.
-   **Game Mechanics**: Implement UNO game rules such as drawing
    cards, playing cards, skipping turns, reversing direction, etc.
-   **Authentication**: Allow users to sign up and log in.

We use custom hooks to manage modals, toasts and game state. The
long polling is implemented in the `channel` module, and is made
such that it can be easily replaced with `socket.io` for real-time
updates.

## Technologies Used

-   **MongoDB**: For storing user data and game state.
-   **Express.js**: To build the backend server and RESTful API
    endpoints.
-   **React**: For building the frontend user interface and
    interactive game components.
-   **Node.js**: To run the server-side code and manage
    dependencies.
-   [TODO]**Socket.IO**: For real-time communication between players
    in the game rooms. We currently use long polling for real-time
    updates.

Additionally, we use `jest` for backend tests.
