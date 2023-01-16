import { Router } from "express";
import admin from 'firebase-admin';

const NotificationsRouter = Router()

NotificationsRouter.post('/', async (req, res) => {
    const message = {
        notification: {
            title: req.body.title,
            body: req.body.description,
        },
        topic: req.body.topic
    };

    admin.messaging().send(message)
        .then(result => {
            res.send(result)
        })
        .catch(error => res.send(error))
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