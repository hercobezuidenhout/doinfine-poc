module.exports = {
    useTeamContext: () => ({
        activeTeam: {
            id: 'team',
            members: [{
                id: 'member1',
                fullName: 'Billy Anderson'
            },
            {
                id: 'member2',
                fullName: 'Steve Burnley'
            },
            {
                id: 'member3',
                fullName: 'Peter'
            }]
        }
    })
}