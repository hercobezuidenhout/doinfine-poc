import { Router } from "express";
import { getActiveFineRequests } from "../queries/get-active-fine-requests.query";
import { extractTokenFromHeader } from "../middleware/auth.middleware";
import { validateToken } from "../services/auth.service";
import { getFineRequest } from "../queries/get-fine-request.query";
import { createFineRequest } from "../commands/create-fine-request.command";
import { addFineRequestResponse } from "../commands/add-fine-request-response.command";

const FineRequestsRouter = Router()

FineRequestsRouter.get('/', async (req, res) => {
    const { spaceid } = req.headers
    console.log(spaceid)
    const filter = req.query.filter
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)

    if (!uid) res.status(401).send()

    let fineRequests

    if (filter == 'active') {
        fineRequests = await getActiveFineRequests(spaceid, uid)
    }

    res.send(fineRequests)
})

FineRequestsRouter.get('/:id', async (req, res) => {
    const { spaceid } = req.headers
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)
    const id = req.params.id

    if (!uid) res.status(401).send()

    const fineRequest = await getFineRequest(spaceid, id, uid)

    fineRequest ? res.send(fineRequest) : res.status(404).send()
})

FineRequestsRouter.post('/', async (req, res) => {
    const { spaceid } = req.headers
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)

    const fineRequest = {
        finer: uid,
        finee: req.body.finee,
        teamId: req.body.teamId,
        reason: req.body.reason
    }

    const id = await createFineRequest(spaceid, fineRequest).catch(error => {
        console.log(error)
        res.status(400).send('Something went wrong.')
    })

    res.status(200).send(id)
})

FineRequestsRouter.put('/', async (req, res) => {
    const { spaceid } = req.headers
    const { requestId, approved } = req.body
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)

    const fineRequestResponse = {
        spaceId: spaceid,
        requestId: requestId,
        approved: approved,
        userId: uid
    }

    const data = await addFineRequestResponse(fineRequestResponse)

    if (!data) res.status(404).send()

    res.status(200).send(data)
})

export default FineRequestsRouter