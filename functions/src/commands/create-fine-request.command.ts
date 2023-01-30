import { getFirestore } from "firebase-admin/firestore"
import { newFineRequestTemplate } from "../mail-templates"
import { sendNotificationToTopic } from "../services/notification.service"
import { sendEmailToUser } from "./send-email-to-team.command"

export const createFineRequest = async (spaceId, fineRequest) => {
    const db = getFirestore()

    const fineRequestSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('fineRequests')
        .add(fineRequest)

    const fineeSnapshot = await db.collection('users').doc(fineRequest.finee).get()
    const finerSnapshot = await db.collection('users').doc(fineRequest.finer).get()

    await sendNotificationToTopic({
        topic: fineRequest.teamId,
        title: 'New Fine Request',
        description: `${finerSnapshot.data().fullName} wants to fine ${fineeSnapshot.data().fullName}.`
    })

    const teamSnapshot = await db.collection('spaces').doc(spaceId)
        .collection('teams')
        .doc(fineRequest.teamId)
        .get()

    const members = teamSnapshot.data().members

    const { subject, message } = newFineRequestTemplate({
        finer: finerSnapshot.data().fullName,
        finee: fineeSnapshot.data().fullName,
        reason: fineRequest.reason,
        requestId: fineRequestSnapshot.id
    })

    for (let memberIndex = 0; memberIndex < members.length; memberIndex++) {
        const member = members[memberIndex];
        await sendEmailToUser(member, { subject: subject, message: message })
    }

    return fineRequestSnapshot.id
}