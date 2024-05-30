// This module is responsible for setting and retrieving the game state.
import { v4 as uuid } from 'uuid';

import { GameEngine } from './uno-game-engine/engine';
const games: Map<string, GameEngine> = new Map();

/**
 * Create a new game and store it in the games map
 * @returns {string} gameId
*/
export function createGame() {
    const gameId = uuid();
    const game = new GameEngine();
    games.set(gameId, game);
    return gameId;
}

/**
 * Retrieve a game from the games map
 * @param {string} id gameId
 * @returns {GameEngine|null} GameEngine instance
 */
export function retrieveGame(id: string) {
    return games.get(id) || null;
}