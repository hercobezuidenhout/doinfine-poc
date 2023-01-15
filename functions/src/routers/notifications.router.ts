import { Router } from "express";
import admin from 'firebase-admin';

const NotificationsRouter = Router()

NotificationsRouter.post('/subscribe', async (req, res) => {
    const { token, topic } = req.body
    const subscribeResponse = await admin.messaging().subscribeToTopic(token, topic)

    res.send(subscribeResponse)
})

export default NotificationsRouter