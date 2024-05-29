// This module is responsible for setting and retrieving the game state.
import { GameEngine } from './uno-game-engine/engine';
const games = map();

export function createGame() {
    //todo: generate a unique game id and store
}

/**
 *  Retrieves a game from the store using its id.
 * 
 * @param {string} id Game id
 * @returns {GameEngine|null} GameEngine instance
 */
export function retrieveGame(id) {
    //todo: Retrieve the game from the store
}
