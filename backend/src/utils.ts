import { Response } from 'express';
import { AuthRequest } from './middlewares/authMiddleware';

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
