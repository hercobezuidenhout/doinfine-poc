import { initializeApp } from "firebase/app";
import { deleteToken, getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig, isDevelopment, isTest } from './config';

const firebase = isDevelopment()
    ? firebaseConfig.test
    : (
        isTest()
            ? firebaseConfig.test
            : firebaseConfig.prod
    );

console.log(firebase)

const app = initializeApp(firebase);
const messaging = getMessaging(app);

export const getNotificationsToken = (setToken) => {
    return getToken(messaging, { vapidKey: 'BMUMU3I40oJYrYHiyw3JId-cxy0I-3IKGitRjuWJUCf2_oxGz6z4pnlSsrkNIItGtw1GqtgmZQE3o2gIXYZ8TX8' })
        .then(currentToken => {
            if (currentToken) {
                setToken(currentToken)
            } else {
                console.log('No registration token available. Request permission to generate one.');
                setToken('');
            }
        })
        .catch(error => {
            console.log('An error occurred while retrieving token. ', error);
        })
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });


console.log('🔥 Firebase initialized')