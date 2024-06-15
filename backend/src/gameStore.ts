// This module is responsible for setting and retrieving the game state.
import { v4 as uuid } from 'uuid';

import { GameEngine } from './uno-game-engine/engine';
const games: Map<string, GameEngine> = new Map();

export function createGame() {
    const gameId = uuid();
    const game = new GameEngine(gameId);
    games.set(gameId, game);
    return game;
}

export function retrieveGame(id: string): GameEngine | null {
    return games.get(id) || null;
}
