export const isDevelopment = () => process.env.DF_ENVIRONMENT == 'Development'
export const isTest = () => process.env.DF_ENVIRONMENT == 'Test'
export const isProd = () => process.env.DF_ENVIRONMENT == 'Production'


export const firebaseConfig = {
    test: {
        apiKey: "AIzaSyAjYvtHy-d3y8XSJt3xKwdiC9zKuVQ-S9U",
        authDomain: "doinfine-test.firebaseapp.com",
        projectId: "doinfine-test",
        storageBucket: "doinfine-test.appspot.com",
        messagingSenderId: "385814114961",
        appId: "1:385814114961:web:1a17e38290792e41314530",
        measurementId: "G-9F3H2P1KEW"
    },
    prod: {
        apiKey: "AIzaSyAR_1Yfan_Ru-09BRPmqnSXjNwAk6rvfss",
        authDomain: "doin-fine.firebaseapp.com",
        projectId: "doin-fine",
        storageBucket: "doin-fine.appspot.com",
        messagingSenderId: "852724502631",
        appId: "1:852724502631:web:429d35119d234cdb5004c2",
        measurementId: "G-45SECZFJMV"
    }
}