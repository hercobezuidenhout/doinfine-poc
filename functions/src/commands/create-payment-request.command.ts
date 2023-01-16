import { getFirestore } from "firebase-admin/firestore"
import { sendNotificationToTopic } from "../services/notification.service"

export const createPaymentRequest = async ({ spaceId, userId, teamId, action, dateOfPayment }) => {
    const db = getFirestore()

    const paymentRequest = {
        userId: userId,
        teamId: teamId,
        action: action,
        dateOfPayment: dateOfPayment,
        status: 'pending'
    }

    const paymentRequestSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('paymentRequests')
        .add(paymentRequest)
    const userMakingPaymentSnapshot = await db.collection('users').doc(userId).get()

    await sendNotificationToTopic({
        topic: teamId,
        title: 'New Payment Request',
        description: `${userMakingPaymentSnapshot.data().fullName} claims to have made a payment.`
    })

    return paymentRequestSnapshot.id
}