const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

const spaceId = process.argv[2]

const serviceAccount = require('/Users/doinfine/Keys/doinfine-test-service-account.json')

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()

const closeDemoEnvironment = async () => {
    
    await db.collection('spaces').doc(spaceId).delete()

    console.log('Done')
    console.log('Space Deleted:', spaceId)
}

closeDemoEnvironment()