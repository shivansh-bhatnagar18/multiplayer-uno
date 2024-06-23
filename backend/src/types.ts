// We declare those types which are used throughout the application here.
// For types that are used only in one file, we can declare them in that file itself.

export type CardType = 'number' | 'special' | 'wild';

export type CardColor = 'red' | 'blue' | 'green' | 'yellow' | 'wild';

export type SpecialCardName =
    | 'skip'
    | 'reverse'
    | 'draw2'
    | 'draw4'
    | 'colchange';

export type CardNumber =
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9';

export type CardValue = SpecialCardName | CardNumber;

export type UNOCard = {
    type: CardType;
    color: CardColor;
    value: CardValue;
    id: string;
};

export type Player = {
    id: string;
    cards: UNOCard[];
};

export type RunningEvents = {
    vulnerableToUNO: Player | null;
    hasAnnouncedUNO: Player | null;
};

export type EventResult = {
    type: 'SUCCESS' | 'ERROR';
    message: string;
};

export enum GameEventTypes {
    DRAW_CARD = 'DRAW_CARD',
    THROW_CARD = 'THROW_CARD',
    JOIN_GAME = 'JOIN_GAME',
    LEAVE_GAME = 'LEAVE_GAME',
    ANNOUNCE_UNO = 'ANNOUNCE_UNO',
    STATE_SYNC = 'STATE_SYNC',
    START_GAME = 'START_GAME',
}
export type GameEvent =
    | {
          type: GameEventTypes.DRAW_CARD;
          playerId: string;
          data?: null;
      }
    | {
          type: GameEventTypes.THROW_CARD;
          playerId: string;
          data: {
              cardId: string;
          };
      }
    | {
          type: GameEventTypes.JOIN_GAME;
          playerId: string;
          data?: null;
      }
    | {
          type: GameEventTypes.LEAVE_GAME;
          playerId: string;
          data?: null;
      }
    | {
          type: GameEventTypes.ANNOUNCE_UNO;
          playerId: string;
          data?: null;
      }
    | {
          type: GameEventTypes.STATE_SYNC;
          data: {
              players: Player[];
              cards: UNOCard[];
              currentTurn: number;
              lastThrownCard: string;
          };
      }
    | {
          type: GameEventTypes.START_GAME;
          playerId: string;
          data?: null;
      };

export enum ChatEventTypes {
    SEND_MESSAGE = 'SEND_MESSAGE',
    REACT_TO_MESSAGE = 'REACT_TO_MESSAGE',
    DELETE_MESSAGE = 'DELETE_MESSAGE',
    EDIT_MESSAGE = 'EDIT_MESSAGE',
}

export type ChatEvent =
    | {
          type: ChatEventTypes.SEND_MESSAGE;
          data: ChatMessage;
      }
    | {
          type: ChatEventTypes.REACT_TO_MESSAGE;
          data: {
              ref: string;
              reaction: string;
          };
      }
    | {
          type: ChatEventTypes.DELETE_MESSAGE;
          data: {
              ref: string;
          };
      }
    | {
          type: ChatEventTypes.EDIT_MESSAGE;
          data: {
              ref: string;
              newContent: string;
          };
      };

export type AppEventType = GameEventTypes | ChatEventTypes;

// Represent all the events that can be sent to the client
// a workaround for now to make things work - this will be refactored later
export type AppEvent = GameEvent | ChatEvent;

export type ChatMessage = {
    content: string;
    id: string;
    ref?: string | null;
    atMentions?: string[];
    reactions?: [string, string][];
    playerName: string;
};

export type ClientId = string;

//todo: Add more events

export function isGameEvent(event: AppEvent): boolean {
    return Object.values(GameEventTypes).includes(event.type as GameEventTypes);
}

export function isChatEvent(event: AppEvent): boolean {
    return Object.values(ChatEventTypes).includes(event.type as ChatEventTypes);
}
