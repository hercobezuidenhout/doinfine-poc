import { getFirestore } from "firebase-admin/firestore"

export const getSpaces = async (userId) => {
    const db = await getFirestore()
    const spacesSnapshot = await db.collection('spaces').where('members', 'array-contains', userId).get()
    return spacesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
}