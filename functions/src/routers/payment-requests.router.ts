import { Router } from "express";
import { getActivePaymentRequests } from "../queries/get-active-payment-requests.query";
import { extractTokenFromHeader } from "../middleware/auth.middleware";
import { validateToken } from "../services/auth.service";
import { getPaymentRequest } from "../queries/get-payment-request.query";
import { createPaymentRequest } from "../commands/create-payment-request.command";
import { addPaymentRequestResponse } from "../commands/add-payment-request-response.command";

const PaymentRequestsRouter = Router()

PaymentRequestsRouter.get('/', async (req, res) => {
    const filter = req.query.filter
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)

    if (!uid) res.status(401).send()

    let paymentRequests = []

    if (filter == 'active') {
        paymentRequests = await getActivePaymentRequests(uid)
    }

    res.send(paymentRequests)
})

PaymentRequestsRouter.get('/:id', async (req, res) => {
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)
    if (!uid) res.status(401).send()

    const paymentRequest = await getPaymentRequest(req.params.id, uid)

    res.send(paymentRequest)
})



PaymentRequestsRouter.post('/', async (req, res) => {
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)
    if (!uid) res.status(401).send()

    const { dateOfPayment, action, teamId } = req.body


    const paymentRequestId = await createPaymentRequest({
        userId: uid,
        teamId: teamId,
        action: action,
        dateOfPayment: dateOfPayment
    })

    res.send(paymentRequestId)
})

PaymentRequestsRouter.put('/', async (req, res) => {
    const idToken = extractTokenFromHeader(req.headers.authorization)
    const { uid } = await validateToken(idToken)
    if (!uid) res.status(401).send()

    const { requestId, approved } = req.body

    const paymentRequest = await addPaymentRequestResponse({
        requestId: requestId,
        userId: uid,
        approved: approved
    }).catch(error => {
        console.log('error', error)
        res.status(400).send()
    })

    res.status(200).send(paymentRequest)
})

export default PaymentRequestsRouter