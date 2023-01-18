import { getFirestore } from "firebase-admin/firestore"

const userHasToken = (tokens, token) => tokens.find(x => x.token == token) !== undefined

export const addUserToken = async ({ userId, token }) => {
    const db = getFirestore()
    const userSnapshot = await db.collection('users').doc(userId).get()
    const user = userSnapshot.data()

    if (!user.tokens) user.tokens = []
    if (userHasToken(user.tokens, token)) return

    user.tokens.push({
        token: token,
        timestamp: new Date()
    })

    await db.collection('users').doc(userId).update(user)
}