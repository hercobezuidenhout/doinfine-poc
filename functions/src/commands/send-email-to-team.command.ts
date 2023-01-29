import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

export const sendEmailToUser = async (userId, mail) => {
    const auth = getAuth()
    const db = getFirestore()

    const { subject, message } = mail
    const user = await auth.getUser(userId)

    await db.collection('mail').add({
        from: 'Fine Masters <finemasters@doinfine.app>',
        replyTo: 'Fine Masters <finemasters@doinfine.app>',
        to: [user.email],
        message: {
            subject: subject,
            html: message
        }
    })
}