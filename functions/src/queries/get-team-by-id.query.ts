//import { getFirestore } from "firebase-admin/firestore"

import { getFirestore } from "firebase-admin/firestore"

export const getTeamById = async (spaceId, teamId) => {
    const db = getFirestore()

    const snapshot = await db.
        collection('spaces')
        .doc(spaceId)
        .collection('teams').doc(teamId).get()

    const teamMembers = snapshot.data().members
    const finesSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('fines')
        .where('teamId', '==', teamId)
        .where('paid', '==', false)
        .get()

    const teamFines = finesSnapshot.docs.map(doc => ({
        userId: doc.data().userId,
        reason: doc.data().reason
    }))

    let members = []

    for (let memberIndex = 0; memberIndex < teamMembers.length; memberIndex++) {
        const memberId = teamMembers[memberIndex];
        const userSnapshot = await db.collection('users').doc(memberId).get()

        members.push({
            id: userSnapshot.id,
            fullName: userSnapshot.data().fullName,
            fines: teamFines.filter(fine => fine.userId == userSnapshot.id)
        })
    }

    return {
        id: snapshot.id,
        name: snapshot.data().name,
        members: members
    }
}