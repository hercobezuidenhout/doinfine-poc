//import { getFirestore } from "firebase-admin/firestore"

import { getFirestore } from "firebase-admin/firestore"
import { useSpaceCollection } from "../repositories/space.repository"

export const getTeamById = async (spaceId, teamId) => {
    const db = getFirestore()
    const space = useSpaceCollection(db, spaceId)
    const teamsDoc = space
        .collection('teams')
        .doc(teamId)

    const teamSnapshot = await teamsDoc.get()

    const team = teamSnapshot.data()

    const teamMembers = team.members

    const finesSnapshot = await space
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
        id: teamSnapshot.id,
        name: team.name,
        members: members,
        roles: team.roles
    }
}