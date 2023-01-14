import { getFirestore } from "firebase-admin/firestore"

export const createFineRequest = async (fineRequest) => {
    const db = getFirestore()

    const doc = await db.collection('fineRequests').add(fineRequest);
    return doc.id
}