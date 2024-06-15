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

export type EventResult = {
    type: 'SUCCESS' | 'ERROR';
    message: string;
};

export type GameEventType =
    | 'DRAW_CARD'
    | 'THROW_CARD'
    | 'JOIN_GAME'
    | 'LEAVE_GAME';

export type GameEvent =
    | {
          type: 'DRAW_CARD';
          playerId: string;
          data: {
              cardId: string;
          };
      }
    | {
          type: 'THROW_CARD';
          playerId: string;
          data: {
              cardId: string;
          };
      }
    | {
          type: 'JOIN_GAME';
          playerId: string;
      }
    | {
          type: 'LEAVE_GAME';
          playerId: string;
      };

// Represent all the events that can be sent to the client
export type AppEvent = GameEvent;
//todo: Add more events
