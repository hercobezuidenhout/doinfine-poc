import { getFirestore } from "firebase-admin/firestore"
import { fineRequestApprovedTemplate, fineRequestRejectedTemplate } from "../mail-templates"
import { sendNotificationToTopic } from "../services/notification.service"
import { sendEmailToUser } from "./send-email-to-team.command"

const userHasAlreadyResponded = (responses, userId) => responses.map(response => response.userId).includes(userId)

export const addFineRequestResponse = async ({ spaceId, requestId, approved, userId }) => {
    const db = getFirestore()

    const fineRequestSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('fineRequests')
        .doc(requestId)
        .get()

    const fineRequest = fineRequestSnapshot.data()

    const teamSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('teams')
        .doc(fineRequest.teamId)
        .get()

    const team = teamSnapshot.data()

    if (!fineRequest.responses) fineRequest.responses = []
    if (userHasAlreadyResponded(fineRequest.responses, userId)) return
    if (fineRequest.status !== 'pending') return

    fineRequest.responses.push({ approved: approved, userId: userId })

    if (team.members.length == 4) {
        if (userId == fineRequest.finee) return
    } else {
        if ((userId == fineRequest.finer) || (userId == fineRequest.finee)) return
    }

    const hasAllResponses = team.members.length > 4
        ? fineRequest.responses.length > 2
        : fineRequest.responses.length >= team.members.length - 2

    const fineeSnapshot = await db.collection('users').doc(fineRequest.finee).get()
    const finerSnapshot = await db.collection('users').doc(fineRequest.finer).get()

    if (hasAllResponses) {
        const isApproved = fineRequest.responses.filter(x => x.approved).length > fineRequest.responses.filter(x => !x.approved).length

        if (isApproved) {
            const fine = {
                userId: fineRequest.finee,
                reason: fineRequest.reason,
                teamId: fineRequest.teamId,
                paid: false
            }

            const fineSnapshot = await db
                .collection('spaces')
                .doc(spaceId)
                .collection('fines')
                .add(fine)

            fineRequest.status = 'approved'
            fineRequest.fineId = fineSnapshot.id

            await sendNotificationToTopic({
                topic: fineRequest.teamId,
                title: `${fineeSnapshot.data().fullName} has been fined!`,
                description: `${fineeSnapshot.data().fullName} has been fined by ${finerSnapshot.data().fullName} for ${fineRequest.reason}`
            })

            const { subject, message } = fineRequestApprovedTemplate({
                finer: finerSnapshot.data().fullName,
                finee: fineeSnapshot.data().fullName,
                reason: fineRequest.reason,
            })

            for (let memberIndex = 0; memberIndex < team.members.length; memberIndex++) {
                const member = team.members[memberIndex];
                await sendEmailToUser(member, { subject: subject, message: message })
            }

        } else {
            fineRequest.status = 'rejected'

            await sendNotificationToTopic({
                topic: fineRequest.teamId,
                title: `Fine for ${fineeSnapshot.data().fullName} has been rejected!`,
                description: `${fineeSnapshot.data().fullName} has not been fined for ${fineRequest.reason}`
            })

            const { subject, message } = fineRequestRejectedTemplate({
                finer: finerSnapshot.data().fullName,
                finee: fineeSnapshot.data().fullName,
                reason: fineRequest.reason,
            })

            for (let memberIndex = 0; memberIndex < team.members.length; memberIndex++) {
                const member = team.members[memberIndex];
                await sendEmailToUser(member, { subject: subject, message: message })
            }
        }
    }

    await db
        .collection('spaces')
        .doc(spaceId)
        .collection('fineRequests')
        .doc(requestId)
        .update(fineRequest)


    return fineRequest
}