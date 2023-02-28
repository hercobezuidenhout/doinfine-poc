const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

const spaceName = process.argv[2]

const serviceAccount = require('/Users/doinfine/Keys/doinfine-test-service-account.json')

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()

const setupDemoEnvironment = async () => {
    const mainUser = 'SNfVKymO49gAxfyFf2aOPX2ptOx2'

    const listOfMembers = [
        'NRNfEPh6cHc9SqKCrUUG0atjNuh1', // Steve
        'J180iGx458VhN6QnxVM8K5UkkOP2', // Billy
        'szsHGkVnwPWN6hKlygkLCTF6NRa2', // Andrew
    ]

    const space = {
        name: spaceName,
        members: [mainUser, ...listOfMembers],
        roles: [
            {
                userId: mainUser,
                role: 'owner'
            },
            ...listOfMembers.map(member => ({
                userId: member,
                role: 'member'
            }))
        ]
    }

    const team = {
        name: 'Example Team',
        members: [
            mainUser,
            ...listOfMembers.slice(0, 2)
        ],
        roles: [
            {
                userId: mainUser,
                role: 'owner'
            },
            ...listOfMembers.map(member  => ({
                userId: member,
                role: 'member'
            }))
        ]
    }

    const spaceSnapshot = await db.collection('spaces').add(space)
    const teamSnapshpt = await db.collection('spaces').doc(spaceSnapshot.id).collection('teams').add(team)

    const fineRequests = [
        {
            finer: 'NRNfEPh6cHc9SqKCrUUG0atjNuh1',
            finee: 'J180iGx458VhN6QnxVM8K5UkkOP2',
            reason: 'showing up late to standup',
            status: 'pending',
            teamId: teamSnapshpt.id
        }
    ]

    const paymentRequests = [
        {
            action: 'telling a dad joke during standup',
            status: 'pending',
            teamId: teamSnapshpt.id,
            userId: 'NRNfEPh6cHc9SqKCrUUG0atjNuh1',
            dateOfPayment: '01/03/2023'
        }
    ]

    const fines = [
        {
            teamId: teamSnapshpt.id,
            userId: mainUser,
            reason: 'being late to standup',
            paid: false
        },
        {
            teamId: teamSnapshpt.id,
            userId: mainUser,
            reason: 'forgetting a CHANGELOG entry in a pull request',
            paid: false
        },
        {
            teamId: teamSnapshpt.id,
            userId: mainUser,
            reason: 'being late to standup',
            paid: false
        },
        {
            teamId: teamSnapshpt.id,
            userId: 'NRNfEPh6cHc9SqKCrUUG0atjNuh1',
            reason: 'being late to standup',
            paid: false
        },
        {
            teamId: teamSnapshpt.id,
            userId: 'NRNfEPh6cHc9SqKCrUUG0atjNuh1',
            reason: 'not adding a unit test',
            paid: false
        },
        {
            teamId: teamSnapshpt.id,
            userId: 'NRNfEPh6cHc9SqKCrUUG0atjNuh1',
            reason: 'forgetting about the 45-minute rule',
            paid: false
        },
        {
            teamId: teamSnapshpt.id,
            userId: 'NRNfEPh6cHc9SqKCrUUG0atjNuh1',
            reason: 'not managing expectations properly',
            paid: false
        },
        {
            teamId: teamSnapshpt.id,
            userId: 'J180iGx458VhN6QnxVM8K5UkkOP2',
            reason: 'wearing a blue shirt',
            paid: false
        },
        {
            teamId: teamSnapshpt.id,
            userId: 'szsHGkVnwPWN6hKlygkLCTF6NRa2',
            reason: 'missing team lunch without an excuse',
            paid: false
        }
    ]

    for (let fineRequestIndex = 0; fineRequestIndex < fineRequests.length; fineRequestIndex++) {
        const fineRequest = fineRequests[fineRequestIndex];
        await db.collection('spaces').doc(spaceSnapshot.id).collection('fineRequests').add(fineRequest)
    }

    for (let paymentRequestIndex = 0; paymentRequestIndex < paymentRequests.length; paymentRequestIndex++) {
        const paymentRequest = paymentRequests[paymentRequestIndex];
        await db.collection('spaces').doc(spaceSnapshot.id).collection('paymentRequests').add(paymentRequest)
    }

    for (let fineIndex = 0; fineIndex < fines.length; fineIndex++) {
        const fine = fines[fineIndex];
        const finesSnapshot = await db.collection('spaces').doc(spaceSnapshot.id).collection('fines').add(fine)
    }

    console.log('Done')
    console.log('Space Created:', spaceSnapshot.id)
}

setupDemoEnvironment()