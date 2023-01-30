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

    const fineeSnapshot = await db.collection('users').doc(fineRequestSnapshot.data().finee).get()
    const finerSnapshot = await db.collection('users').doc(fineRequestSnapshot.data().finer).get()

    return {
        id: fineRequestSnapshot.id,
        finer: finerSnapshot.data().fullName,
        finee: fineeSnapshot.data().fullName,
        reason: fineRequestSnapshot.data().reason
    }
}