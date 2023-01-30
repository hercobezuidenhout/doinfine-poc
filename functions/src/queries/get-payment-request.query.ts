import { getFirestore } from "firebase-admin/firestore"

export const getPaymentRequest = async (spaceId, id, userId) => {
    const db = getFirestore()

    const userTeamsSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('teams')
        .where('members', 'array-contains', userId)
        .get()


    const userTeams = userTeamsSnapshot.docs.map(doc => doc.id)

    const paymentRequestSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('paymentRequests')
        .doc(id)
        .get()

    const { status, responses, teamId } = paymentRequestSnapshot.data()

    if (status !== 'pending') return
    if (responses && responses.map(response => response.userId).includes(userId)) return
    if (!userTeams.includes(teamId)) return

    const userPayingSnapshot = await db.collection('users').doc(paymentRequestSnapshot.data().userId).get()
    const userPaying = userPayingSnapshot.data().fullName

    return {
        id: paymentRequestSnapshot.id,
        fullName: userPaying,
        action: paymentRequestSnapshot.data().action,
        dateOfPayment: paymentRequestSnapshot.data().dateOfPayment
    }
}