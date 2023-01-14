import { getFirestore } from "firebase-admin/firestore"

const userHasAlreadyResponded = (responses, userId) => responses.map(response => response.userId).includes(userId)

export const addFineRequestResponse = async ({ requestId, approved, userId }) => {
    const db = getFirestore()

    const fineRequestSnapshot = await db.collection('fineRequests').doc(requestId).get()
    const fineRequest = fineRequestSnapshot.data()

    if (!fineRequest.responses) fineRequest.responses = []
    if (userHasAlreadyResponded(fineRequest.responses, userId)) return

    fineRequest.responses.push({ approved: approved, userId: userId })

    await db.collection('fineRequests').doc(requestId).update(fineRequest)

    return fineRequest
}