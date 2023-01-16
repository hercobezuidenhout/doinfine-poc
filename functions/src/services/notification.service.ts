import * as admin from 'firebase-admin'

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