import { getFirestore } from "firebase-admin/firestore"
import { sendNotificationToTopic } from "../services/notification.service"

export const createFineRequest = async (fineRequest) => {
    const db = getFirestore()

    const fineRequestSnapshot = await db.collection('fineRequests').add(fineRequest)
    const fineeSnapshot = await db.collection('users').doc(fineRequest.finee).get()
    const finerSnapshot = await db.collection('users').doc(fineRequest.finer).get()

    await sendNotificationToTopic({
        topic: fineRequest.teamId,
        title: 'New Fine Request',
        description: `${finerSnapshot.data().fullName} wants to fine ${fineeSnapshot.data().fullName}.`
    })

    return fineRequestSnapshot.id
}