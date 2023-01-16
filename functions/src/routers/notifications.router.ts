import { Router } from "express";
import admin from 'firebase-admin';
import { sendNotificationToTopic } from "../services/notification.service";

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

    const subscribeResponse = await admin.messaging().subscribeToTopic(token, topic)

    res.send(subscribeResponse)
})

NotificationsRouter.post('/unsubscribe', async (req, res) => {
    const { token, topic } = req.body

    const subscribeResponse = await admin.messaging().unsubscribeFromTopic(token, topic)

    res.send(subscribeResponse)
})

export default NotificationsRouter