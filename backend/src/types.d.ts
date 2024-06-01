type CardType = 'number' | 'special' | 'wild';

type CardColor = 'red' | 'blue' | 'green' | 'yellow';

type SpecialCardNames = 'skip' | 'reverse' | 'draw2' | 'draw4' | 'colchange';
type CardNumbers = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type CardValue = SpecialCardNames | CardNumbers;

type UNOCard = {
    type: CardType;
    color: CardColor;
    value: CardValue;
    id: undefined;
};

type Player = {
    id: string;
    cards: UNOCard[];
};
