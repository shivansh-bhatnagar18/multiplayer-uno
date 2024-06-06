"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveGame = exports.createGame = void 0;
// This module is responsible for setting and retrieving the game state.
const uuid_1 = require("uuid");
const engine_1 = require("./uno-game-engine/engine");
const games = new Map();
/**
 * Create a new game and store it in the games map
 * @returns {string} gameId
 */
function createGame() {
    const gameId = (0, uuid_1.v4)();
    const game = new engine_1.GameEngine();
    games.set(gameId, game);
    return gameId;
}
exports.createGame = createGame;
/**
 * Retrieve a game from the games map
 * @param {string} id gameId
 * @returns {GameEngine|null} GameEngine instance
 */
function retrieveGame(id) {
    return games.get(id) || null;
}
exports.retrieveGame = retrieveGame;
