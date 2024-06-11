import { Request, Response } from 'express';
import { getAllClients, scheduleSend } from '../eventRecipients';

type ClientId = string;

async function handleEvent(req:Request, res:Response) {
    const event = req.body;

    const clientIds = getAllClients();

    const eligibleClientIds = filterEligibleClients(clientIds);

    eligibleClientIds.forEach((clientId:ClientId) => {
        scheduleSend(clientId, event);
    });

    res.status(200).send({ message: 'Event propagated to clients.' });
}

function filterEligibleClients(clientIds:ClientId[]) {
    return clientIds;
}

export default handleEvent;
