import { Response } from 'express';
import { AuthRequest } from './middlewares/authMiddleware';
import { CardColor, UNOCard } from './types';

export type ControllerFunction = (
    req: AuthRequest,
    res: Response
) => Promise<void>;

export function catchError(fn: ControllerFunction): ControllerFunction {
    return async function (req: AuthRequest, res: Response) {
        try {
            return await fn(req, res);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    };
}

export function getCardImageName(card: UNOCard): string {
    function getColorAbbreviation(color: CardColor): string {
        switch (color) {
            case 'red':
                return 'r';
            case 'blue':
                return 'b';
            case 'green':
                return 'g';
            case 'yellow':
                return 'o';
            default:
                return '';
        }
    }
    if (card.type === 'wild') {
        if (card.value === 'colchange') {
            return 'CC';
        } else {
            return 'P4';
        }
    } else if (card.type === 'special') {
        let value;
        switch (card.value) {
            case 'skip':
                value = 'r';
                break;
            case 'reverse':
                value = 'x';
                break;
            case 'draw2':
                value = 'p2';
                break;
        }
        return `${getColorAbbreviation(card.color)}${value}`;
    } else {
        return `${getColorAbbreviation(card.color)}${card.value}`;
    }
}
