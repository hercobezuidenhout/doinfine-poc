import { Router } from "express";
import admin from 'firebase-admin';
import { extractTokenFromHeader } from "../middleware/auth.middleware";
import { validateToken } from "../services/auth.service";
import { sendNotificationToTopic, subscribeToTopic, subscribeUserToTopic } from "../services/notification.service";

const NotificationsRouter = Router()

NotificationsRouter.post('/', async (req, res) => {
    const { topic, title, description } = req.body
    await sendNotificationToTopic({
        topic: topic,
        title: title,
        description: description
    })
    res.status(200).send()
})

NotificationsRouter.post('/subscribe', async (req, res) => {
    const { token, topic } = req.body

    if (!token) {
        const idToken = extractTokenFromHeader(req.headers.authorization)
        const { uid } = await validateToken(idToken)

        if (!uid) res.status(401).send()

        const result = await subscribeUserToTopic(topic, uid)

        if (!result) res.status(404).send()

        res.status(200).send(result)
    } else {
        const result = await subscribeToTopic(topic, token)

        res.status(200).send(result)
    }
})

NotificationsRouter.post('/unsubscribe', async (req, res) => {
    const { token, topic } = req.body

    if (!token) {
        res.send('token needed')
        return
    }

    const subscribeResponse = await admin.messaging().unsubscribeFromTopic(token, topic)

    res.send(subscribeResponse)
})

export default NotificationsRouter