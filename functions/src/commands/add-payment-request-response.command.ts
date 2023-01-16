import { getFirestore } from "firebase-admin/firestore"
import { sendNotificationToTopic } from "../services/notification.service"

const userHasAlreadyResponded = (responses, userId) => responses.map(response => response.userId).includes(userId)

export const addPaymentRequestResponse = async ({ requestId, userId, approved }) => {
    const db = getFirestore()

    const paymentRequestSnapshot = await db.collection('paymentRequests').doc(requestId).get()
    const paymentRequest = paymentRequestSnapshot.data()

    if (!paymentRequest.responses) paymentRequest.responses = []
    if (userHasAlreadyResponded(paymentRequest.responses, userId)) return
    if (paymentRequest.status !== 'pending') return

    const teamSnapshot = await db.collection('teams').doc(paymentRequest.teamId).get()
    const team = teamSnapshot.data()

    const userPayingSnapshot = await db.collection('users').doc(paymentRequest.userId).get()
    const userPaying = userPayingSnapshot.data().fullName

    paymentRequest.responses.push({ approved: approved, userId: userId })

    const hasAllResponses = team.members.length >= 3
        ? paymentRequest.responses.length > 0
        : paymentRequest.responses.length >= team.members.length - 1

    if (hasAllResponses) {
        const isApproved = paymentRequest.responses.filter(x => x.approved).length > paymentRequest.responses.filter(x => !x.approved).length
        if (isApproved) {
            const payment = {
                userId: paymentRequest.userId,
                teamId: paymentRequest.teamId,
                action: paymentRequest.action,
                dateOfPayment: paymentRequest.dateOfPayment
            }

            const paymentSnapshot = await db.collection('payments').add(payment)
            paymentRequest.paymentId = paymentSnapshot.id
            paymentRequest.status = 'approved'

            const fineSnapshot = await db
                .collection('fines')
                .where('teamId', '==', paymentRequest.teamId)
                .where('paid', '==', false)
                .get()

            const fine = fineSnapshot.docs[0].data()
            fine.paid = true

            await db.collection('fines').doc(fineSnapshot.docs[0].id).update(fine)

            sendNotificationToTopic({
                topic: paymentRequest.teamId,
                title: `Payment request has been approved!`,
                description: `${userPaying} has paid off a fine by ${payment.action}.`
            })
        } else {
            paymentRequest.status = 'rejected'

            sendNotificationToTopic({
                topic: paymentRequest.teamId,
                title: `Payment request has been reject!`,
                description: `${userPaying} has not paid off any fines by ${paymentRequest.action}.`
            })
        }
    }

    await db.collection('paymentRequests').doc(requestId).update(paymentRequest)

    return { nice: 'hi' }
}