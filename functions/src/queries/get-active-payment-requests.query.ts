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

    return paymentRequestsSnapshot.docs
        .filter(doc => userTeams.includes(doc.data().teamId))
        .filter(doc => !doc.data().responses?.map(response => response.userId).includes(userId))
        .filter(doc => doc.data().status == 'pending')
        .map(doc => ({
            id: doc.id,
            fullName: doc.data().userId,
            action: doc.data().action
        }))
} 