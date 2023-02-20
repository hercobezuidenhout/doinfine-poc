import { getFirestore } from "firebase-admin/firestore"

export const getSpaceById = async ({ userId, spaceId }) => {
    const db = getFirestore()
    const spaceSnapshot = await db.collection('spaces').doc(spaceId).get()
    const space = spaceSnapshot.data()

    if (!space.members.includes(userId)) throw Error('User is not a member of the space.')

    return ({
        id: spaceSnapshot.id,
        ...space
    })
}