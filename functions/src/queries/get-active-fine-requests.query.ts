import { getFirestore } from "firebase-admin/firestore";

export const getActiveFineRequests = async (spaceId, userId) => {
    const db = getFirestore()

    const userTeamsSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('teams')
        .where('members', 'array-contains', userId)
        .get()

    const userTeams = userTeamsSnapshot.docs.map(doc => doc.id)

    const fineRequestsSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('fineRequests')
        .get()

    const fineRequests = fineRequestsSnapshot.docs
        .filter(doc => userTeams.includes(doc.data().teamId))
        .filter(doc => !doc.data().responses?.map(response => response.userId).includes(userId))
        .filter(doc => doc.data().status == 'pending')
        .map(doc => ({
            id: doc.id,
            finer: doc.data().finer,
            finee: doc.data().finee,
            reason: doc.data().reason
        }))

    let activeFineRequests = []

    for (let fineRequestIndex = 0; fineRequestIndex < fineRequests.length; fineRequestIndex++) {
        const fineRequest = fineRequests[fineRequestIndex];

        const fineeSnapshot = await db.collection('users').doc(fineRequest.finee).get()
        const finerSnapshot = await db.collection('users').doc(fineRequest.finer).get()

        activeFineRequests.push({
            id: fineRequest.id,
            finer: finerSnapshot.data().fullName,
            finee: fineeSnapshot.data().fullName,
            reason: fineRequest.reason
        })
    }

    return activeFineRequests
} 