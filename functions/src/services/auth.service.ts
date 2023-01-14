import { getAuth } from "firebase-admin/auth";

export const validateToken = async (token) => {
    const decodedToken = await getAuth().verifyIdToken(token)
    if (!decodedToken) return

    return decodedToken
}