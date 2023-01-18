import * as admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore';

export const sendNotificationToTopic = async ({ topic, title, description }) => {
    const message = {
        notification: {
            title: title,
            body: description,
        },
        topic: topic
    };

    const result = await admin.messaging().send(message)
        .catch(error => {
            console.log(error)
            return
        })

    return result
}

export const subscribeToTopic = async (topic, token = '') => await admin.messaging().subscribeToTopic(token, topic)

export const subscribeUserToTopic = async (topic, userId) => {
    const db = getFirestore()

    const userSnapshot = await db.collection('users').doc(userId).get()
    const userTokens = userSnapshot.data().tokens

    if (!userTokens) return

    const tokens = userSnapshot.data().tokens.map(token => token.token)

    return await admin.messaging().subscribeToTopic(tokens, topic)
}