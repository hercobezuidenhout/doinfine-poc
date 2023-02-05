import { getFirestore } from "firebase-admin/firestore"
import { useSpaceCollection } from "../repositories/space.repository"

export const updateTeam = async ({ space, id, userId, data }) => {
    const db = getFirestore()
    const spaceCollection = useSpaceCollection(db, space)
    const teamsDoc = spaceCollection.collection('teams').doc(id)

    const teamSnapshot = await teamsDoc.get()
    const spaceSnapshot = await spaceCollection.get()

    const isOwnerOfSpace = spaceSnapshot.data().roles.find(role => role.userId === userId && role.role === 'owner')
    const isOwnerOfTeam = teamSnapshot.data().roles.find(role => role.userId === userId && role.role === 'owner')

    if (!(isOwnerOfTeam || isOwnerOfSpace)) return

    await teamsDoc.update(data)
}