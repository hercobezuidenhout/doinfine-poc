import { getFirestore } from "firebase-admin/firestore"

export const userRepository = () => {
    const db = getFirestore()

    const fetchById = async (id) => {
        const userSnapshot = await db.collection('users').doc(id).get()
        return {
            id: userSnapshot.id,
            ...userSnapshot.data()
        }
    }

    const add = async ({ id, fullName }) => {
        await db.collection('users').doc(id).set({
            fullName: fullName
        })
    }

    return {
        fetchById,
        add
    }
}