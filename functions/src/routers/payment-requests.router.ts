import { Router } from "express";
import { getActivePaymentRequests } from "../queries/get-active-payment-requests.query";
import { extractTokenFromHeader } from "../middleware/auth.middleware";
import { validateToken } from "../services/auth.service";

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

export default PaymentRequestsRouter