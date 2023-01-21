import { getFirestore } from "firebase-admin/firestore"

export const createSpace = async (space) => {
    const db = getFirestore()

    const spaceSnapshot = await db.collection('spaces').add(space)

    return spaceSnapshot.id
}