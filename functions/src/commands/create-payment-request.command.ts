import { getFirestore } from "firebase-admin/firestore"
import { newPaymentRequestTemplate } from "../mail-templates"
import { sendNotificationToTopic } from "../services/notification.service"
import { sendEmailToUser } from "./send-email-to-team.command"

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

    const { subject, message } = newPaymentRequestTemplate({
        userMakingPayment: userMakingPaymentSnapshot.data().fullName,
        action: action,
        requestId: paymentRequestSnapshot.id
    })

    const teamSnapshot = await db.collection('spaces').doc(spaceId)
        .collection('teams')
        .doc(teamId)
        .get()

    const members = teamSnapshot.data().members

    for (let memberIndex = 0; memberIndex < members.length; memberIndex++) {
        const member = members[memberIndex];
        await sendEmailToUser(member, { subject: subject, message: message })
    }

    return paymentRequestSnapshot.id
}