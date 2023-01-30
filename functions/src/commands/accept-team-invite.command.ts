import { getFirestore } from "firebase-admin/firestore"

export const acceptTeamInvite = async (space, teamInvite) => {
    const db = getFirestore()


    const teamSnapshot = await db
        .collection('spaces')
        .doc(space)
        .collection('teams')
        .doc(teamInvite.id)
        .get()

    if (!teamSnapshot) return

    const team = teamSnapshot.data()
    team.members.push(teamInvite.userId)
    team.roles.push({
        userId: teamInvite.userId,
        role: 'member'
    })

    const result = await db.collection('spaces').doc(space).collection('teams').doc(teamInvite.id).update(team)

    const spaceSnapshot = await db.collection('spaces').doc(space).get()
    const spaceData = spaceSnapshot.data()
    if (!spaceData.members.includes(teamInvite.userId)) {
        spaceData.members.push(teamInvite.userId)
        spaceData.roles.push({
            userId: teamInvite.userId,
            role: 'member'
        })
        await db.collection('spaces').doc(space).update(spaceData)
    }
    return result
}