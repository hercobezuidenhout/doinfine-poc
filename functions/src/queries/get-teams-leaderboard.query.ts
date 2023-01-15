import { getFirestore } from "firebase-admin/firestore"

export const getTeamsLeaderboard = async () => {
    const db = getFirestore()

    const teamsSnapshot = await db.collection('teams').get()
    const teams = teamsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        fineCount: 0
    }))

    for (let teamIndex = 0; teamIndex < teams.length; teamIndex++) {
        const team = teams[teamIndex];
        const finesSnapshot = await db
            .collection('fines')
            .where('teamId', '==', team.id)
            .where('paid', '==', false)
            .get()


        teams[teamIndex].fineCount = finesSnapshot.docs.length
    }

    return teams
        .map(team => ({
            title: team.name,
            fines: team.fineCount
        }))
        .sort((a, b) => b.fines - a.fines);
}