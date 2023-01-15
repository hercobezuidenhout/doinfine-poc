import * as functions from "firebase-functions"
import * as express from 'express'
import * as cors from 'cors'
import admin from "firebase-admin"
import UsersRouter from "./routes/users.route"
import authMiddleware from "./middleware/auth.middleware"
import TeamsRouter from "./routes/teams.route"
import PaymentRequestsRouter from "./routes/payment-requests.route"
import FineRequestsRouter from "./routes/fine-requests.route"
import LeaderboardRouter from "./routes/leaderboard.route"

const app = express()
app.use(cors({ origin: '*' }))

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
app.use('/leaderboard', LeaderboardRouter)

export const api = functions.https.onRequest(app);
