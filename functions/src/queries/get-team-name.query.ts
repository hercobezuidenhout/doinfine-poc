import { getFirestore } from "firebase-admin/firestore"

export const getTeamName = async (space, id) => {
    const db = getFirestore()

    const teamSnapshot = await db
        .collection('spaces')
        .doc(space)
        .collection('teams')
        .doc(id)
        .get()

    if (!teamSnapshot.data()) return
    return teamSnapshot.data().name
}