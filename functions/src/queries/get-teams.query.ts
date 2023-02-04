import { getFirestore } from "firebase-admin/firestore"
import { useSpaceCollection } from "../repositories/space.repository"

export const getTeams = async ({ space, userId }) => {
    const db = await getFirestore()
    const spaceCollection = useSpaceCollection(db, space)

    const teamsSnapshot = await spaceCollection
        .collection('teams')
        .where('members', 'array-contains', userId)
        .get()

    return teamsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
}