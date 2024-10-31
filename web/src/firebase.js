import { getAnalytics, logEvent } from "firebase/analytics"
import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import { firebaseConfig, isDevelopment, isTest, isProd } from './config'

const firebase = isDevelopment()
    ? firebaseConfig.test
    : (
        isTest()
            ? firebaseConfig.test
            : firebaseConfig.prod
    )

const vapidKey = isProd()
    ? 'BOZvuH-s49a0nkxYEtW1APLHlV-NhhBzV_UiggXpidwUdFTnTWwoYBHWm4MeDNV2oGROGGUICfZLSHQidD0Qz2k'
    : 'BMUMU3I40oJYrYHiyw3JId-cxy0I-3IKGitRjuWJUCf2_oxGz6z4pnlSsrkNIItGtw1GqtgmZQE3o2gIXYZ8TX8'

export const app = initializeApp(firebase)
const messaging = getMessaging(app)
const analytics = getAnalytics(app)

export const getNotificationsToken = (setToken) => {
    return getToken(messaging, { vapidKey: vapidKey })
        .then(currentToken => {
            if (currentToken) {
                setToken(currentToken)
            } else {
                console.log('No registration token available. Request permission to generate one.')
                setToken('')
            }
        })
        .catch(error => {
            console.log('An error occurred while retrieving token. ', error)
        })
}

export const newEvent = (uid, event) => {
    return logEvent(analytics, 'app_loaded')
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload)
        })
    })