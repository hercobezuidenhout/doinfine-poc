import { getFirestore } from "firebase-admin/firestore"

export const getFineRequest = async (spaceId, id, userId) => {
    const db = getFirestore()

    const userTeamsSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('teams')
        .where('members', 'array-contains', userId)
        .get()

    const userTeams = userTeamsSnapshot.docs.map(doc => doc.id)

    const fineRequestSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('fineRequests')
        .doc(id)
        .get()

    const { status, responses, teamId } = fineRequestSnapshot.data()

    if (status !== 'pending') return
    if (responses && responses.map(response => response.userId).includes(userId)) return
    if (!userTeams.includes(teamId)) return

    return {
        id: fineRequestSnapshot.id,
        finer: fineRequestSnapshot.data().finer,
        finee: fineRequestSnapshot.data().finee,
        reason: fineRequestSnapshot.data().reason
    }
}