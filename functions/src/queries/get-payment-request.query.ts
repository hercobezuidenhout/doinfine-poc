import { getFirestore } from "firebase-admin/firestore"

export const getPaymentRequest = async (id, userId) => {
    const db = getFirestore()

    const userTeamsSnapshot = await db.collection('teams').where('members', 'array-contains', userId).get()
    const userTeams = userTeamsSnapshot.docs.map(doc => doc.id)

    const paymentRequestSnapshot = await db.collection('paymentRequests').doc(id).get()
    const { status, responses, teamId } = paymentRequestSnapshot.data()

    if (status !== 'pending') return
    if (responses && responses.map(response => response.userId).includes(userId)) return
    if (!userTeams.includes(teamId)) return

    return {
        id: paymentRequestSnapshot.id,
        fullName: paymentRequestSnapshot.data().userId,
        action: paymentRequestSnapshot.data().action,
        dateOfPayment: paymentRequestSnapshot.data().dateOfPayment
    }
}