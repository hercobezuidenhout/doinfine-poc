import { getFirestore } from "firebase-admin/firestore"

export const createTeam = async (spaceId, userId, name) => {
    const db = getFirestore()
    const spaceSnapshot = await db.collection('spaces').doc(spaceId).get()

    console.log(userId)

    if (!spaceSnapshot.data()?.members.includes(userId)) throw new Error('User is not a member of the space')

    const team = {
        name: name,
        members: [userId],
        roles: [
            {
                userId: userId,
                role: 'owner'
            }
        ]
    }

    const teamSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('teams')
        .add(team)

    return teamSnapshot.id
}