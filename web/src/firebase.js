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

const app = initializeApp(firebase);
const messaging = getMessaging(app);

export const getNotificationsToken = (setToken) => {
    return getToken(messaging, { vapidKey: 'BOZvuH-s49a0nkxYEtW1APLHlV-NhhBzV_UiggXpidwUdFTnTWwoYBHWm4MeDNV2oGROGGUICfZLSHQidD0Qz2k' })
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