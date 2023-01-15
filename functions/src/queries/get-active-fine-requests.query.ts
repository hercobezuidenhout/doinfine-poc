import { getFirestore } from "firebase-admin/firestore";

export const getActiveFineRequests = async (userId) => {
    const db = getFirestore()

    const userTeamsSnapshot = await db.collection('teams').where('members', 'array-contains', userId).get()

    const userTeams = userTeamsSnapshot.docs.map(doc => doc.id)

    const fineRequestsSnapshot = await db.collection('fineRequests').get()

    return fineRequestsSnapshot.docs
        .filter(doc => userTeams.includes(doc.data().teamId))
        .filter(doc => !doc.data().responses?.map(response => response.userId).includes(userId))
        .filter(doc => doc.data().status == 'pending')
        .map(doc => ({
            id: doc.id,
            finer: doc.data().finer,
            finee: doc.data().finee,
            reason: doc.data().reason
        }))
} 