import * as functions from "firebase-functions"
import * as express from 'express'
import admin from "firebase-admin"
import UsersRouter from "./routes/users.route"
import authMiddleware from "./middleware/auth.middleware"
import TeamsRouter from "./routes/teams.route"
import PaymentRequestsRouter from "./routes/payment-requests.route"
import FineRequestsRouter from "./routes/fine-requests.route"

const app = express()
admin.initializeApp();

app.use(authMiddleware({
    exlude: [
        '/login'
    ]
}))

app.use('/users', UsersRouter)
app.use('/teams', TeamsRouter)
app.use('/payment-requests', PaymentRequestsRouter)
app.use('/fine-requests', FineRequestsRouter)

export const api = functions.https.onRequest(app);
