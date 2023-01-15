import { getFirestore } from "firebase-admin/firestore"

export const getUsersLeaderboard = async () => {
    const db = getFirestore()
    const usersSnapshot = await db.collection('users').get()
    const users = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        fullName: doc.data().fullName,
        fineCount: 0
    }))

    for (let userIndex = 0; userIndex < users.length; userIndex++) {
        const user = users[userIndex];
        const userFines = await db
            .collection('fines')
            .where('userId', '==', user.id)
            .where('paid', '==', false)
            .get()

        user.fineCount = userFines.docs.length
    }

    return users
        .map(user => ({
            title: user.fullName,
            fines: user.fineCount
        })).sort((a, b) => b.fines - a.fines)
}