import { Request, Response } from 'express';

type ControllerFunction = (req: Request, res: Response) => Promise<void>;

export function catchError(fn: ControllerFunction): ControllerFunction {
    return async function (req: Request, res: Response) {
        try {
            return await fn(req, res);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };
}
