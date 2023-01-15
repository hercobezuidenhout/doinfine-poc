import { getFirestore } from 'firebase-admin/firestore'

export const getUserById = async (id) => {
    const db = getFirestore()

    const doc = await db.collection('users').doc(id).get()
    const teamsDoc = await db.collection('teams').where('members', 'array-contains', id).get()

    return {
        id: doc.id,
        fullName: doc.data()?.fullName,
        teams: teamsDoc.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
        })),
    }
}