import { getFirestore } from "firebase-admin/firestore"

export const getSpaceName = async (id) => {
    const db = getFirestore()

    const spaceSnapshot = await db.collection('spaces').doc(id).get()
    if (!spaceSnapshot.data()) return

    return spaceSnapshot.data().name
}