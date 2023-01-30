import { getFirestore } from "firebase-admin/firestore"

export const getTeams = async ({ space, userId }) => {
    const db = await getFirestore()
    const teamsSnapshot = await db
        .collection('spaces')
        .doc(space)
        .collection('teams')
        .where('members', 'array-contains', userId)
        .get()

    return teamsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
}