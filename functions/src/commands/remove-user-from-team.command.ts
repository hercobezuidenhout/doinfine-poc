import { getFirestore } from "firebase-admin/firestore"

export const removeUserFromTeam = async (space, teamId, userId) => {
    const db = getFirestore()

    const teamSnapshot = await db.collection('spaces').doc(space).collection('teams').doc(teamId).get()
    const team = teamSnapshot.data()

    team.members = team.members.filter(member => member !== userId)
    team.roles = team.roles.filter(role => role.userId !== userId)

    await db.collection('spaces').doc(space).collection('teams').doc(teamId).update(team)

    const finesSnapshot = await db.collection('spaces').doc(space)
        .collection('fines')
        .where('userId', '==', userId)
        .where('teamId', '==', teamId)
        .get()

    if (finesSnapshot.docs) {
        const fines = finesSnapshot.docs

        for (let fineIndex = 0; fineIndex < fines.length; fineIndex++) {
            const fine = fineIndex[fineIndex];
            fine.teamId = ''
            await db.collection('spaces').doc(space).collection('fines').doc(fine.id).update(fine)
        }
    }
}