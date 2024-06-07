import { getAllClients, scheduleSend } from '../eventRecipients';

async function handleEvent(req, res) {
    const event = req.body;

    const clientIds = getAllClients();

    const eligibleClientIds = filterEligibleClients(clientIds);

    eligibleClientIds.forEach((clientId) => {
        scheduleSend(clientId, event);
    });

    res.status(200).send({ message: 'Event propagated to clients.' });
}

function filterEligibleClients(clientIds) {
    return clientIds;
}

export default handleEvent;
