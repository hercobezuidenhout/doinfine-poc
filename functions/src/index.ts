import * as functions from "firebase-functions"
import * as express from 'express'
import * as cors from 'cors'
import admin from "firebase-admin"
import { getMessaging } from 'firebase-admin/messaging'

import UsersRouter from "./routers/users.router"
import authMiddleware from "./middleware/auth.middleware"
import TeamsRouter from "./routers/teams.router"
import PaymentRequestsRouter from "./routers/payment-requests.router"
import FineRequestsRouter from "./routers/fine-requests.router"
import LeaderboardRouter from "./routers/leaderboard.router"
import NotificationsRouter from "./routers/notifications.router"

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

export const api = functions.https.onRequest(app);

export const unsubscribeToTopic = functions.https.onRequest(async (req, res) => {
    const x = cors({ origin: true })

    x(req, res, async () => {
        const { token, topic } = req.body
        const unsubscribeResponse = await admin.messaging().unsubscribeFromTopic(token, topic)

        res.send(unsubscribeResponse)
    })
})

export const sendOnFirestoreCreate = functions.firestore
    .document('notifications/{notificationId}')
    .onCreate(async snapshot => {
        const notificationData = snapshot.data()
        console.log(notificationData)

        const message = {
            data: {
                score: '850',
                time: '2:45'
            },
            topic: 'notifications'
        };

        const response = await getMessaging().send(message)
        console.log(response)
        return response
    })
