import * as functions from "firebase-functions"
import * as express from 'express'
import * as cors from 'cors'
import admin from "firebase-admin"

import UsersRouter from "./routers/users.router"
import authMiddleware from "./middleware/auth.middleware"
import TeamsRouter from "./routers/teams.router"
import PaymentRequestsRouter from "./routers/payment-requests.router"
import FineRequestsRouter from "./routers/fine-requests.router"
import LeaderboardRouter from "./routers/leaderboard.router"
import NotificationsRouter from "./routers/notifications.router"
import SpacesRouter from "./routers/spaces.router"
import InvitesRouter from "./routers/invites.router"

const app = express()
app.use(cors({ origin: '*' }))

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

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
app.use('/notifications', NotificationsRouter)
app.use('/spaces', SpacesRouter)
app.use('/invites', InvitesRouter)

export const api = functions.https.onRequest(app);