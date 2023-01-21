import { getFirestore } from 'firebase-admin/firestore'

export const getUserById = async (userId) => {
    const db = getFirestore()

    const doc = await db
        .collection('users')
        .doc(userId)
        .get()

    const spacesDoc = await db
        .collection('spaces')
        .where('members', 'array-contains', userId)
        .get()

    const spaces = spacesDoc.docs.map(doc => doc.id)
    const userSpaces = []

    for (let spaceIndex = 0; spaceIndex < spaces.length; spaceIndex++) {
        const spaceId = spaces[spaceIndex];
        const teamsDoc = await db
            .collection('spaces')
            .doc(spaceId)
            .collection('teams')
            .where('members', 'array-contains', userId)
            .get()

        userSpaces.push({
            id: spaceId,
            teams: teamsDoc.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name
            }))
        })
    }

    return {
        id: doc.id,
        fullName: doc.data()?.fullName,
        spaces: userSpaces
    }
}