
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    test: {
        apiKey: "AIzaSyAjYvtHy-d3y8XSJt3xKwdiC9zKuVQ-S9U",
        authDomain: "doinfine-test.firebaseapp.com",
        projectId: "doinfine-test",
        storageBucket: "doinfine-test.appspot.com",
        messagingSenderId: "385814114961",
        appId: "1:385814114961:web:1a17e38290792e41314530",
        measurementId: "G-9F3H2P1KEW"
    },
}
firebase.initializeApp(firebaseConfig.test);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
});
