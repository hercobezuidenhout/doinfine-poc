import { getFirestore } from "firebase-admin/firestore";

export const getActivePaymentRequests = async (spaceId, userId) => {
    const db = getFirestore()

    const userTeamsSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('teams')
        .where('members', 'array-contains', userId)
        .get()

    const userTeams = userTeamsSnapshot.docs.map(doc => doc.id)

    const paymentRequestsSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('paymentRequests')
        .get()



    const paymentRequests = paymentRequestsSnapshot.docs
        .filter(doc => userTeams.includes(doc.data().teamId))
        .filter(doc => !doc.data().responses?.map(response => response.userId).includes(userId))
        .filter(doc => doc.data().status == 'pending')
        .map(doc => ({
            id: doc.id,
            userId: doc.data().userId,
            action: doc.data().action
        }))

    let activePaymentRequests = []

    for (let paymentRequestIndex = 0; paymentRequestIndex < paymentRequests.length; paymentRequestIndex++) {
        const paymentRequest = paymentRequests[paymentRequestIndex];
        const userPayingSnapshot = await db.collection('users').doc(paymentRequest.userId).get()
        const userPaying = userPayingSnapshot.data().fullName

        activePaymentRequests.push({
            id: paymentRequest.id,
            fullName: userPaying,
            action: paymentRequest.action
        })
    }

    return activePaymentRequests
} 