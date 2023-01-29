import { getFirestore } from "firebase-admin/firestore"

export const acceptSpaceInvite = async (spaceInvite) => {
    const db = getFirestore()

    const spaceSnapshot = await db.collection('spaces').doc(spaceInvite.id).get()
    if (!spaceSnapshot.data()) return

    const space = spaceSnapshot.data()
    space.members.push(spaceInvite.userId)
    space.roles.push({
        userId: spaceInvite.userId,
        role: 'member'
    })
    const result = await db.collection('spaces').doc(spaceInvite.id).update(space)
    return result
}